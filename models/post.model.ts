import { Schema, model } from 'mongoose';


const postSchema = new Schema({

    created:{
        type: Date
    },
    fecha:{
        type: String
    },
    horario:{
        type: String
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required:[true, 'Debe de existir una referencia a un usuario']
    }


    


});
postSchema.pre<IPost>('save', function(next ){
    this.created = new Date();
    next();
});

interface IPost extends Document{
    created: Date;
    fecha: String;
    horario: String;
    usuario: String;
};
export const Post= model<IPost>('Post',postSchema);
