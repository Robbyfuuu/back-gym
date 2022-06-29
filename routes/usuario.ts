import { Request, Response, Router } from "express";
import { Usuario, IUsuario } from '../models/usuario.model';
import bcrypt from 'bcrypt';
import Token from "../classes/token";
import { verificaToken } from '../middlewares/autenticacion';




const userRoutes = Router();


//Login
userRoutes.post('/login',(req:Request, res:Response)=>{
    
    const body = req.body;

    Usuario.findOne({rut:body.rut}, (err:any,userDB:IUsuario)=>{
        if(err) throw err;

        if(!userDB){
            return res.json({
                ok:false,
                mensaje: 'Usuario/Contraseña no son correctos'
            });}
        if (userDB.compararPassword( body.password)){
            
            const tokenUser= Token.getJwtToken({
                _id:userDB._id,
                rut: userDB.rut,
                nombre: userDB.nombre,
                telefono: userDB.telefono
            });
            res.json({
                ok: true,
                token:tokenUser
            });
        }else{
            return res.json({
                ok:false,
                mensaje: 'Usuario/Contraseña no son correctos***'
            });
        }
        
        
    });
});


//crear un usuario
userRoutes.post('/create',(req:Request, res:Response)=>{

    const user = {
        nombre:req.body.nombre,
        rut:req.body.rut,
        password:bcrypt.hashSync(req.body.password,10),
        telefono:req.body.telefono
    };
    Usuario.create(user).then(userDB=>{
        const tokenUser= Token.getJwtToken({
            _id:userDB._id,
            rut: userDB.rut,
            nombre: userDB.nombre,
            telefono: userDB.telefono
        });
        res.json({
            ok: true,
            token:tokenUser
        });
    }).catch(err=>{
        res.json({
            ok:false,
            err
        });
    });
    
    

});

userRoutes.get('/',verificaToken,(req:any,res:Response)=>{

    const usuario = req.usuario;


    res.json({
        ok: true,
        usuario
    })

});

// //Actualizar Usuario
// userRoutes.post('/update',verificaToken,(req:any, res:Response)=>{

//     const user = {
//         nombre: req.body.nombre || req.usuario.nombre,
//         rut : req.body.rut  || req.usuario.rut,
//         telefono: req.body.telefono || req.usuario.telefono
//     }

//     Usuario.findByIdAndUpdate( req.usuario._id, user, { new: true }, (err, userDB) => {

//         if ( err ) throw err;

//         if ( !userDB ) {
//             return res.json({
//                 ok: false,
//                 mensaje: 'No existe un usuario con ese ID'
//             });
//         }

//         const tokenUser = Token.getJwtToken({
//             _id: userDB._id,
//             nombre: userDB.nombre,
//             rut: userDB.rut,
//             telefono: userDB.telefono
//         });

//         res.json({
//             ok: true,
//             token: tokenUser
//         });


//     });
// });

export default userRoutes;