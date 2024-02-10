const { v4: uuidv4 } = require('uuid');

const SeccionesController = require('./secciones.controller');


const eventos = [
    {
        "id": "746e3919-e32f-4d47-9c6b-238dc15be97e",
        "evento": "corte de notas",
        "seccionId": "3642ba1c-068c-4d84-ae30-736c4d7d0ce7",
        "fecha": new Date("07/08/20")
    }
];


class EventosController {
    ingresarEvento(evento, seccionId, fecha) {
        const id = uuidv4();
        eventos.push({ id, evento, seccionId, fecha: new Date(fecha) });
        return id;
    }

    buscarEvento(eventoId) {
        for (const evento of eventos) {
            if (evento.id === eventoId) {
                return evento;
            }
        }

        return false;
    }

    editarEvento(eventoId, eventoN = false, seccionIdN = false, fechaN = false) {
        for (const evento of eventos) {
            if (evento.id === eventoId) {
                evento.evento = (eventoN)? eventoN : evento.evento;
                evento.fecha = (fechaN)? fechaN: evento.fecha;

                if (seccionIdN) {
                    if (SeccionesController.buscarSeccion(seccionIdN)) {
                        evento.seccionId = seccionIdN;
                    } else {
                        return { error: 'No existe la seccion' };
                    }
                }

                return evento;
            }
        }
    }

    mostrarEventosPorSeccion(seccionId) {
        const eventos_seccion = [];

        for (const evento of eventos) {
            if (evento.seccionId === seccionId) {
                eventos_seccion.push(evento);
            }
        }

        return eventos_seccion;
    }

    eliminarEvento(eventoId) {
        for (const evento of eventos) {
            if (evento.id === eventoId) {
                eventos.splice(eventos.indexOf(evento), 1);
                return true;
            }
        }

        return false;
    }

    mostrarEventosPorProfesor(secciones_profesor) {
        const eventos_profesor = [];

        for (const evento of eventos) {
            for (const { materias, profesor } of secciones_profesor) {
                const evento_profesor = { profesor, eventos: [] };

                for (const { secciones } of materias) {
                    for (const seccion of secciones) {
                        if (evento.seccionId === seccion.id) {
                            evento_profesor.eventos.push({ ...evento });
                        }
                    }
                }

                eventos_profesor.push(evento_profesor);
            }
        }

        return eventos_profesor;
    }
}


module.exports = new EventosController();
