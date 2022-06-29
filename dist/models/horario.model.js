"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Horario = void 0;
const mongoose_1 = require("mongoose");
const horarioSchema = new mongoose_1.Schema({
    fecha: {
        type: String
    },
    horario: {
        type: String
    }
});
;
exports.Horario = (0, mongoose_1.model)('Horario', horarioSchema);
