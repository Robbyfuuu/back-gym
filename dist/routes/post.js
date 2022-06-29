"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const autenticacion_1 = require("../middlewares/autenticacion");
const post_model_1 = require("../models/post.model");
const postRoutes = (0, express_1.Router)();
// Obtener Post paginados
postRoutes.get('/', [autenticacion_1.verificaToken], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // let pagina =Number(req.query.pagina) || 1;
    // let skip  = pagina -1
    // skip = skip*10;
    const usuario = req.usuario._id;
    const posts = yield post_model_1.Post.find({ usuario })
        .sort({ _id: -1 })
        .populate('usuario', '-password')
        .exec();
    res.json({
        ok: true,
        posts
    });
}));
//Crear Post
postRoutes.post('/', [autenticacion_1.verificaToken], (req, res) => {
    const body = req.body;
    body.usuario = req.usuario._id;
    post_model_1.Post.create(body).then((postDB) => __awaiter(void 0, void 0, void 0, function* () {
        yield postDB.populate('usuario', '-password');
        res.json({
            ok: true,
            post: postDB
        });
    })).catch(err => {
        res.json(err);
    });
});
//Delete Post
postRoutes.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let uid = req.params.id;
    try {
        const postDB = yield post_model_1.Post.findById(uid);
        if (!postDB) {
            return res.status(404).json({
                ok: false,
                msg: 'no existe un horario por ese id',
                postDB
            });
        }
        yield post_model_1.Post.findByIdAndDelete(uid);
        res.json({
            ok: true,
            msg: 'Horario eliminado',
            postDB,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}));
exports.default = postRoutes;
