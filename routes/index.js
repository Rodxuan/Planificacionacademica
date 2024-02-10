const express = require('express');
const router = express.Router();

const ProfesoresRouter = require('./profesores.route');
const MateriasRouter = require('./materias.route');
const SeccionesRouter = require('./secciones.route');
const EventosRouter = require('./eventos.route');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/profesores', ProfesoresRouter);
router.use('/materias', MateriasRouter);
router.use('/secciones', SeccionesRouter);
router.use('/eventos', EventosRouter);


module.exports = router;
