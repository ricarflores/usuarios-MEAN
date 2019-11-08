import express from "express"
import bodyParser from "body-parser"
import http from "http"
import io from "socket.io" 
import { Server as Main } from './interfaces/';
import Routes from './lib/routes';
import { Connect } from './config/';


const app = express(),
    server = new http.Server(app),
    host = "localhost"

const main : Main = {
    port: process.env.PORT || 3500,
    app, server, host,
    socket: io(server)
}

class Server
{
    constructor(private main:Main){
        
    }
    appConfig(){
        this.main.app
            .use(bodyParser.json())
            .use(bodyParser.urlencoded({extended:true}))
    }
    includeRoutes(){
        new Routes(this.main.app, this.main.socket).routesCongif()
    }
    initDB(){
        new Connect('mongodb+srv://ricardoFloresRamos:digimon3000@usuarios-mean-1mfwt.mongodb.net/test?retryWrites=true&w=majority').connection()
    }
    appExecute(){
        this.appConfig()
        this.includeRoutes()
        this.initDB()
        const onListening = () => console.log("Conexion establecida en puerto: " + this.main.port)
        this.main.server.listen(this.main.port, onListening)
    }
}
const start = new Server(main)
start.appExecute()