import { Router,Response, request } from "express";
import { verificaToken } from '../middlewares/autenticacion';
import { Horario } from '../models/horario.model';



const horarioRoutes = Router();




// obtener horarios disponibles

horarioRoutes.get('/getHorario/:fecha', async (req:any, res:Response)=>{

    
    let fecha = req.params.fecha;

    const horarioPost= await Horario.find({fecha})
                                    .exec();

    res.json({
        fecha,
        ok:true,
        horarioPost,
        
    });

});


//Crear Horarios

horarioRoutes.post('/',[verificaToken],(req:any, res:Response)=>{


        const body= req.body;

        Horario.create(body).then( horarioDB =>{

            res.json({
                ok:true,
                horario:horarioDB
            });
        }).catch(err=>{
            res.json(err)
        });
});

horarioRoutes.delete('/getHorario/:id', async (req:any , res:Response)=>{

    let uid= req.params.id;
    try{

        const horarioDB = await Horario.findById(uid);

        if(!horarioDB){
            return res.status(404).json({
                ok:false,
                msg:'no existe un horario por ese id',
                horarioDB
            });
        }
        await Horario.findByIdAndDelete(uid);

        res.json({
            ok:true,
            msg: 'Horario eliminado',
            horarioDB,
            
        });

    }catch(error){

        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })

    }
})



export default horarioRoutes;