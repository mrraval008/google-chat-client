import { FC } from "react";
import { Outlet } from "react-router-dom";


const RootLayout:FC<{}> = function(){
    return(
        <>  
            <Outlet></Outlet>
        </>
    )
}
export default RootLayout;