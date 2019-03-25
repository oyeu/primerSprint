const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
require('./helpers')

const directoriopublico = path.join(__dirname, '../public');
const directoriopartials = path.join(__dirname, '../partials');
const dirNode_modules = path.join(__dirname , '../node_modules')

app.use(express.static(directoriopublico));
hbs.registerPartials(directoriopartials);
app.use(bodyParser.urlencoded({extended: false}));
app.use('/css', express.static(dirNode_modules + '/bootstrap/dist/css'));
app.use('/js', express.static(dirNode_modules + '/jquery/dist'));
app.use('/js', express.static(dirNode_modules + '/popper.js/dist'));
app.use('/js', express.static(dirNode_modules + '/bootstrap/dist/js'));


app.set ('view engine', 'hbs');

app.get('/', (req, res) =>{
  res.render('index', {
  });
});

app.post('/registro', (req, res) =>{
  res.render('registros', {
    nombre: req.body.nombre,
    cedula: parseInt(req.body.cedula),
    correo: req.body.correo,
    telefono: parseInt(req.body.telefono)
  });
});

app.get('*', (req, res) => {
  res.render('error', {
    estudiante:'error mijo'
  });
});

app.listen(3000, () => {
  console.log('Escuchando en el puerto 3000');
});
