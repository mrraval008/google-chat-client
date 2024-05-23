import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';
import { RoomProvider } from './context/RoomContext';
import Home from './components/homeLayout/home/Home';
import RootLayout from './components/rootLayout/RootLayout';
import Room from './components/homeLayout/room/Room';
import HomeLayout from "./components/homeLayout/HomeLayout";
import { FC } from "react";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        path: "home",
        element:  <HomeLayout></HomeLayout>,
        children: [
          {
            path: "",
            element: <Home></Home>
          },
          {
            path: ":roomId",
            element: <Room></Room>
          }
        ]

      },


    ]
  }

])

  const App:FC<{}> = function(){
  return <RouterProvider router={router}></RouterProvider>
}
export default App;
