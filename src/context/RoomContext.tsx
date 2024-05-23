import { createContext, ReactNode, useEffect, useReducer, useState, } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Peer from 'peerjs';
import { v4 as uuidV4 } from 'uuid'
import socketIOClient from 'socket.io-client';
import { peerReducers } from './peerReducer';
import { addPeerAction, removePeerAction } from './peerActions';
import { IMessage } from '../types/chat';
const WS = "https://google-chat-server-3.onrender.com";

export const RoomContext = createContext<null | any>(null);
const ws = socketIOClient(WS);


interface Props {
    children?: ReactNode
}
export function RoomProvider({ children }: Props) {
    const navigate = useNavigate()
    const [myId, setMyId] = useState<Peer>();
    const [stream, setStrem] = useState<MediaStream>();
    const [peers, dispatch] = useReducer(peerReducers, {});
    const [myName, setMyname] = useState<string>("");
    const [muteAudio,setMuteAudio] = useState<boolean>(false);
    const [muteVideo,setMuteVideo] = useState<boolean>(false);
    const [messageArr, setMessageArr] = useState<IMessage[]>([]);
    const [showChat,setShowChat] = useState<boolean>(false)

    const { roomId } = useParams()
    const enterRoom = ({roomId,userName}:{roomId:string,userName:string}) => {
        console.log("Room is Creted with RoomID", roomId)
        setMyname(userName);
        navigate(`${roomId}`)
    }
    const getParticipants = function (participants: string[]) {
        console.log("participants",participants)
    }
    const removePeer = function (peerId: string) {
        dispatch(removePeerAction(peerId))
    }
    const addMessage = function (message: IMessage) {
        console.log("new message", message)
        setMessageArr((messages)=>{
            let currentMessages = messages?.map(elem=>{
                    return {...elem}
            });
            currentMessages?.push(message)
            return currentMessages
        })
    }
    useEffect(() => {
        const myUniqueId = uuidV4();
        const peer = new Peer(myUniqueId);
        if(peer){
            setMyId(peer);
        }
        try {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
                setStrem(stream);
            })
        } catch (error) {
            console.log(error);
        }
       
        ws.on("room-created", enterRoom)
        ws.on("get-users", getParticipants)
        ws.on("user-disconnected", removePeer)
        ws.on("add-message", addMessage)

        return (() => {
            ws.off("room-created");
            ws.off("get-users");
            ws.off("user-disconnected");
            ws.off("add-message")
        })

    }, [])
    useEffect(()=>{
        if(!stream) return;
        stream!.getAudioTracks()[0]['enabled'] = !muteAudio;
    },[muteAudio])
    useEffect(()=>{
        if(!stream) return;
        stream!.getVideoTracks()[0]['enabled'] = !muteVideo;
    },[muteVideo])
    

    useEffect(() => {
        if (!myId) return;
        if (!stream) return;
        if (!myName) return;
        console.log("stream change")
        ws.on("user-joined", ({ peerId,name}) => {
            const call = myId.call(peerId, stream,{metadata: {name:myName}});
           
            call.on("stream", (peerStream) => {
                dispatch(addPeerAction(peerId, peerStream,name))
            })
        })
        myId.on("call", (call) => {
            console.log("new user Joined",call.metadata.name)

            call.answer(stream);
            call.on("stream", (peerStream,) => {
                dispatch(addPeerAction(call.peer, peerStream,call.metadata.name))
            })
        })
    }, [myId, stream,myName])

    const sendMessage = function (message: string) {
        const messageData: IMessage = {
            content: message,
            timestamp: new Date().getTime(),
            author: myId?.id,
            name:myName
        }
        addMessage(messageData)

        ws.emit("send-message", roomId, messageData)
    }

    console.log({ peers })

    return <RoomContext.Provider value={{ ws, myId, stream, peers, sendMessage,myName,setMyname,messageArr ,setMuteAudio,setMuteVideo,showChat,setShowChat}}>{children}</RoomContext.Provider>
}
