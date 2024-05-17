import { FC, useEffect, useRef } from "react"

const VideoPlayer:FC<{stream:MediaStream}> = function({stream}){
        const videoRef = useRef<HTMLVideoElement>(null);
    useEffect(()=>{
        if(videoRef.current){
            videoRef.current.srcObject = stream;
        }
    },[stream])
    return (
        <video ref={videoRef} autoPlay muted />
    )
}   
export default VideoPlayer;