import {Request, Response } from "express"
import Personajes from './clases/Personajes';
import {Personaje as IPersonaje} from '../interfaces/'
import {Response as R} from './clases/';
import { Types } from 'mongoose';

const getPersonaje = (req:Request, res:Response):void => {
    console.log("get");
    let id = Types.ObjectId(req.params.id)
    let per:Personajes = new Personajes(req.body);
    per.getPersonaje(id)
        .then((p:any)=>{
            const response = new R(p, req.method);
            res.status(response.getStatusCode()).json(response.data())
        })
        .catch((err:any)=>{
            const response = new R(null, req.method,err);
            res.status(response.getStatusCode()).json(response.data())
        })
}

const listPersonaje = (req:Request, res:Response):void => {
    console.log("List")
    let per:Personajes = new Personajes(req.body);
    per.getPersonaje()
        .then((p:any)=>{
            const response = new R(p, req.method);
            res.status(response.getStatusCode()).json(response.data())
        })
        .catch((err:any)=>{
            const response = new R(null, req.method,err);
            res.status(response.getStatusCode()).json(response.data())
        })
}

const postPersonaje = (req:Request, res:Response):void => {
    console.log("post");
    let per:Personajes = new Personajes(req.body);
    per.postPersonaje()
        .then((u:any)=>{
            if(u && u._id){
                const response = new R(u,req.method)
                /*
                { emial, username } = u,
                mail = new Mail(email,username)
                mail.sendEmail()
                console.log("mail: ",u)
                */
               res.status(response.getStatusCode()).json(response.data())
            }
        })
        .catch((e:any)=>{
            const response = new R(null,req.method,e)
            res.status(response.getStatusCode()).json(response.data())
        })
}

const updatePersonaje = (req:Request, res:Response):void => {
    let per: Personajes = new Personajes(req.body);
    let id =Types.ObjectId(req.params.id)
    per.updatePersonaje(id)
        .then((p:any)=>{
            const response = new R(p, req.method);
            res.status(response.getStatusCode()).json(response.data())
        })
        .catch((err:any)=>{
            const response = new R(null, req.method,err);
            res.status(response.getStatusCode()).json(response.data())
        })
}
const deletePersonaje = (req:Request, res:Response):void => {
    console.log("delete");
    let id = Types.ObjectId(req.params.id);
    let per: Personajes = new Personajes(req.body);
    per.deletePersonaje(id)
        .then((p:any)=>{
            const response = new R(p, req.method);
            res.status(response.getStatusCode()).json(response.data())
        })
        .catch((err:any)=>{
            const response = new R(null, req.method,err);
            res.status(response.getStatusCode()).json(response.data())
        })
}

export{
    getPersonaje,
    listPersonaje,
    postPersonaje,
    updatePersonaje,
    deletePersonaje
}