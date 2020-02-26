// ---------- Requiriendo modulos----------------

const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const hbs = require('express-handlebars');

// ---------------------------------------------------

//---------------Inicializaciones---------------------

const app = express();                                              // inicializando express

//-----------------------------------------------------

//-------------------Configuraciones-------------------

app.set('port', 3000);                                              // asignando puerto del servidor

app.set('views', path.join(__dirname, 'views'));                    // ubicando donde estan las vistas

app.engine('.hbs', hbs({ 
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),             // ubicando donde esta los layouts
    partialsDir: path.join(app.get('views'), 'partials'),           // ubicado dende estan los partials
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//------------------------------------------------------

//---------------------Middleware------------------------
app.use(morgan('dev')); 
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const storage =  multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),                    //destino de las imagenes subidas
    filename: (req, file, cb) => {                                          //
        cb(null, new Date().getTime() + path.extname(file.originalname));   // renombrando las imagenes subidas 
    }                                                                       //
})
app.use(multer({storage}).single('imagen'));
//-------------------------------------------------------

//-------------------routes------------------------------
app.use(require('./routes'));
module.exports = app; 
//-------------------------------------------------------