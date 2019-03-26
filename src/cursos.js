const fs = require('fs');

let listadoCursos = [];

const crearcurso = (nombre, id, descripcion, ih, valor, modalidad) => {
    listar();
    let curso = {
        nombre: nombre,
        id: id,
        descripcion: descripcion,
        ih: ih,
        valor: valor,
        modalidad: modalidad,
        estado: 'disponible',

    };
    if (listadoCursos.length == 0) {
        listadoCursos.push(curso);
        console.log(listadoCursos);
        guardar();
        return "curso creado con exito"
    } else {
        let duplicado = listadoCursos.find(iden => iden.id == curso.id);
        if (!duplicado) {
            listadoCursos.push(curso);
            console.log(listadoCursos);
            guardar();
            return "Curso creado con exito"
        } else {
            return "Ese numero de id ya se encuentra en uso"
        }
    }
};

const listar = () => {
    try {
        listadoCursos = require('./listadoCursos.json');
    } catch (e) {
        listadoCursos = [];
    }
};

const guardar = () => {
    let datos = JSON.stringify(listadoCursos);
    fs.writeFile('./src/listadoCursos.json', datos, (err) => {
        if (err) throw (err);
        console.log("curso creado con exito!");
    })
};

const autenticar = (nombre, cedula) => {
    listar();
    let solicitante = listadoUsuarios.find(sol => sol.documento === cedula && sol.nombre === nombre);
    if (!solicitante) {
        return false;
    } else {
        return solicitante;
    }
}

module.exports = {
    crearcurso,
    autenticar
}
