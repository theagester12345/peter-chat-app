import { connection } from 'mongoose';
import {Server, Socket} from 'socket.io';
import logger from './utils/logger';

const EVENT = {
    connection:"connection",
};

function socket ( {io}:{io:Server}){
    logger.info('Sockets enabled');

    io.on(EVENT.connection,function(socket:Socket){
        logger.info(`User connected ${socket.id }`)
    })

}



export default socket