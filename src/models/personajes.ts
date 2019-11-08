import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

import { Personaje as IPersonajes } from '../interfaces/';

const personajeSchema: Schema = new Schema ({
    nombre:{
        type:String,
        require:[true,"Nombre de Personaje Requerido"],
        lowercase: true,
        trim: true,
        index: true
    },
    desc:{
        type:String,
        required:[true, "La descripcion es requerida"],
        lowercase:true
    },
    foto:{
        type:String,
    },
    price:{
        type:Number,
        required:[true, "El precio es Requerido"],
    },
    createdAt:{
        type:Number,
        required:true,
        default:Date.now()
    },
    updateAt:{
        type:Number,
        required:true,
        default:Date.now()
    },
});

personajeSchema.plugin(uniqueValidator,{ message:"Ya existe"});


export default mongoose.model<IPersonajes>("Personaje", personajeSchema);