import { createContext, ReactNode, useEffect, useReducer, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Peer  from 'peerjs';
import {v4 as uuidV4} from 'uuid'
import socketIOClient from 'socket.io-client';
import { peerReducers } from './peerReducer';
import { addPeerAction, removePeerAction } from './peerActions';
const WS = "http://localhost:8080";

export const RoomContext = createContext<null | any>(null);
const ws = socketIOClient(WS);


interface Props {
    children?: ReactNode
}
export function RoomProvider({children}:Props){
    const navigate = useNavigate()
    const [myId,setMyId] = useState<Peer>();
    const [stream,setStrem] = useState<MediaStream>();
    const [peers,dispatch] = useReducer(peerReducers,{});
    const enterRoom = (roomId:String)=>{
        console.log("Room is Creted with RoomID", roomId)
        navigate(`${roomId}`)
    }
    const getParticipants = function(participants:string[]){
        console.log(participants)
  }
  const removePeer = function(peerId:string){
    dispatch(removePeerAction(peerId))
  }
    useEffect(()=>{
        const myUniqueId = uuidV4();
        const peer = new Peer(myUniqueId);
        setMyId(peer);
        try{
            navigator.mediaDevices.getUserMedia({video:true,audio:true}).then((stream)=>{
                    setStrem(stream);
            })
        }catch(error){
            console.log(error);
        }
        ws.on("room-created",enterRoom)
        ws.on("get-users",getParticipants)
        ws.on("user-disconnected",removePeer)

    },[])

    useEffect(()=>{
            if(!myId) return;
            if(!stream) return;

            ws.on("user-joined",({peerId})=>{
                    const call = myId.call(peerId,stream);
                    call.on("stream",(peerStream,)=>{
                        dispatch(addPeerAction(peerId,peerStream))
                    })
            })
            myId.on("call",(call)=>{
                call.answer(stream);
                call.on("stream",(peerStream,)=>{
                    dispatch(addPeerAction(call.peer,peerStream))
                })
            })
    },[myId,stream])

    console.log({peers})

   return <RoomContext.Provider value={{ws,myId,stream,peers}}>{children}</RoomContext.Provider>
}