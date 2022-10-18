/*  
PRIMERA ENTREGA FINAL BACKEND
RODRIGO FAURE COMISION 30995
*/
//Contenedor
const {Contenedor} = require('./src/contenedor')
var archivo = new Contenedor('productos.txt'); 
var carrito = new Contenedor('carrito.txt')

//Server Principal

const express = require('express');
const app = express();
const ejs = require('ejs');
const {body, validationResult} = require('express-validator')
const port = process.env.PORT || 8080;
const fs = require ('fs');
const { collapseTextChangeRangesAcrossMultipleVersions, InferencePriority } = require('typescript');
const { Console } = require('console');
const e = require('express');

//SETTINGS
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('port', process.env.PORT || 8080)

//MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extend: true }))
app.use(express.static(__dirname + '/public'));

//ROUTES

app.get('/', (req, res) => {res.render('index')});
app.use('/productos', require('./src/routesproductos')) 
app.use('/carrito', require('./src/routescarros')) 

//ERROR404
app.use((req, res, next) => {
    res.status(404).render('404')
})

//PORT
app.listen(port, () => {
    console.log(`El servidor se encuentra operativo y esperando solicitudes en el puerto ${port}`);
})