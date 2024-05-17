import { useContext } from "react"
import { RoomContext } from "../../../context/RoomContext"

export default function Home(){

    const {ws} = useContext(RoomContext)
    const createRoom = ()=>{
        ws.emit("create-room")
    }

        return (
               <button onClick={createRoom}>Start Meeting</button>
        )
}