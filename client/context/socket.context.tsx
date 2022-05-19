import { createContext, useContext, useEffect, useState } from 'react'
import io,{Socket} from 'socket.io-client'
import {SOCKET_URL} from '../config/default'
import EVENT from '../config/events';


interface Context {
    socket:Socket;
    email?:string
    setEmail:Function
    roomId?:string
    rooms:object
    messages?: {message:string, time:string, email:string}[]
    setMessage: Function

}

const socket = io(SOCKET_URL);

const SocketContext = createContext<Context>(
    {socket,
    setEmail:()=>false,
    rooms:{},
    messages:[],
    setMessage: ()=>false
    }
    )

function SocketProvider(props:any){

    const [email, setEmail] = useState("");
    const [roomId,setRoomId] = useState("");
    const [rooms,setRoom] = useState({});
    const [messages,setMessage] = useState([]);

    useEffect(()=>{
        window.onfocus = function(){
            document.title=`Peter's Chat App`
        }
    },[])


    socket.on(EVENT.SERVER.ROOMS, (value)=> {
        setRoom(value);

    });


    socket.on(EVENT.SERVER.JOINED_ROOMS, (value)=>{
        setRoomId(value);

        setMessage([]);
    })


    socket.on(EVENT.SERVER.ROOM_MESSAGE, ({message,email,time})=>{
        if (!document.hasFocus()){
            document.title="New Message...";
        }

        setMessage([
            ...messages,
            {message,email,time}
        ])
    })


    return <SocketContext.Provider value={{socket,email,setEmail,rooms,roomId,messages,setMessage}} {...props}></SocketContext.Provider>;
    
}

export const useSockets = () => useContext(SocketContext); 

export default SocketProvider
