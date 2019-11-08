'use strict';
import {Request, Response, NextFunction} from "express";
import {Types} from 'mongoose'
const Params = (req: Request,res:Response, next: NextFunction) =>{
    const ObjectId = Types.ObjectId;
    const params = req.params.id;
    let validate = true;

    if(ObjectId.isValid(params))
    {
        next()
    }
    else{
        
        res.status(500).send("Id Incorrecto")
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
export{
    nombre,
    description,
    Params
}