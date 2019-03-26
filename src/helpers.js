const hbs = require('hbs');
const usuario = require('./usuario');
const curso = require('./cursos');

hbs.registerHelper('crearUsuario', usuario.crear);
hbs.registerHelper('crearCurso', curso.crearcurso);

hbs.registerHelper('listar', () => {
    listadoCursos = require('./listadoCursos.json')
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
            '<td>' + curso.intensidad_horaria + '</td>' +
            '<td>' + curso.estado + '</td></tr>';

    })
    texto = texto + '</tbody></table>';
    return texto;
})