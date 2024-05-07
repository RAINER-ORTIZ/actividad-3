const express = require('express');
const router = express.Router();

// Array para almacenar las tareas (simulando una base de datos)
let tasks = [];

// Obtener todas las tareas
router.get('/', (req, res) => {
    try {
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Agregar una nueva tarea
router.post('/', (req, res) => {
    try {
        const newTask = req.body;
        if (!newTask.title || !newTask.deadline) {
            return res.status(400).json({ message: "Se requieren título y fecha límite para agregar una tarea." });
        }
        tasks.push(newTask);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Eliminar una tarea por su índice en el array
router.delete('/', (req, res) => {
    try {
        const index = req.body.index;
        if (index === undefined || index < 0 || index >= tasks.length) {
            return res.status(400).json({ message: "Índice de tarea inválido." });
        }
        tasks.splice(index, 1);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
