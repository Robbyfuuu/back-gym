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
const horario_model_1 = require("../models/horario.model");
const horarioRoutes = (0, express_1.Router)();
// obtener horarios disponibles
horarioRoutes.get('/getHorario/:fecha', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let fecha = req.params.fecha;
    const horarioPost = yield horario_model_1.Horario.find({ fecha })
        .exec();
    res.json({
        fecha,
        ok: true,
        horarioPost,
    });
}));
//Crear Horarios
horarioRoutes.post('/', [autenticacion_1.verificaToken], (req, res) => {
    const body = req.body;
    horario_model_1.Horario.create(body).then(horarioDB => {
        res.json({
            ok: true,
            horario: horarioDB
        });
    }).catch(err => {
        res.json(err);
    });
});
horarioRoutes.delete('/getHorario/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let uid = req.params.id;
    try {
        const horarioDB = yield horario_model_1.Horario.findById(uid);
        if (!horarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'no existe un horario por ese id',
                horarioDB
            });
        }
        yield horario_model_1.Horario.findByIdAndDelete(uid);
        res.json({
            ok: true,
            msg: 'Horario eliminado',
            horarioDB,
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
exports.default = horarioRoutes;
