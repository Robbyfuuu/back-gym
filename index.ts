import userRoutes from "./routes/usuario";
import Server from "./classes/server";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from 'cors';
import postRoutes from "./routes/post";
import horarioRoutes from './routes/horario';


const server = new Server();


//body parse
server.app.use(bodyParser.urlencoded({extended:true}));
server.app.use(bodyParser.json());

//configurar cors

server.app.use(cors({ origin: true, credentials: true     }));

//rutas de mi app
server.app.use(  '/user',userRoutes);
server.app.use(  '/posts',postRoutes);
server.app.use(  '/horario',horarioRoutes);


//conectar Base de Datos


mongoose.connect('mongodb+srv://user:g4D8yUOURU1po3iT@cluster0.oetikui.mongodb.net/gym-tsm',
                  (err)=>{if(err) throw err;
                  console.log('Base de datos online')} );

// Levantar express
server.start(()=>{
    console.log(`Servidor corriendo en el puerto ${server.port}`)
});

