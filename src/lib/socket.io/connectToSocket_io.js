import {io} from "socket.io-client";

const socketioConnectionToServer = ()=>{
    return io(import.meta.env.VITE_BACKEND_BASE_URL,{
        transports:["polling","websocket"]
    });
};

export default socketioConnectionToServer;