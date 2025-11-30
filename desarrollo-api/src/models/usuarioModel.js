const connection = require('../../db');
const { formatToday } = require('../helpers/dateHelper');
//Encriptador.
const bcrypt = require('bcrypt');

exports.create = async ({nombre, email, contrasena, is_admin}) => {
    const contrasena_crypt = await bcrypt.hash(contrasena, 10);
    console.log(contrasena_crypt);
    
    const query = `
        INSERT INTO usuarios(nombre, email, contrasena, is_admin, fecha_creacion, fecha_modificacion)
        VALUES(?, ?, ?, ?, ?, ?)
    `;
    try{
        await connection.query(query, [nombre, email, contrasena_crypt, is_admin, formatToday(), formatToday()]);
    }catch(error){
        throw error;
    }
};

exports.login = async( {email, contrasena} ) => {
    //Buscamos el usuario por su correo.
    const query = `
        SELECT id, nombre, email, contrasena, is_admin
        FROM usuarios
        WHERE email = ?
    `;
    try{
        [results] = await connection.query(query, [email]);
        //Verificamos si encontró el usuario.
        if(results.length == 1){
            const usuario = results[0];//tomamos el unico resultado del array, ya que no hace falta tomar todo el array
            //Verificamos que la contraseña ingresada es correcta.
            const is_contrasena = await bcrypt.compare(contrasena, usuario.contrasena);
            //(contrasena ingresada, contrasena almacenada)
            return (is_contrasena) ? usuario : null;
        }else{
            return null;
        }
    }catch(error){
        throw error;
    }
}

