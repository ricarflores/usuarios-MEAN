import { Personaje as IPersonaje,PersonajeResponse, Error } from "../../interfaces/" 
export default class Response {
    private personaje: IPersonaje | IPersonaje[] | null | {} | boolean;
    private method:string;
    private errors: Error[] | any | null;
    private statcusCode:number;
    private error: boolean;
    constructor(personaje:IPersonaje | IPersonaje[] | null | {} | boolean, method:string, errors?:Error[]){
        this.personaje = personaje;
        this.method= method;
        this.error = (!this.personaje && errors) ? true : false
        this.errors = (errors) ? errors: null;
        this.statcusCode = this.setCode()
    }
    getStatusCode(){
        return this.statcusCode;
    }
    data():PersonajeResponse
    {
        return{
            code:this.statcusCode,
            error:this.error,
            data:this.personaje,
            message:this.message()
        }
    }
    message()
    {
        if(this.errors) return this.errors
        else return (this.method==="GET")
                    ? this.getMessage()
                    : (this.method==="POST")
                        ? this.postMessage()
                        : (this.method==="PUT")
                            ? this.putMessage()
                            : (this.method==="DELETE")
                                ? this.deleteMessage()
                                : 405
    }
    getMessage(){
        return (Array.isArray(this.personaje))
            ? "Personajes obtenidos exitosamente"
            : (this.statcusCode !== 404)
                ? "Personaje obtenido exitosamente"
                : "No se ha encontrado el personaje"
    }
    postMessage(){
        return (this.statcusCode===201)
            ? "Personaje añadido correctamente"
            : "Error al ingresar el personaje"
                
    }
    putMessage(){
        return (Array.isArray(this.personaje))
            ? "Personajes actualizado exitosamente"
            : (this.statcusCode !== 404)
                ? "Personaje actualizado exitosamente"
                : "No se ha encontrado el personaje"
    }
    deleteMessage(){
        return (this.statcusCode === 200)
            ? "Personaje Eliminado Correctamente"
            : "Ocurrio un error al eliminar al personaje"
    }
    setCode():number{
        return (this.method==="GET")
                ? this.getCode()
                : (this.method==="POST")
                    ? this.postCode()
                    : (this.method==="PUT")
                        ? this.putCode()
                        : (this.method==="DELETE")
                        ? this.deleteCode()
                        : 405
    }
    getCode():number{
        return ((Array.isArray(this.personaje)) || (this.personaje && Object.entries(this.personaje).length >=1) && (!this.errors))
                ? 200
                : (this.personaje && Object.entries(this.personaje).length < 1 && !this.error)
                    ? 404
                    : 500
    }
    postCode():number{
        return ((Array.isArray(this.personaje)) || (this.personaje && Object.entries(this.personaje).length >=1) && (!this.errors))
                ? 201
                : 409
    }
    putCode():number{
        return ((Array.isArray(this.personaje)) || (this.personaje && Object.entries(this.personaje).length >=1) && (!this.errors))
                ? 200
                : (this.personaje && Object.entries(this.personaje).length < 1 && !this.error)
                    ? 404
                    : 500
    }
    deleteCode():number{
        return (this.error)
            ? 500
            : (!this.error && !this.personaje)
                ? 404
                : 200
    }
}