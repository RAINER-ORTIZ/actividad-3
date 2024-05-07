const express = require('express');
const router = express.Router();

// Array para almacenar las metas (simulando una base de datos)
let goals = [];

// Obtener todas las metas
router.get('/', (req, res) => {
    try {
        res.json(goals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Agregar una nueva meta
router.post('/', (req, res) => {
    try {
        const newGoal = req.body;
        if (!newGoal.title || !newGoal.deadline) {
            return res.status(400).json({ message: "Se requieren título y fecha límite para agregar una meta." });
        }
        goals.push(newGoal);
        res.status(201).json(newGoal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Eliminar una meta por su índice en el array
router.delete('/', (req, res) => {
    try {
        const index = req.body.index;
        if (index === undefined || index < 0 || index >= goals.length) {
            return res.status(400).json({ message: "Índice de meta inválido." });
        }
        goals.splice(index, 1);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
