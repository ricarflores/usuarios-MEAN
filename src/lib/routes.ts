import {Request, Response } from "express"
import {Server as Main} from "../interfaces/"
import {
    getPersonaje,
    listPersonaje,
    postPersonaje,
    updatePersonaje,
    deletePersonaje
} from "../lib/controler" 

import { nombre, description,Params,jsonParams } from './midlewares/validaciones'
export default class Routes{
    constructor(private app: Main['app'], private socket: Main['socket']){

    }
    appRoutes(){
        this.app.get("/",(req: Request,res:Response)=>res.status(200).send(":V"))
        this.app.get("/v1/personaje/:id", Params, jsonParams , getPersonaje);
        this.app.get("/v1/personaje/",listPersonaje);
        this.app.post("/v1/personaje/", nombre,description,jsonParams,postPersonaje);
        this.app.put("/v1/personaje/:id", Params,jsonParams,updatePersonaje)
        this.app.delete("/v1/personaje/:id", Params,jsonParams,deletePersonaje)
    }
    socketRoutes(){

    }
    routesCongif(){
        this.appRoutes()
    }
}