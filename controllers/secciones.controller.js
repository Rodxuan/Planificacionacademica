const { v4: uuidv4 } = require('uuid');


const secciones = [
    {
        "id": "3642ba1c-068c-4d84-ae30-736c4d7d0ce7",
        "seccion": "a12",
        "materiaId": "d50e841b-340e-4fcf-9a0f-04d5b1b13b7c"
    }
];


class SeccionesController {
    ingresarSeccion(seccion, materiaId) {
        const id = uuidv4();
        secciones.push({ id, seccion, materiaId });
        return id;
    }

    buscarSeccion(seccionId) {
        for (const seccion of secciones) {
            if (seccion.id === seccionId) {
                return seccion;
            }
        }

        return false;
    }

    mostrarSeccionesPorMateria(materiaId) {
        const secciones_materia = [];

        for (const seccion of secciones) {
            if (seccion.materiaId === materiaId) {
                secciones_materia.push(seccion);
            }
        }

        return secciones_materia;
    }

    mostrarSeccionesPorProfesor(materias_profesor) {
        for (const seccion of secciones) {
            for (const { materias } of materias_profesor) {
                for (const materia of materias) {
                    if (!materia.secciones) {
                        materia.secciones = [];
                    }

                    if (seccion.materiaId === materia.id) {
                        materia.secciones.push({ ...seccion });
                    }
                }
            }
        }

        return materias_profesor;
    }
}


module.exports = new SeccionesController();
