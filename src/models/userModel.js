import mongoose from "mongoose";
/**
 * @module models/userModel
 */

/**
 * Modelo de usuario para loguearse y poder hacer scraping
 * @typedef {Object} UserModel
 * @property {String} email email único para cada usuario
 * @property {String} password hash de la contraseña del usuario
 */
const userSchema = new mongoose.Schema({
    email:String,
    password:String
});

const userModel = mongoose.model("User",userSchema);

export default userModel;