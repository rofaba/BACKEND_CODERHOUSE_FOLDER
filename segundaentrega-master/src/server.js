/*  
SEGUNDA ENTREGA FINAL BACKEND
RODRIGO FAURE - COMISION 30995
*/

const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

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
    res.status(404)
})

//PORT
app.listen(port, () => {
    console.log(`Servidor operativo y esperando solicitudes en el puerto ${port}`);
})