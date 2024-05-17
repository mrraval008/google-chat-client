import { useContext, useEffect } from "react";
import {useParams} from "react-router-dom";
import { peerSate } from "../../../context/peerReducer";
import { RoomContext } from "../../../context/RoomContext";
import VideoPlayer from "../../VideoPlayer";

export default function Room(){
      const {ws,myId,stream,peers} = useContext(RoomContext)
      const {roomId} = useParams()
  
    //  const userDisconneted = function()
      useEffect(()=>{
       if(myId){
            ws.emit("join-room",{roomId,peerId:myId._id});
           // ws.on("user-disconnected",userDisconneted)
            
       } 
      },[roomId,ws,myId])
      // 
        return (
            <>
              <h1>Welcome to room {roomId}</h1>
              <VideoPlayer stream={stream}></VideoPlayer>
                {Object.values(peers as peerSate).map((peer)=>{
                              return  <VideoPlayer stream={peer.stream}></VideoPlayer>

                })}  
            </>
        )
}