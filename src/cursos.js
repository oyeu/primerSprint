const fs = require('fs');
const usuario = require('./usuario')

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
        matriculados : []

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
        console.log("Cursos guardados!");
    })
};

const matricularCursoId = (id, estudiante) => {



  listar();
  let curso = listadoCursos.find(cur => cur.id===id)
  if (!curso) {
    return  [estudiante,false]
  }else {
    if (curso.matriculados.find(est => est===estudiante.documento)) {
      return [estudiante,false]
    }else {
      curso.matriculados.push(estudiante.documento);
      guardar();
      estudiante.listaCursos.push(curso.id);
      usuario.guardar()
      return [estudiante,true];
      //return "Te has matriculado al curso: " + curso.nombre;

    }
  }
}



const eliminarinscrito = (id,documento)=>{
listar();
let eliminados = listadoCursos.filter(buscar => !(buscar.id == id && buscar.documento == documento));
if(eliminados.length == listadoCursos.length){
        return('No se ha capturado el id para eliminar');
}else{
       listadoCursos=eliminados;
       guardar();
       listar();
       return 'Se elimino el aspirante'
};
}


module.exports = {
    crearcurso,
    matricularCursoId,
    eliminarinscrito

}
