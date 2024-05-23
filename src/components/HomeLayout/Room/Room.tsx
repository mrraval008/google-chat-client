import { FC, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { peerSate } from "../../../context/peerReducer";
import { RoomContext } from "../../../context/RoomContext";
import { Chat } from "../../chat/chat";
import VideoPlayer from "../../../library/videoPlayer/VideoPlayer";
import styles from './Room.module.css';
import { ControlPanel } from "../../controlPanel/ControlPanel";
const Room: FC<{}> = function () {
      const { ws, myId, stream, peers, myName, setMyname, showChat } = useContext(RoomContext)
      const { roomId } = useParams();

      useEffect(() => {
            if (myId && myName) {
                  ws.emit("join-room", { roomId, peerId: myId._id, myName });
            }
      }, [roomId, ws, myId, myName])
      const submitUserForm = (event: React.SyntheticEvent<HTMLFormElement>) => {
            event.preventDefault()
            const form = event.currentTarget
            const formElements = form.elements as typeof form.elements & {
                  userName: { value: string }
            }
            setMyname(formElements.userName.value)
      }
      if (!myName) {
            return (
                  <div className={styles.form_container}>
                        <h2>Welcome to Video Chat</h2>
                        <form onSubmit={submitUserForm}>
                              <div>
                                    <input name="userName" required placeholder="Please Enter Your Name"></input>
                              </div>
                              <div>
                                    <button className={styles.btn} type="submit">Join Meeting</button>
                              </div>
                        </form>

                  </div>

            )
      } else {
            return (
                  <>
                        <div className={styles.main_contianer}>
                              <div className={styles.vieo_container}>
                                    <div>
                                          <VideoPlayer stream={stream} name={myName}></VideoPlayer>
                                    </div>

                                    {Object.values(peers as peerSate).map((peer) => {
                                          return <div><VideoPlayer stream={peer.stream} name={peer.name}></VideoPlayer></div>

                                    })}
                              </div>
                              {
                                    showChat && <div className={styles.side_panel}>
                                          <Chat></Chat>
                                    </div>
                              }
                        </div>
                        <div className={styles.control_panel}>

                              <ControlPanel></ControlPanel>
                        </div>

                  </>
            )
      }

}

export default Room;