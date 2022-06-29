"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usuario_1 = __importDefault(require("./routes/usuario"));
const server_1 = __importDefault(require("./classes/server"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const post_1 = __importDefault(require("./routes/post"));
const horario_1 = __importDefault(require("./routes/horario"));
const server = new server_1.default();
//body parse
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//configurar cors
server.app.use((0, cors_1.default)({ origin: true, credentials: true }));
//rutas de mi app
server.app.use('/user', usuario_1.default);
server.app.use('/posts', post_1.default);
server.app.use('/horario', horario_1.default);
//conectar Base de Datos
mongoose_1.default.connect('mongodb+srv://user:g4D8yUOURU1po3iT@cluster0.oetikui.mongodb.net/gym-tsm', (err) => {
    if (err)
        throw err;
    console.log('Base de datos online');
});
// Levantar express
server.start(() => {
    console.log(`Servidor corriendo en el puerto ${server.port}`);
});
