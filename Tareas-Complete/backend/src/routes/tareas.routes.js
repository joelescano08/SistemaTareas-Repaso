import {Router} from 'express'
import { crearTarea, obtenerMisTareas } from '../controllers/tareas.controller.js';
import { autenticar } from '../middlewares/auth.middleware.js';

const router = Router();

// Todas las rutas de tareas requieren inicio de sesión
router.use(autenticar);

router.post('/', crearTarea);
router.get('/mis-tareas', obtenerMisTareas);

export default router;