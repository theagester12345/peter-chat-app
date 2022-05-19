import { connection } from 'mongoose';
import {Server, Socket} from 'socket.io';
import logger from './utils/logger';
import { nanoid } from 'nanoid';

const EVENT = {
    connection:"connection",
    CLIENT:{
        CREATE_ROOM: "CREATE ROOM",
        SEND_ROOT_MESSAGE:"SEND_ROOT_MESSAGE",
        JOIN_ROOMS: "JOIN_ROOMS",
    },
    SERVER: {
        ROOMS:"ROOMS",
        JOINED_ROOMS: "JOINED_ROOMS",
        ROOM_MESSAGE: "ROOM_MESSAGE"
    } 
};

const rooms: Record<string, {name:string}> = {}

function socket ( {io}:{io:Server}){
    logger.info('Sockets enabled');

    io.on(EVENT.connection,function(socket:Socket){
        logger.info(`User connected ${socket.id }`);

        socket.emit(EVENT.SERVER.ROOMS,rooms);


        /**
         * CREATING A NEW ROOM 
         */
        socket.on(EVENT.CLIENT.CREATE_ROOM, ({roomName})=>{
            console.log({roomName})


            const roomId = nanoid();

            rooms[roomId] = {
                name:roomName,

            }
        
            socket.join(roomId);


            socket.broadcast.emit(EVENT.SERVER.ROOMS,rooms);

            socket.emit(EVENT.SERVER.ROOMS,rooms);
            socket.emit(EVENT.SERVER.JOINED_ROOMS,roomId);


        })

        /**
         * SENDING MESSAGE FOR A USER
         */
        socket.on(EVENT.CLIENT.SEND_ROOT_MESSAGE, ({roomId, message, email})=>{

            const date = new Date();

            socket.to(roomId).emit(EVENT.SERVER.ROOM_MESSAGE,{
                message,
                email,
                time:`${date.getHours()}:${date.getMinutes()}`
            })

        })



        /**
         * JOINING A ROOM
         */
        socket.on(EVENT.CLIENT.JOIN_ROOMS, (roomId)=>{
            socket.join(roomId);

            socket.emit(EVENT.SERVER.JOINED_ROOMS,roomId);
        })
    });

   

}



export default socket