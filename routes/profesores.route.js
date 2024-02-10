const express = require('express');
const router = express.Router();

const ProfesoresController = require('../controllers/profesores.controller');


// POST Ingresa profesor
router.post('/', function(req, res) {
    if (req.body && req.body.nombre && req.body.apellido && req.body.ci && req.body.experiencia) {
        const { nombre, apellidop, ci, experiencia } = req.body;

        return res.status(201).json({
            id: ProfesoresController.ingresarProfesor(nombre, apellidop, ci, experiencia)
        });
    } else {
        return res.status(400).json({
            error: 'Informacion incompleta'
        });
    }
});


module.exports = router;
