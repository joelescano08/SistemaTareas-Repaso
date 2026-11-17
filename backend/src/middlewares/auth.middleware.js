import jwt from "jsonwebtoken"


export const autenticar = (req, res, next)=>{
    const authHeader = req.headers['authorization'];

    if(!autenticar || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({error: "acceso denegado, token no proporcionado"});
    }


    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(error){
        return res.status(401).json({ error: 'Token inválido o expirado' });
    }

}

export const esAdmin = (req, res, next) => {
    if(!req.user || req.user.rol !== 'admin'){
        return res.status(403).json({error: "solo un administrador puede realizar esta accion ="});
    }
    next();
}