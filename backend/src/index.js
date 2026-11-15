import express from 'express'
import dotenv from 'dotenv'
import authRouter from './routes/auth.routes.js';
dotenv.config();

const app = express();
app.use(express.json());
const Port = process.env.PORT;


app.use('/auth', authRouter);








app.listen(Port, ()=>{
    console.log(`el servidor esta levantado en el puerto ${Port}`);
})

app.get('/', (req, res)=>{
    res.json({mensaje: "La API esta funcionando"});
})