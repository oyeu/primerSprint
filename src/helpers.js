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


hbs.registerHelper('listarCursos2', () => {
    listadoCursos = require('./listadoCursos.json')
    if (!listadoCursos.length) {
        return "no hay cursos creados"
    } else {


        let texto = "<div class='accordion' id='accordionExample'>";
        i = 1;
        listadoCursos.forEach(curso => {
            texto = texto +
                `<div class="card">
            <div class="card-header" id="heading${i}">
              <h2 class="mb-0">
                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
                  ${curso.nombre}
                </button>
              </h2>
            </div>
        
            <div id="collapse${i}" class="collapse show" aria-labelledby="heading${i}" data-parent="#accordionExample">
              <div class="card-body">
               El identificadordel curso es:  ${curso.id}<br>
               Descripcion del curso: ${curso.descripcion}<br>
               EL valor del curso es: ${curso.valor}<br>
               La modalidad es: ${curso.modalidad}<br>
               La intensidad horaria es: ${curso.ih}<br>
               El estado del curso es: ${curso.estado}  
              </div>
            </div>
          </div>`
            i = i + 1;

        })
        texto = texto + '</div>';
        return texto;
    }
})



hbs.registerHelper('listarCursosCoordinador', () => {
    listadoCursos = require('./listadoCursos.json')
    listadoUsuarios = require('./listadoUsuarios.json')
    let tablaUsuario =

        i = 1;
    let texto = '';
    if (!listadoCursos.length) {
        return "no hay cursos creados"
    } else {
        listadoCursos.forEach(curso => {
            texto = texto + '<div class="panel-group">' +
                '<div class="panel panel-default">' +
                '<div class="panel-heading">' +
                '<h4 class="panel-title">' +
                '<a data-toggle="collapse" href="#collapse' + i + '"> Curso : ' + curso.nombre + '</a>' +
                '</h4>' +
                '</div>' +
                '<div id="collapse' + i + '" class="panel-collapse collapse">';
            texto = texto + '<div class="panel-body">' +
                '<form action="/eliminaAspiranteCoordinador" method="post"><table class="table table-striped">' +
                '<thead class="thead-dark">' +
                '<th> Nombre </th>' +
                '<th > Documento </th>' +
                '<th> Email </th>' +
                '<th> Telefono </th>' +
                '<th> Rol </th>' +
                '<th> Eliminar </th>' +
                '</thead>' +
                '<tbody>';
            curso.matriculados.forEach(usuario => {
                let usuarioCurso = listadoUsuarios.find(cur => cur.documento === usuario)
                texto = texto +
                    '<tr id="idcursoestudiante">' +
                    '<td>' + usuarioCurso.nombre + '</td>' +
                    '<td>' + usuarioCurso.documento + '</td>' +
                    '<td>' + usuarioCurso.correo + '</td>' +
                    '<td>' + usuarioCurso.telefono + '</td>' +
                    '<td>' + usuarioCurso.rol + '</td>' +
                    '<td><button type="submit" value=' + curso.id + ';' + usuarioCurso.documento + ' class="btn btn-danger" name="botonCoordinador">Eliminar</button></td></tr>';

            });
            texto = texto + '</tbody></table></form></div>' + '</div>' +
                '</div>' +
                '</div>' +
                '</div>';
            i++;
        })
        texto = texto + '';
        return texto;
    }
})





hbs.registerHelper('listarDisponibles', () => {
    listadoCursos = require('./listadoCursos.json')
    if (!listadoCursos.length) {
        return "no hay cursos creados"
    } else {

        let disponibles = listadoCursos.filter(cursos => cursos.estado === "disponible")
        if (!disponibles) {
            return "Todos los cursos se han cerrado"
        } else {

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
hbs.registerHelper('selectCursos', () => {
    listadoCursos = require('./listadoCursos.json')
    if (!listadoCursos.length) {
        return "no hay cursos creados"
    } else {

        let disponibles = listadoCursos.filter(cursos => cursos.estado === "disponible")
        if (!disponibles) {
            return "Todos los cursos se han cerrado"
        } else {
            let texto = "<form action='/matricula' method='post'>";
            texto = texto + " <div class='form-row'><div class='form-group col-md-2'><select class='form-control' style='width:200px' name='idcurso' id='idcurso' >";
            texto = texto + "<option value ='-1'>--Seleccione--</option>";

            disponibles.forEach(curso => {
                texto = texto + '<option value=' + curso.id + '>' + curso.id + ' - ' + curso.nombre + '</option>';

            })
            texto = texto + '</select></div><div class="form-group col-md-6">' +
                '<button type="submit" class="btn btn-dark">Registrar</button>' +
                '</div></div></form>';
            return texto;
        }
    }
})
hbs.registerHelper('miscursos', (aspirante) => {
    listadoCursos = require('./listadoCursos.json')
    if (!aspirante.listaCursos.length) {
        return "No tienes cursos inscritos"
    } else {

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
                "<td>" + curso.id + "</td>" +
                "<td>" + curso.descripcion + "</td>" +
                "<td>" + curso.valor + "</td>" +
                "<td>" + curso.modalidad + "</td>" +
                "<td>" + curso.ih + "</td>" +
                "<td>" + curso.estado + "</td>" +
                "<td><button type='submit' value='" + curso.id + "' class='btn btn-danger' name='boton'>Eliminar</button></td></tr>";
        })
        texto = texto + "</tbody></table></form>";
        return texto;
    }
})