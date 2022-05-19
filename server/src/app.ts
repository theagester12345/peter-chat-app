import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import config from 'config'
import logger from './utils/logger'

const port = config.get<number>('port');
const host = config.get<string>('host');
const corsOrigin = config.get<string>('corsOrigin');


const app=express()

const httpServer = createServer(app)

const io = new Server(httpServer,{
    cors : {
        origin:corsOrigin,
        credentials:true
    }
})

app.get('/',function(req,res){
    res.send('Server is Up');
})


httpServer.listen(port,host,function(){
    logger.info('Server is Listening');
})

