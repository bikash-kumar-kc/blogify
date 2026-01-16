import {io} from "socket.io-client";

const socketioConnectionToServer = ()=>{
    return io("http://localhost:8000/",{
        transports:["polling","websocket"]
    });
};

export default socketioConnectionToServer;