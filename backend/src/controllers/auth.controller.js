import prisma from "../db.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const Registrar = async (req, res) =>{
    try{
        const {email, name, lastName, password} = res.body;

        if(!email || !name || !lastName || !password){
            return res.status(400).json({error: "todos los campos son obligatorios"});
        }

        const usuarioExistente = await prisma.user.findUnique({
            where:{email : email}
        })

        if(usuarioExistente){
            return res.status(400).json({error: "ya existe un usuario con estas credenciales"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const usuarioCreado = await prisma.user.create({
            data:{
                name,
                lastName,
                email,
                password: hashedPassword
            }
        })

        res.status(201).json({mensaje:"usuario registrado con exito", usuario:{id: usuarioCreado.id, email: usuarioCreado.email, name: usuarioCreado.name, lastName: usuarioCreado.lastName, rol: usuarioCreado.rol}});

    }catch(error){
        return res.status(500).json({error: "Ha ocurrido un error al registrar"});
    }
}

export const login = async (req, res) =>{
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({error: "todos los campos son obligatorios"});
        }

        const usuario = await prisma.user.findUnique({
            where:{email : email}
        })

        if(!usuario){
            return res.status(400).json({error: "no existe un usuario con estas credenciales"});
        }


        const validPassword = await bcrypt.compare(password, usuario.password);

        if(!validPassword){
            return res.status(400).json({error: "contrasenia invalida"});
        }

        const token = jwt.sign(
            {id: usuario.id, rol: usuario.rol},
            process.env.JWT_SECRET,
            {expiresIn: "2h"}
        )

        res.json({token, usuario: {name: usuario.name, rol: usuario.rol}})
        
    }catch(error){
        return res.status(500).json({error: "Ha ocurrido un error interno al iniciar sesion"});
    }
}