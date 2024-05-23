import { FC } from "react";
import { Outlet } from "react-router-dom";
import { RoomProvider } from "../../context/RoomContext";

const HomeLayout:FC<{}> = function(){

    
    return (
        <>  
            <RoomProvider>
                <Outlet></Outlet>
            </RoomProvider>
        </>
    )
}

export default HomeLayout;