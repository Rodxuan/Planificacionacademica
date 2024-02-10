const { v4: uuidv4 } = require('uuid');

const ProfesoresController = require('./profesores.controller');
const SeccionesController = require('./secciones.controller');
const EventosController = require('./eventos.controller');


const materias = [
    {
        "id": "d50e841b-340e-4fcf-9a0f-04d5b1b13b7c",
        "materia": "Matematica",
        "profesorId": "00fbcad1-c426-43af-b623-f34aab7af9e2",
        "matricula": 12
    },
    {
        "id": "e2750179-57c1-46e4-8878-1ffdc2851833",
        "materia": "Programacion",
        "profesorId": "00fbcad1-c426-43af-b623-f34aab7af9e2",
        "matricula": 15
    }
];


class MateriasController {
    ingresarMateria(materia, profesorId, matricula) {
        const id = uuidv4();
        materias.push({ id, materia, profesorId, matricula });
        return id;
    }

    buscarMateria(materiaId) {
        for (const materia of materias) {
            if (materia.id === materiaId) {
                return materia;
            }
        }

        return false;
    }

    editarMateria(materiaId, materiaN = false, matriculaN = false, profesorIdN = false) {
        for (const materia of materias) {
            if (materia.id === materiaId) {
                materia.materia = (materiaN)? materiaN : materia.materia;
                materia.matricula = (matriculaN !== false && matriculaN >= 0)? matriculaN : materia.matricula;

                if (profesorIdN) {
                    if (ProfesoresController.buscarProfesor(profesorIdN)) {
                        materia.profesorId = profesorIdN;
                    } else {
                        return { error: 'No existe el profesor' };
                    }
                }

                return materia;
            }
        }
    }

    cambiarProfesor(materiaId, profesorId) {
        for (const materia of materias) {
            if (materia.id === materiaId) {
                materia.profesorId = profesorId;
                return true;
            }
        }

        return false;
    }

    mostrarMateriasPorProfesor() {
        const profesores = ProfesoresController.mostrarProfesores();
        const lista = [];

        console.log(materias);

        for (const profesor of profesores) {
            const objeto = { profesor, materias: [] };

            for (const materia of materias) {
                if (materia.profesorId === profesor.id) {
                    objeto.materias.push({ ...materia });
                }
            }

            lista.push(objeto);
        }

        return lista;
    }

    mostrarEventos(materiaId) {
        for (const materia of materias) {
            if (materia.id === materiaId) {
                const secciones = SeccionesController.mostrarSeccionesPorMateria(materiaId);
                const eventos = [];

                for (const seccion of secciones) {
                    const eventos_seccion = EventosController.mostrarEventosPorSeccion(seccion.id);

                    if (eventos_seccion.length) {
                        eventos_seccion.forEach(function(value) {
                            eventos.push(value);
                        });
                    }
                }

                eventos.sort(function(a, b) {
                    if (a.fecha > b.fecha) {
                        return -1;
                    } else if (a.fecha === b.fecha) {
                        return 0;
                    } else {
                        return 1;
                    }
                });

                return eventos;
            }
        }

        return false;
    }

    eliminarProfesor(materiaId) {
        for (const materia of materias) {
            if (materia.id === materiaId) {
                materia.profesorId = 0;
                return true;
            }
        }

        return false;
    }
}


module.exports = new MateriasController();
