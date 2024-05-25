import { FC, useContext, useEffect, useRef, useState } from "react"

import styles from './Video.module.css'
import { IconButton } from "../../types/iconButton";
import ButtonIcon from "../buttonIcon/ButtonIcon";
import { RoomContext } from "../../context/RoomContext";
const VideoPlayer: FC<{ stream: MediaStream, name?: string, muted?: boolean, menucontrolButtons?: IconButton[] }> = function ({ stream, name, muted, menucontrolButtons }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const { setMuteAudio, setMuteVideo } = useContext(RoomContext)
    const [btnsConfig, setBtnsConfig] = useState<IconButton[]>(menucontrolButtons || []);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.srcObject = stream;
        }
    }, [stream])
    const toggleActiveState = (currentState: IconButton[], id: number) => {
        let clonedState = currentState.map((elem) => {
            return { ...elem }
        })
        let elemIndex = clonedState.findIndex((elem) => elem.id === id);
        if (elemIndex > -1) {
            clonedState[elemIndex].isActive = !clonedState[elemIndex].isActive

        }
        return clonedState;
    }
    const handleButtonClick = (type: string, id: number) => {
        if (type === 'audio') {
            setMuteAudio((currentState: boolean) => !currentState)
        } else if (type === 'video') {
            setMuteVideo((currentState: boolean) => !currentState)
        }
        setBtnsConfig((currentState) => {
            return toggleActiveState(currentState, id)
        })
    }
    return (
        <div className={styles.video_container}>
            {name && <span className={styles.title}>{name}</span>}
            <video  className={styles.player} ref={videoRef} autoPlay muted={muted} />
            <div className={styles.main_btns}>
                {btnsConfig.length > 0 && btnsConfig.map((btn) => {
                    return (
                        <ButtonIcon key={btn.id} onClick={() => { handleButtonClick(btn.type, btn.id) }} background={btn.background}>
                            {btn.isActive ? btn.icon : btn.disableIcon ? btn.disableIcon : btn.icon}
                        </ButtonIcon>
                    )
                })
                }
            </div>
        </div>
    )
}
export default VideoPlayer;