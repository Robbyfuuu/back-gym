import { Schema, model,Document } from 'mongoose';



const horarioSchema = new Schema({


    fecha:{
        type: String
    },
    horario:{
        type: String
    }
});

interface IHorario extends Document{
    fecha: String;
    horario: String;
};
export const Horario = model<IHorario>('Horario',horarioSchema);

