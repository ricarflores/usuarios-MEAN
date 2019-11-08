import mongoose,{ Document } from 'mongoose'
interface Personaje extends Document{
    nombre: string;
    desc:string;
    foto:string;
    price:number;
    createdAt:number;
    updateAt:number;
}
export{
    Personaje
}