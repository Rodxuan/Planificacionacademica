const { v4: uuidv4 } = require('uuid');


const profesores = [
    {
        "id": "00fbcad1-c426-43af-b623-f34aab7af9e2",
        "nombre": "Francisco",
        "apellido": "Duran",
        "experiencia": 4,
        "ci": 31232421
    },
    {
        "id": "9521ceda-9ac6-4f5e-b960-50433a32b021",
        "nombre": "Daniel",
        "apellido": "Duran",
        "experiencia": 25,
        "ci": 31232475
    }
];


class ProfesoresController {
    ingresarProfesor(nombre, apellido, ci, experiencia) {
        const id = uuidv4();
        profesores.push({ id, nombre, apellido, ci, experiencia });
        return id;
    }

    buscarProfesor(id) {
        for (const profesor of profesores) {
            if (profesor.id === id) {
                return profesor;
            }
        }

        return false;
    }

    mostrarProfesores() {
        return profesores;
    }
}


module.exports = new ProfesoresController();
