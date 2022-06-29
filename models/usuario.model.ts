



import { Schema, model,Document} from 'mongoose';
import bcrypt from 'bcrypt';


const usuarioSchema = new Schema({

    nombre:{
        type: String,
        required : [true, 'El nombre es necesario']
    },
    rut:{
        type:String,
        unique: true,
        required: [true, 'El Rut es necesario']
    },
    password:{
        type: String,
        required:[true, 'La Contraseña es necesario']
    },
    telefono:{
        type: Number,
        required:[true, 'El numero es necesario']
    }

    
});

usuarioSchema.method('compararPassword', function<Any>(password: string=''):boolean{
    if(bcrypt.compareSync(password, this.password)){
        return true;
    }else{
        return false;
    }
});

export interface IUsuario extends Document{
    nombre:string;
    rut:string;
    password:string;
    telefono:number;
    compararPassword(password: string):boolean;
}
export const Usuario = model<IUsuario>('Usuario',usuarioSchema);