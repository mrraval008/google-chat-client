import { FC, useContext } from "react"
import { RoomContext } from "../../context/RoomContext";
import { IMessage } from "../../types/chat"
import styles from './chat.module.css';
import ChatBubble from "./components/chatBubble/ChatBubble";
import ChatInput from "./components/chatInput/ChatInput";
export const Chat: FC<{}> = function ({}) {
    const {messageArr} = useContext(RoomContext)

    return (
        <>
            <div className={styles.chat_container}>
                <div className={styles.header}>Chat</div>
                <div className={styles.msg_container}>
                    {messageArr.map((msg:IMessage) => {
                    return <ChatBubble message={msg}></ChatBubble>
                    })}
                </div>
                <ChatInput></ChatInput>

            </div>
        
        </>

    )
}