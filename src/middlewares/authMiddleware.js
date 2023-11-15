import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const isLoggedIn = (req,res,next) =>{
    try{
        const authorization = req.headers.authorization;
        if(!authorization){
            return res.status(401).send("no tienes permisos");
        }
        const token = authorization.split(" ")[1];
        const isTokenCorrect = jwt.verify(token,process.env.JWT_SECRET);
        if(isTokenCorrect){
            next();
        }
        else{
            res.status(401).send("no tienes permisos");
        }
    }
    catch(e){
        console.log(e);
        res.status(500).send("ha ocurrido un error");
    }

}

export {
    isLoggedIn
}