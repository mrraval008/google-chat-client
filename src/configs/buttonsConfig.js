import VideocamIcon from '@mui/icons-material/Videocam';
import CallEndIcon from '@mui/icons-material/CallEnd';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
export const controlButtons = [
    {   
        id:1,
        type:"audio",
        icon: <MicIcon></MicIcon>,
        background:"#575757",
        disableIcon:<MicOffIcon></MicOffIcon>,
        isActive:true

    },
    {   
        id:2,
        type:"video",
        icon: <VideocamIcon></VideocamIcon>,
        background:"#575757",
        disableIcon:<VideocamOffIcon></VideocamOffIcon>,
        isActive:true

    },
    {   
        id:3,
        type:"endcall",
        icon: <CallEndIcon></CallEndIcon>,
        background:"red",
    },
]
export const chatButtons = [
    {   
        id:1,
        type:"chat",
        icon: <ChatBubbleIcon></ChatBubbleIcon>,
        background:"#575757",
        isActive:false,
        disableIcon:<ChatBubbleOutlineIcon></ChatBubbleOutlineIcon>,

    },
]