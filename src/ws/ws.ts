import socketIOClient from 'socket.io-client';
// const WS = "http://localhost:8080";
const WS = "https://google-chat-server.onrender.com";

export const ws = socketIOClient(WS);
