const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Asegúrate de importar 'cors'

const app = express();

// ------------------------------------------------------------------
// CONFIGURACIÓN DE CORS: SOLUCIÓN CORRECTA
// ------------------------------------------------------------------

// 1. Define las opciones de CORS para desarrollo
const corsOptions = {
    // ESTE DEBE SER EL PUERTO DONDE CORRE TU PROYECTO REACT
    origin: 'http://localhost:5173', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Lista de métodos permitidos
    allowedHeaders: 'Content-Type,Authorization', // Encabezados permitidos (incluye Authorization para tokens)
    credentials: true,
    optionsSuccessStatus: 204
};

// 2. Aplica el middleware CORS
app.use(cors(corsOptions)); 

// Si prefieres la versión simple para *todos* los orígenes (menos segura):
// app.use(cors());

// ------------------------------------------------------------------
// El resto de tu código
// ------------------------------------------------------------------

const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Establecer conexión con rutas (MOVIDO ANTES DE app.listen - BUENA PRÁCTICA)
app.use(require("./src/routes/eventoRoute.js"));
app.use(require("./src/routes/usuarioRoute.js"));


app.listen(port, () => {
    console.log('Servidor iniciado en: http://localhost:' + port);
});