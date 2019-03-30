const hbs = require('hbs');
const usuario = require('./usuario');
const curso = require('./cursos');

hbs.registerHelper('crearUsuario', usuario.crear);
hbs.registerHelper('crearCurso', curso.crearcurso);
hbs.registerHelper('listarCursos', () => {
    listadoCursos = require('./listadoCursos.json')
    if (!listadoCursos.length) {
        return "no hay cursos creados"
    } else {
      let texto = "<table class='table table-striped'> \
                  <thead class='thead-dark'> \
                  <th> Nombre </th> \
                  <th > Id </th> \
                  <th> Descripción </th> \
                  <th> Valor </th> \
                  <th> Modalidad </th> \
                  <th> Intensidad horaria </th> \
                  <th> estado </th> \
                  </thead> \
                  <tbody>";

      listadoCursos.forEach(curso => {
        texto = texto +
                '<tr id="idcursoestudiante">' +
                '<td>' + curso.nombre + '</td>' +
                '<td>' + curso.id + '</td>' +
                '<td>' + curso.descripcion + '</td>' +
                '<td>' + curso.valor + '</td>' +
                '<td>' + curso.modalidad + '</td>' +
                '<td>' + curso.ih + '</td>' +
                '<td>' + curso.estado + '</td></tr>';

      })
      texto = texto + '</tbody></table>';
      return texto;
    }
})
hbs.registerHelper('listarDisponibles', () => {
    listadoCursos = require('./listadoCursos.json')
    if (!listadoCursos.length) {
      return "no hay cursos creados"
    }else {

      let disponibles = listadoCursos.filter(cursos => cursos.estado ==="disponible")
      if (!disponibles) {
        return "Todos los cursos se han cerrado"
      }else {

        let texto = "<table class='table table-striped'> \
                    <thead class='thead-dark'> \
                    <th> Nombre </th> \
                    <th> Id </th> \
                    <th> Descripción </th> \
                    <th> Valor </th> \
                    <th> Modalidad </th> \
                    <th> Intensidad horaria </th> \
                    <th> estado </th> \
                    </thead> \
                    <tbody>";

        disponibles.forEach(curso => {
          texto = texto +
                  '<tr>' +
                  '<td>' + curso.nombre + '</td>' +
                  '<td>' + curso.id + '</td>' +
                  '<td>' + curso.descripcion + '</td>' +
                  '<td>' + curso.valor + '</td>' +
                  '<td>' + curso.modalidad + '</td>' +
                  '<td>' + curso.ih + '</td>' +
                  '<td>' + curso.estado + '</td></tr>';

        })
        texto = texto + '</tbody></table>';
        return texto;
      }
    }
})
hbs.registerHelper('miscursos', (aspirante) =>{
  listadoCursos = require('./listadoCursos.json')
  if (!aspirante.listaCursos.length) {
    return "No tienes cursos inscritos"
  }else {

    let texto = "<form action='/eliminaCursoAspirante' method='post'>" +
                "<table class='table table-striped'> \
                <thead class='thead-dark'> \
                <th> Nombre </th> \
                <th> Id </th> \
                <th> Descripción </th> \
                <th> Valor </th> \
                <th> Modalidad </th> \
                <th> Intensidad horaria </th> \
                <th> Estado </th> \
                <th> Eliminar </th> \
                </thead> \
                <tbody>";

    aspirante.listaCursos.forEach(id => {
      let curso = listadoCursos.find(crc => crc.id === id);
      texto = texto +
              "<tr>" +
              "<td>" + curso.nombre + "</td>" +
              "<td name='idcurso'>" + curso.id + "</td>" +
              "<td>" + curso.descripcion + "</td>" +
              "<td>" + curso.valor + "</td>" +
              "<td>" + curso.modalidad + "</td>" +
              "<td>" + curso.ih + "</td>" +
              "<td>" + curso.estado + "</td>"+
              "<td><button type='submit' class='btn btn-danger'>Eliminar</button></td></tr>";
    })
    texto = texto + "</tbody></table></form>";
    return texto;
  }
})

hbs.registerHelper('selectCursos', () => {
    listadoCursos = require('./listadoCursos.json')
    if (!listadoCursos.length) {
      return "no hay cursos creados"
    }else {

      let disponibles = listadoCursos.filter(cursos => cursos.estado ==="disponible")
      if (!disponibles) {
        return "Todos los cursos se han cerrado"
      }else {
        let texto ="<form action='/matricula' method='post'>";
        texto = texto+" <div class='form-row'><div class='form-group col-md-2'><select class='form-control' style='width:200px' name='idcurso' id='idcurso' >";
        texto = texto +"<option value ='-1'>--Seleccione--</option>";

        disponibles.forEach(curso => {
          texto = texto +'<option value='+curso.id+'>'+curso.id+' - '+curso.nombre+'</option>';

        })
        texto = texto + '</select></div><div class="form-group col-md-6">'+
        '<button type="submit" class="btn btn-dark">Registrar</button>'+
        '</div></div></form>';
        return texto;
      }
    }
})
