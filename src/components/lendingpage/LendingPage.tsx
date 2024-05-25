import { FC, useContext } from "react";
import { lendingPageButtons } from "../../configs/buttonsConfig";
import { RoomContext } from "../../context/RoomContext";
import VideoPlayer from "../../library/videoPlayer/VideoPlayer";
import styles from './LendingPage.module.css'

export const LendingPage: FC<{submitUserForm:React.FormEventHandler}> = function ({ submitUserForm}) {
    const {stream} = useContext(RoomContext)
    if(!stream){
        return (<><h1>Please Provide audio & video Permission to join Video call</h1></>)
    }
    return (
        <>
            <div className={styles.left_container}>
                <VideoPlayer stream={stream} muted={true} menucontrolButtons={lendingPageButtons}></VideoPlayer>
            </div>
            <div className={styles.right_container}>
                <h2>Welcome to Video Chat</h2>
                <form onSubmit={submitUserForm}>
                    <div>
                        <input name="userName" required placeholder="Please Enter Your Name"></input>
                    </div>
                    <div>
                        <button className={styles.btn} type="submit">Start Meeting</button>
                    </div>
                </form>

            </div>
        </>
    )
}