import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import tareasRoutes from './routes/tareas.routes.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/tareas', tareasRoutes);

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log(`Servidor esta corriendo en el puerto ${PORT}`);
});