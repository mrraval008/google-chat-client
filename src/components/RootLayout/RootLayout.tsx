import { FC } from "react";
import { Outlet } from "react-router-dom";


const RootLayout:FC<{}> = function(){
    return(
        <div>  
            <Outlet></Outlet>
        </div>
    )
}
export default RootLayout;