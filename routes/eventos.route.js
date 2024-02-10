const express = require('express');
const router = express.Router();

const EventosController = require('../controllers/eventos.controller');
const SeccionesController = require('../controllers/secciones.controller');
const MateriasController = require('../controllers/materias.controller');


// POST Ingresar evento
router.post('/', function(req, res) {
    if (req.body && req.body.evento && req.body.seccionId && req.body.fecha) {
        const { evento, seccionId, fecha } = req.body;

        if (SeccionesController.buscarSeccion(seccionId)) {
            return res.status(201).json({
                id: EventosController.ingresarEvento(evento, seccionId, fecha)
            });
        } else {
            return res.status(404).json({
                error: 'No existe la seccion'
            });
        }
    } else {
        return res.status(400).json({
            error: 'Informacion incompleta'
        });
    }
});

// PUT Editar evento
router.put('/:id', function(req, res) {
    if (req.body && (req.body.evento || req.body.seccionId || req.body.fecha)) {
        const { evento, seccionId, fecha } = req.body;
        const { id } = req.params;

        if (EventosController.buscarEvento(id)) {
            return res.status(200).json(EventosController.editarEvento(id, evento, seccionId, fecha));
        } else {
            return res.status(404).json({
                error: 'No existe el evento'
            });
        }
    } else {
        return res.status(400).json({
            error: 'Informacion incompleta'
        });
    }
});

// DELETE evento
router.delete('/:id', function(req, res) {
    if (EventosController.eliminarEvento(req.params.id)) {
        return res.status(200).json({ mensaje: 'OK' });
    } else {
        return res.status(404).json({
            error: 'No existe el evento'
        });
    }
});

// GET eventos por profesor
router.get('/porProfesor', function(req, res) {
    return res.status(200).render('eventos_profesor', {
        eventos_profesor: EventosController.mostrarEventosPorProfesor(
            SeccionesController.mostrarSeccionesPorProfesor(
                MateriasController.mostrarMateriasPorProfesor()
            )
    )});
});


module.exports = router;
