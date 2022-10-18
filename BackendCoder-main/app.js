/*  
ENTREGABLE IV BACKEND - API RESTful
RODRIGO FAURE COMISION 30995
https://github.com/rofaba/backend.git
*/

const express = require('express');
const app = express();
const router = require('./routes')
const port = 8080;

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extend: true }))
// app.use('/static', express.static(__dirname + '/public'));

//rutas

app.get('/', (req, res) => {
    res.send('Servidor online. Favor dirigirse a "localhost:8080/api" para empezar')
})

app.get('/api', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')

})

app.use('/api/productos', router);

//error404
app.use((req, res, next) => {
    res.status(404).sendFile(__dirname + '/public/404.html')
})
//puerto activo
app.listen(port, () => {
    console.log(`El servidor se encuentra operativo y esperando solicitudes en el puerto ${port}`);
})