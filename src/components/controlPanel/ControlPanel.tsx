import { FC, useContext, useEffect, useState } from "react";
import { chatButtons, controlButtons } from "../../configs/buttonsConfig.js";
import ButtonIcon from "../../library/buttonIcon/ButtonIcon";
import styles from './ControlPanel.module.css';
import { useParams } from "react-router-dom";
import { RoomContext } from "../../context/RoomContext";
import { IconButton } from "../../types/iconButton";
import { useNavigate } from "react-router-dom";
import Utils from "../../utils/dateutils";
import {ws} from '../../ws/ws';

export const ControlPanel: FC<{}> = function () {
    const { roomId } = useParams();
    const { setMuteAudio,setMuteVideo,myId,setShowChat,muteAudio,muteVideo} = useContext(RoomContext)
    const [menucontrolButtons,setMenucontrolButtons] = useState<IconButton[]>(()=>{
        let ctrlBtns = controlButtons;
        ctrlBtns.forEach((elem)=>{
            if(elem.type === 'audio'){
                elem.isActive = !muteAudio
            }
            if(elem.type === 'video'){
                elem.isActive = !muteVideo
            }
        })
        return ctrlBtns
    });
    const [menuChatButtons,setMenuChatButtons] = useState<IconButton[]>(chatButtons);
    const [time, setTime] = useState<string>("");

    const navigate = useNavigate();

    
    const handleButtonClick = (type: string,id:number,ctrlBtns:string) => {
      
        if(ctrlBtns === 'menucontrolButtons'){
            if(type === 'audio'){
                setMuteAudio((currentState:boolean)=>!currentState)
            }else if(type === 'video'){
                setMuteVideo((currentState:boolean)=>!currentState)
            }else if(type === 'endcall'){
                ws.emit('end');
                myId.disconnect();
                navigate("/");
            }

            setMenucontrolButtons((currentState)=>{
              return toggleActiveState(currentState,id)
            })
        }
        if(ctrlBtns === 'menuChatButtons'){
            setMenuChatButtons((currentState)=>{
              return toggleActiveState(currentState,id)
            })
            if(type === 'chat'){
                setShowChat((currentState:boolean)=>!currentState)
            }

        }

    }
    useEffect(() => {
        const interval = setInterval(() => {
            const date:Date = new Date();
            let strTime = Utils.getTime(date)
            setTime(strTime);
        }, 1000);
    
        return () => clearInterval(interval);
        
      }, []);
    

    const  toggleActiveState = (currentState:IconButton[],id:number)=> {
        let clonedState = currentState.map((elem)=>{
            return {...elem}
        })
        let elemIndex = clonedState.findIndex((elem)=>elem.id === id);
        if(elemIndex > -1){
            clonedState[elemIndex].isActive = !clonedState[elemIndex].isActive

        }
        return clonedState;
    }
    return (
        <>
            <div className={styles.time_text}>
                <span>{`${time}  ${roomId?.split("-")[0]}`} </span>
            </div>
            <div className={styles.main_btns}>
                {menucontrolButtons.map((btn) => {
                    return (
                        <ButtonIcon key={btn.id} onClick={() => { handleButtonClick(btn.type,btn.id,'menucontrolButtons') }} background={btn.background}>
                            {btn.isActive ?  btn.icon : btn.disableIcon ? btn.disableIcon :btn.icon}
                        </ButtonIcon>
                    )
                })
                }
            </div>
            <div className={styles.chat_btns}>
                {menuChatButtons.map((btn) => {
                    return (
                        <ButtonIcon key={btn.id} onClick={() => { handleButtonClick(btn.type,btn.id,'menuChatButtons') }} background={btn.background}>
                                        {btn.isActive ?  btn.icon : btn.disableIcon ? btn.disableIcon :btn.icon}

                        </ButtonIcon>
                    )
                })
                }
            </div>
        </>
    )
}
