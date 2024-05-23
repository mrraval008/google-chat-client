import { FC, useEffect, useRef } from "react"
import styles from './Video.module.css'
const VideoPlayer:FC<{stream:MediaStream,name?:string}> = function({stream,name}){
        const videoRef = useRef<HTMLVideoElement>(null);
    useEffect(()=>{
        if(videoRef.current){
            videoRef.current.srcObject = stream;
        }
    },[stream])
    return (
        <div className={styles.video_container}>
           {name && <span className={styles.title}>{name}</span>} 
        <video poster="http://placehold.it/430x250/0e0/111?text=POSTER" className={styles.player} ref={videoRef} autoPlay />
        </div>
    )
}   
export default VideoPlayer;