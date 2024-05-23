import React, { FC, useContext } from "react";
import { RoomContext } from "../../../../context/RoomContext";
import styles from './ChatInput.module.css';
const ChatInput: FC = function({}){
    const {sendMessage} = useContext(RoomContext)
    return (
        <>
            <form onSubmit={(eve:any)=>{
                    eve.preventDefault();
                    sendMessage(eve.target[0].value);
                    eve.target.reset()
                }}>
                <input className={styles.input}></input>
            </form>
        </>
    )
}
export default ChatInput;