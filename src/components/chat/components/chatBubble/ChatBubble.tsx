import { FC, useContext } from "react";
import { RoomContext } from "../../../../context/RoomContext";
import { IMessage } from "../../../../types/chat";
import style from './ChatBubble.module.css';
const ChatBubble:FC<{message:IMessage}> = function({message}){
    const {myId} = useContext(RoomContext)
    const isSelf = message.author  === myId.id;
    return(
        <>
        <div className={`${style.bubble}  ${isSelf  && style.my_message} `}>
        <p className={style.content}>{message.content}</p>
        <div>{message.name}</div>
        </div>
        </>

    )
}

export default ChatBubble;