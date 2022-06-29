"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_model_1 = require("../models/usuario.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = __importDefault(require("../classes/token"));
const autenticacion_1 = require("../middlewares/autenticacion");
const userRoutes = (0, express_1.Router)();
//Login
userRoutes.post('/login', (req, res) => {
    const body = req.body;
    usuario_model_1.Usuario.findOne({ rut: body.rut }, (err, userDB) => {
        if (err)
            throw err;
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'Usuario/Contraseña no son correctos'
            });
        }
        if (userDB.compararPassword(body.password)) {
            const tokenUser = token_1.default.getJwtToken({
                _id: userDB._id,
                rut: userDB.rut,
                nombre: userDB.nombre,
                telefono: userDB.telefono
            });
            res.json({
                ok: true,
                token: tokenUser
            });
        }
        else {
            return res.json({
                ok: false,
                mensaje: 'Usuario/Contraseña no son correctos***'
            });
        }
    });
});
//crear un usuario
userRoutes.post('/create', (req, res) => {
    const user = {
        nombre: req.body.nombre,
        rut: req.body.rut,
        password: bcrypt_1.default.hashSync(req.body.password, 10),
        telefono: req.body.telefono
    };
    usuario_model_1.Usuario.create(user).then(userDB => {
        const tokenUser = token_1.default.getJwtToken({
            _id: userDB._id,
            rut: userDB.rut,
            nombre: userDB.nombre,
            telefono: userDB.telefono
        });
        res.json({
            ok: true,
            token: tokenUser
        });
    }).catch(err => {
        res.json({
            ok: false,
            err
        });
    });
});
userRoutes.get('/', autenticacion_1.verificaToken, (req, res) => {
    const usuario = req.usuario;
    res.json({
        ok: true,
        usuario
    });
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
exports.default = userRoutes;
