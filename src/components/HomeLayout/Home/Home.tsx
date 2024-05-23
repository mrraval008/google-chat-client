import { FC, useContext } from "react"
import { RoomContext } from "../../../context/RoomContext"
import VideoPlayer from "../../../library/videoPlayer/VideoPlayer"
import styles from './Home.module.css';
const Home:FC<{}> = function(){

    const { ws, stream} = useContext(RoomContext)
    const createRoom = (userName:string) => {
        ws.emit("create-room",userName)
    }
    const submitUserForm = (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.currentTarget
        const formElements = form.elements as typeof form.elements & {
            userName: { value: string }
        }
        createRoom(formElements.userName.value)
    }
    return (
        <div className={styles.container}>
            <div className={styles.left_container}>
                <VideoPlayer stream={stream}></VideoPlayer>
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

        </div>
    )
}

export default Home;