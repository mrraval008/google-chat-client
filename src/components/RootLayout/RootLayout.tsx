import { Outlet } from "react-router-dom";
import { RoomProvider } from "../../context/RoomContext";


export default function RootLayout(){
    return(
        <div>  
            <Outlet></Outlet>
        </div>
    )
}