import mongoose from 'mongoose';
import { resolve } from 'path';

export default class Connect{
    constructor(private url:string){

    }
    connection(){
        mongoose.set('useCreateIndex', true);
        mongoose.connect(this.url, {useNewUrlParser: true,useUnifiedTopology: true })
            .then((resolve)=>
            {
                mongoose.Promise = global.Promise
                console.log("connection to mongo Atlas")
            })
            .catch((reject:any)=>{
                console.log("Error Mongo");
                console.log(reject);
            })
    }
}