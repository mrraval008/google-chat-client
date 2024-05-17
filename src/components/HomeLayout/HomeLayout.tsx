import { Outlet } from "react-router-dom";
import { RoomProvider } from "../../context/RoomContext";


export default function HomeLayout() {
    return (
        <>  
            <RoomProvider>
                <Outlet></Outlet>
            </RoomProvider>
        </>
    )
}