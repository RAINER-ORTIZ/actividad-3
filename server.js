const express = require('express');
const bodyParser = require('body-parser');
const tasksController = require('./controllers/tasksController');
const goalsController = require('./controllers/goalsController');
const authMiddleware = require('./authMiddleware'); // Middleware de autorización

const app = express();
const PORT = process.env.PORT || 3000; // Puerto por defecto 3000

// Arreglos para almacenar los datos en memoria
let tasks = [];
let goals = [];

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(bodyParser.json());

// Middleware de autorización
app.use(authMiddleware);

// Rutas principales para los controladores de tareas y metas
app.use('/tasks', tasksController);
app.use('/goals', goalsController);

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ message: "Ruta no encontrada" });
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Error interno del servidor" });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
