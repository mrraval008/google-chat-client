import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';
import { RoomProvider } from './context/RoomContext';
import Home from './components/HomeLayout/Home/Home';
import RootLayout from './components/RootLayout/RootLayout';
import Room from './components/HomeLayout/Room/Room';
import HomeLayout from "./components/HomeLayout/HomeLayout";


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

function App() {
  return <RouterProvider router={router}></RouterProvider>
}
export default App;
