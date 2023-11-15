import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
/**
 * Controlador para funciones de login y registro
 * @module authController
 */

/**
 * Función para registrar un nuevo usuario
 * @param {Request} req 
 * @param {Response} res 
 * @returns {Object<UserModel>} El usuario recién creado
 */

const register = async(req,res) => {
    const {email,password,passwordConfirm} = req.body;
    if(password !== passwordConfirm){
        return res.status(400).send("las contraseñas no coinciden");
    }
    try{
        const hash = await bcrypt.hash(password,10);
        const newUser = new User({email,password:hash});
        await newUser.save();
        res.json(newUser);
    }
    catch(e){
        console.log(e);
        res.status(500).send("Ha ocurrido un error");
    }
    
};

/**
 * Función para loguear a un usuario
 * @param {Request} req 
 * @param {Response} res 
 * @returns {String} token de autenticación
 */
const login = async(req,res) =>{
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).send("Credenciales incorrectas, según Ander no es así, le estoy convenciendo");
        }
        console.log(password,user);
        const passwordIsCorrect = await bcrypt.compare(password,user.password);
        if(!passwordIsCorrect){
            return res.status(400).send("Credenciales incorrectas, según Ander no es así, le estoy convenciendo");
        }
        const token = await jwt.sign({email, id:user._id},process.env.JWT_SECRET,{ expiresIn: '12h' });
        res.json({token});
    }
    catch(e){
        console.log(e);
        res.status(500).send("Ha ocurrido un error");
    }

}

export default {
    register,
    login
}