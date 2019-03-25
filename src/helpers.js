const hbs =  require('hbs');
const usuario = require('./usuario')

hbs.registerHelper('crearUsuario',usuario.crear)
