const express = require('express');
const bodyParser = require('body-parser');

//establecer conexion con db.js
const connection = require('./db');

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.listen(port, () => {

    console.log('Servidor iniciado en: http://localhost:' + port);

});
//el primer argumento es la ruta, el segundo es la función que se ejecuta cuando se accede a esa ruta, callback
app.get('/', (req, res) => {

    res.send('Bienvenido usuarios');

});

app.get('/saludo/:miNombre', (req, res) => {
    //const saludar = req.params.miNombre;
    const {miNombre} = req.params;
    res.send('hola '+ miNombre);
});
//evento por su ID
app.get('/eventos/:ID/:nombre', async(req,res)=>{
    const {ID} = req.params;
    const {nombre} = req.params;

    const query = `
            SELECT id, nombre, descripcion, cupo
            FROM eventos
            WHERE id = ?
            AND nombre = ?
        `;

    try{
        const [results] = await connection.query(query, [ID, nombre]);
        if(results.length == 0){
            res.status(404).json({ success: false, message: 'El evento no existe' });
        }else{
            res.json({ success: true, results: results[0] });
        }
        res.json({ success: true, results });
    }catch(error){
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al intentar recuperar los eventos' });
    }
    
});

//consulta simple al la base de datos
app.get('/eventos', async(req,res)=>{
    const query = `
            SELECT id, nombre, descripcion, cupo
            FROM eventos
        `;
    try{
        const [results] = await connection.query(query);
        res.json({ success: true, results });
    }catch(error){
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al intentar recuperar los eventos' });
    }
    
});

//ERROR 404
app.use((req, res, next) => {
    res.status(404);
    res.send(`
      <h1>404 - Página no encontrada</h1>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
      <a href="/">Volver a la página de inicio</a>
    `);
});
