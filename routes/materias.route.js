const express = require('express');
const router = express.Router();

const MateriasController = require('../controllers/materias.controller');
const ProfesoresController = require('../controllers/profesores.controller');


// POST Ingresar materia
router.post('/', function(req, res) {
    if (req.body && req.body.materia && req.body.profesorId && req.body.matricula) {
        const { materia, profesorId, matricula } = req.body;

        if (ProfesoresController.buscarProfesor(profesorId)) {
            return res.status(201).json({
                id: MateriasController.ingresarMateria(materia, profesorId, matricula)
            });
        } else {
            return res.status(404).json({
                error: 'No existe el profesor'
            });
        }
    } else {
        return res.status(400).json({
            error: 'Informacion incompleta'
        });
    }
});

// PUT Editar materia
router.put('/:id', function(req, res) {
    if (req.body && (req.body.materia || req.body.profesorId || req.body.matricula)) {
        const { materia, profesorId, matricula } = req.body;
        const { id } = req.params;

        if (MateriasController.buscarMateria(id)) {
            return res.status(200).json(MateriasController.editarMateria(id, materia, matricula, profesorId));
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
})

// PUT Cambiar profesor
router.put('/cambiarProfesor/:id', function(req, res) {
    if (req.body && req.body.profesorId) {
        const { profesorId } = req.body;
        const { id } = req.params;

        if (ProfesoresController.buscarProfesor(profesorId)) {
            if (MateriasController.cambiarProfesor(id, profesorId)) {
                return res.status(200).json(MateriasController.buscarMateria(id));
            } else {
                return res.status(404).json({
                    error: 'No existe la materia'
                });
            }
        } else {
            return res.status(404).json({
                error: 'No existe el profesor'
            });
        }
    } else {
        return res.status(400).json({
            error: 'Informacion imcompleta'
        });
    }
});

// GET Materias por profesor
router.get('/porProfesor', function(req, res) {
    return res.status(200).json(MateriasController.mostrarMateriasPorProfesor());
});

// GET Eventos por materia
router.get('/eventos/:id', function(req, res) {
    const eventos = MateriasController.mostrarEventos(req.params.id);

    if (eventos) {
        return res.status(200).render('eventos', { eventos, materia: req.params.id });
    } else {
        return res.status(404).json({
            error: 'No existe la materia'
        });
    }
});

// DELETE Eliminar profesor
router.delete('/eliminarProfesor/:id', function(req, res) {
    if (MateriasController.eliminarProfesor(req.params.id)) {
        return res.status(200).json({ mensaje: 'OK' });
    } else {
        return res.status(404).json({
            error: 'No existe la materia'
        });
    }
});


module.exports = router;
