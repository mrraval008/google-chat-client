import { FC, useContext } from "react";
import { RoomContext } from "../../../../context/RoomContext";
import styles from './ChatInput.module.css';
import SendIcon from '@mui/icons-material/Send';
const ChatInput: FC = function({}){
    const {sendMessage} = useContext(RoomContext)
    return (
        <>
            <form className={styles.chat_form} onSubmit={(eve:any)=>{
                    eve.preventDefault();
                    sendMessage(eve.target[0].value);
                    eve.target.reset()
                }}>
                <input required className={styles.input}></input>
                <button type="submit"><SendIcon></SendIcon></button>
            </form>
        </>
    )
}
export default ChatInput;