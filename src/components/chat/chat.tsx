import { FC, useContext } from "react"
import { RoomContext } from "../../context/RoomContext";
import { IMessage } from "../../types/chat"
import styles from './chat.module.css';
import ChatBubble from "./components/chatBubble/ChatBubble";
import ChatInput from "./components/chatInput/ChatInput";
import * as React from 'react';

export const Chat: FC<{}> = React.memo(function ({}) {
    const {messageArr} = useContext(RoomContext)
    return (
        <>
            <div className={styles.chat_container}>
                <div className={styles.header}>Chat</div>
                <div className={styles.msg_container}>
                    {messageArr.map((msg:IMessage) => {
                    return <ChatBubble key={msg.timestamp} message={msg}></ChatBubble>
                    })}
                </div>
                <ChatInput></ChatInput>

            </div>
        
        </>

    )
})