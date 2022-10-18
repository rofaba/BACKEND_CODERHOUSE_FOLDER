/*  
ENTREGABLE WEBSOCKET MOCKER AND NORMALIZR  
RODRIGO FAURE COMISION 30995
*/

//server
const express = require('express');
const app = express();
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const PORT = process.env.PORT || 3000;

//DEPENDENCIAS
const fs = require('fs');
const { inspect } = require('util');

//TEMPLATE ENGINE
const exphbs = require('express-handlebars');

//SETTINGS
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/public/views')
app.engine('handlebars', exphbs.engine())
app.set('port', PORT)

//MIDDELWARE
app.use(express.json())
app.use(express.urlencoded({ extend: true }))
app.use(express.static(__dirname + '/public'));

//FAKE DATA
const mockerdata = require('./src/api/mocker');

console.log(mockerdata);

//NORMALIZR
const { normalizedData, denormalizedData, porcentaje, data, msgescritos } = require('./src/api/normalizar')

//mensajes y productos pre archivos
const productos = [
    {
        "title": "Funko Pop Star Wars: The Mandalorian",
        "price": 24990,
        "thumbnail": "https://m.media-amazon.com/images/I/5176rALHhgS._AC_UL480_FMwebp_QL65_.jpg",
        "id": 1
    },
    {
        "title": "Funko Pop Televisión: Silicon Valley Gilfoyle",
        "price": 24990,
        "thumbnail": "https://m.media-amazon.com/images/I/41PsLYv3r2L._AC_.jpg",
        "id": 2
    },
    {
        "title": "Funko Pop Televisión Marvel: Old Steve Roger",
        "price": 24990,
        "thumbnail": "https://m.media-amazon.com/images/I/51d9zjK3DdL._AC_SX466_.jpg",
        "id": 3
    }
]
const mensajes =  [
    {
    "id": 1,
    "author": {
        "id": "rodrigofaure@gmail.com",
        "nombre": "Rodrigo",
        "apellido": "Faure",
        "edad": "46",
        "alias": "rofaba",
        "avatar": "https://static.vecteezy.com/system/resources/thumbnails/000/550/980/small/user_icon_001.jpg"
      
      },
    "text": {
      "message":"hola Mundo",
      "id": 1
    }      
  },
  {
    "id": 2,  
    "author": {
      "id": "rodrigofaure@gmail.com",
      "nombre": "Rodrigo",
      "apellido": "Faure",
      "edad": "46",
      "alias": "rofaba",
      "avatar": "https://static.vecteezy.com/system/resources/thumbnails/000/550/980/small/user_icon_001.jpg"
     
      },
    "text": {
      "message":"Mensaje Prueba Dos",
      "id": 2
      }

    },
  {
    "id": 3,
    "author": {
      "id": "elpepe@gmail.com",
      "nombre": "Pepe",
      "apellido": "Trueno",
      "edad": "55",
      "alias": "PepeThunder",
      "avatar": "https://i1.sndcdn.com/avatars-000668621474-g5g0sa-t240x240.jpg"
      
    },
    "text": {
      "message": "Usuario número Dos", 
      "id": 3
    }
  }  
]

//ROUTES PERSISTENCIA EN ARCHIVOS 
app.get('/', (req, res) => {
    res.render('index')
   
})

app.post('/productos', (req, res) => {
    try {
        const nuevoProducto = req.body;
        if (productos.length == 0) {
            nuevoProducto.id = 1
        } else {
            const identificadores = [];
            productos.forEach(element => identificadores.push(element.id));
            nuevoProducto.id = (Math.max(...identificadores) + 1);
        }
        productos.push(nuevoProducto)
        let prodString = JSON.stringify(productos, null, 2)
        fs.promises.writeFile("productos.txt", prodString);
        console.log('producto guardado')
        res.redirect('/')
    }

    catch (error) {
        console.log('Ha ocurrido un error en el proceso', error)
    }
})

//server websocket
io.on('connection', socket => {
    console.log('Un cliente se ha conectado');
    socket.emit('productos', mockerdata); 
    // console.log(inspect(normalizedData, true, 12, true))
    socket.emit('mensajes', data.mensajes); 
    socket.emit('compresion', porcentaje);
    
    socket.on('new-mensaje', data => {
        console.log(data)
        mensajes.push(data);
        io.sockets.emit('mensajes', mensajes);
        let msgString = JSON.stringify(mensajes, null, 2)
        fs.promises.writeFile("mensajes.txt", msgString);
        console.log('texto guardado')

    });
});

//404
app.use((req, res, next) => {
    res.status(404).sendFile(__dirname + '/public/404.html')
})

//online
httpServer.listen(PORT, function () {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});