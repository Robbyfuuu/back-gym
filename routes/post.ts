import { Router,Response } from "express";
import { verificaToken } from '../middlewares/autenticacion';
import { Post } from "../models/post.model";


const postRoutes = Router();




// Obtener Post paginados

postRoutes.get('/',[verificaToken], async (req: any, res:Response)=>{

    
    // let pagina =Number(req.query.pagina) || 1;
    // let skip  = pagina -1
    // skip = skip*10;

    const usuario = req.usuario._id;

    const posts = await Post.find({usuario})
                            .sort({_id: -1})
                            
                            .populate('usuario', '-password')
                            .exec();
    
    res.json({
        ok:true,
        
        posts
    });
    

});



//Crear Post
postRoutes.post('/', [verificaToken], (req: any, res:Response)=>{


    const body = req.body;

    body.usuario= req.usuario._id;


    Post.create(body).then (async postDB =>{

       await postDB.populate('usuario', '-password');

        res.json({
            ok:true,
            post:postDB
        });

    }).catch(err=>{
        res.json(err)
    });

    
});

//Delete Post

postRoutes.delete('/:id', async (req:any , res:Response)=>{

    let uid= req.params.id;
    try{

        const postDB = await Post.findById(uid);

        if(!postDB){
            return res.status(404).json({
                ok:false,
                msg:'no existe un horario por ese id',
                postDB
            });
        }
        await Post.findByIdAndDelete(uid);

        res.json({
            ok:true,
            msg: 'Horario eliminado',
            postDB,
            
        });

    }catch(error){

        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })

    }
});












export default postRoutes;