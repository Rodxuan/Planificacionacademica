const express = require('express');
const router = express.Router();

const SeccionesController = require('../controllers/secciones.controller');
const MateriasController = require('../controllers/materias.controller');


// POST Ingresar seccion
router.post('/', function(req, res) {
    if (req.body && req.body.seccion && req.body.materiaId) {
        const { seccion, materiaId } = req.body;

        if (MateriasController.buscarMateria(materiaId)) {
            return res.status(201).json({
                id: SeccionesController.ingresarSeccion(seccion, materiaId)
            });
        } else {
            return res.status(404).json({
                error: 'No existe la materia'
            });
        }
    } else {
        return res.status(400).json({
            error: 'Informacion incompleta'
        });
    }
});

// GET de prueba
router.get('/porMateria', function(req, res) {
    return res.status(200).json(SeccionesController.mostrarSeccionesPorProfesor(
        MateriasController.mostrarMateriasPorProfesor()
    ));
});


module.exports = router;
