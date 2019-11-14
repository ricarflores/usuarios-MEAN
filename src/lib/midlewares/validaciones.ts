'use strict';
import {Request, Response, NextFunction} from "express";
import {Types} from 'mongoose';
import jwt from 'jsonwebtoken';
import axios from "axios"
import { variables } from './../../config/settings';
import bcrypt from 'bcrypt'
const Params = (req: Request,res:Response, next: NextFunction) =>{
    const ObjectId = Types.ObjectId;
    const params = req.params.id;
    let validate = true;

    if(ObjectId.isValid(params))
    {
        next()
    }
    else{
        
        res.status(500).send({error:"Id invalido",code:500, mesagge:"Id incorrecto"})
    }
}
const nombre = (req:Request,res:Response,next:NextFunction) =>{
    const { nombre } = req.body
    if(nombre!==undefined && nombre.length <= 2) res.status(401).json({
        code:401,
        error:true,
        data:{},
        message:"El nombre es invalido"
    })
    else next();
}
const description = (req:Request,res:Response,next:NextFunction) =>{
    const { desc } = req.body;
    const message = ((!desc)||(desc.length<5))
                    ? "La descripcion es incorrecta"
                    : ""
    
    if(message=="") next()
    else{
        res.status(401).json({
            code:401,
            error:true,
            data:{},
            message:"La descripcion es invalida"
        })
    }
}
const jsonParams = (req: Request,res:Response, next: NextFunction) =>{
    const { token } = req.query;
    if(token){
        jwt.verify(token,"~estoEsUnaCodificacion@",(err:any,decoded:any)=>{
            if(decoded && decoded.user)
            {
                console.log(decoded.user)
                const {email, password} = decoded.user;
                console.log("err:" ,err);
                console.log("decodes, ",decoded);
                let url = variables.baseUserMicroServiceUrl+email+"/login"
                console.log(url)
                next()
                /*
                axios.post(url, {password})
                    .then((data:any)=>{
                        console.log(data.data)
                        
                    })
                    .catch((err)=>{
                        console.log(err)
                        res.status(401).json({mensaje:"Acceso denegado"})
                    })*/
                
            }
            else{
                res.status(401).json({mensaje:"Acceso denegado"})
            }
        })
    }
    else{
        res.status(401).json({mensaje:"Acceso denegado"})
    }
    
}
export{
    nombre,
    description,
    Params,
    jsonParams
}