const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const usuario = require('./usuario');
require('./helpers')

const directoriopublico = path.join(__dirname, '../public');
const directoriopartials = path.join(__dirname, '../partials');
const dirNode_modules = path.join(__dirname, '../node_modules')

app.use(express.static(directoriopublico));
hbs.registerPartials(directoriopartials);
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/css', express.static(dirNode_modules + '/bootstrap/dist/css'));
app.use('/js', express.static(dirNode_modules + '/jquery/dist'));
app.use('/js', express.static(dirNode_modules + '/popper.js/dist'));
app.use('/js', express.static(dirNode_modules + '/bootstrap/dist/js'));


app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('index', {});
});

app.get('/login', (req, res) => {
    res.render('login', {});
});

app.get('/registro', (req, res) => {
    res.render('registro', {});
});
app.get('/cursoscreados', (req, res) => {
    res.render('cursoscreados', {});
});
app.get('/registrocurso', (req, res) => {
    res.render('registrocurso', {});
});

app.post('/registro', (req, res) => {
    res.render('registroexitoso', {
        nombre: req.body.nombre,
        cedula: parseInt(req.body.cedula),
        correo: req.body.correo,
        telefono: parseInt(req.body.telefono)
    });
});


app.post('/registrocurso', (req, res) => {
    res.render('mostrarcurso', {
        nombre: req.body.nombre,
        id: parseInt(req.body.id),
        descripcion: req.body.descripcion,
        valor: parseInt(req.body.valor),
        modalidad: req.body.modalidad,
        ih: parseInt(req.body.ih)
    });
});
app.post('/login', (req, res) => {
    let exito = usuario.autenticar(req.body.nombre, parseInt(req.body.cedula));
    if (!exito) {
        res.render('login', {
            alerta: 'Nombre de usuario o cedula incorrectos'
        });
    } else {
        switch (exito.rol) {
            case 'aspirante':
                res.render('aspirante', {
                    nombre: exito.nombre,
                    rol: exito.rol
                });
                break;
            case 'coordinador':
                res.render('coordinador', {
                    nombre: exito.nombre,
                    rol: exito.rol
                });
                break;
        }
    }
})

app.get('*', (req, res) => {
    res.render('error', {
        estudiante: 'error mijo'
    });
});

app.listen(3000, () => {
    console.log('Escuchando en el puerto 3000');
});