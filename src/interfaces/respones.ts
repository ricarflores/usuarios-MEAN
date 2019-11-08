import { Personaje } from "./"

interface PersonajeResponse {
    code:number;
    error:boolean;
    data:Personaje | Personaje[] | null | {};
    message: Error[] | string;
}

interface Error{
    message:string;
    name:string;
    properties:{
        message:string;
        type:string;
        path:string;
        value:string;
    };
    kidn:string;
    path:string;
    value:string;
}
export{
    PersonajeResponse,
    Error
}