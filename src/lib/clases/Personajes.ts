import { Personaje as IPersonaje } from '../../interfaces/';
import { Personaje as MPersonaje } from '../../models/';
import { listPersonaje } from '../controler';
import { Types, Error } from 'mongoose';
interface IPersonajeInput{
    nombre: IPersonaje["nombre"],
    desc: IPersonaje["desc"],
    foto: IPersonaje["foto"],
    price:  IPersonaje["price"],
}
export default class Personaje
{
    private nombre: string;
    private desc: string;
    private foto: string;
    private price : number;
    private body: IPersonaje;

    constructor(body:IPersonaje){
        const { nombre, desc, foto, price } = body;
        this.nombre = nombre;
        this.desc = desc;
        this.foto=foto;
        this.price= price;
        this.body = body;
    }
    Save(data:IPersonajeInput):Promise<IPersonaje|Error[]>{
        const personaje = new MPersonaje(data)
        console.log("data: ",data);
        return new Promise((resolve,reject)=>{
            personaje.save((err:any,p:any) => {
                if(err){
                    console.log(err);
                    reject(err)
                }
                else{
                    resolve(p)
                }
            })
        })
    }
    listPersonajes(){
    }
    getPersonaje(id?:Types.ObjectId){
        const critera = (id) ? {_id:id} : {}
        return MPersonaje.find(critera)
                .then( u => (u && u.length<1) ? {} : (id && u[0]._id) ? u[0] : u )
                .catch(e => e)
    }
    postPersonaje(): Promise <IPersonaje | Error[]>{
        const data : IPersonajeInput = {
            nombre: this.nombre,
            desc: this.desc,
            foto:this.foto,
            price: this.price
        };
        return new Promise((resolve,reject)=>{
            this.Save(data)
                .then((user)=> resolve(user))
                .catch((err) => reject(err))
        })
    }
    updatePersonaje(id:Types.ObjectId){
        return new Promise((resolve,reject)=>{
            this.getPersonaje(id)
                .then((personaje:any)=>{
                    personaje.nombre = this.nombre || personaje.nombre;
                    personaje.desc = this.desc || personaje.desc;
                    personaje.price = this.price || this.price;
                    this.Save(personaje)
                        .then((newPersonaje:any)=> (newPersonaje&&newPersonaje._id) ? resolve(newPersonaje) : reject({}))
                        .catch((error:Error[])=> reject(error))
                })
        })
    }
    deletePersonaje(id:Types.ObjectId){
        const critera = {_id:id};
        return MPersonaje.deleteOne(critera)
            .then(personaje => personaje)
            .catch(err => err)
    }
}