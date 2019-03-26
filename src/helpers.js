const hbs = require('hbs');
const usuario = require('./usuario');
const curso = require('./cursos');

hbs.registerHelper('crearUsuario', usuario.crear);
hbs.registerHelper('crearCurso', curso.crearcurso);

hbs.registerHelper('listarCursos', () => {
    listadoCursos = require('./listadoCursos.json')
    if (!listadoCursos.length) {
      return "no hay cursos creados"
    }else {
      let texto = "<table> \
      <thead> \
      <th> Nombre </th> \
      <th> Id </th> \
      <th> Descripción </th> \
      <th> Valor </th> \
      <th> Modalidad </th> \
      <th> Intensidad horaria </th> \
      <th> estado </th> \
      </thead> \
      <tbody>";

      listadoCursos.forEach(curso => {
        texto = texto +
        '<tr>' +
        '<td>' + curso.nombre + '</td>' +
        '<td>' + curso.id + '<tyd>' +
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

        let texto = "<table> \
        <thead> \
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
          '<td>' + curso.id + '<tyd>' +
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
