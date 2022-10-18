/*  
ENTREGABLE V BACKEND - MOTORES DE PLANTILLAS
RODRIGO FAURE COMISION 30995
https://github.com/rofaba/backend.git
*/

const express = require('express');
const exphbs = require('express-handlebars');
const app = express();


// const productos = 
// [
//     {
//         "title": "Funko Pop Star Wars: The Mandalorian",
//         "price": 24990,
//         "thumbnail": "https://m.media-amazon.com/images/I/5176rALHhgS._AC_UL480_FMwebp_QL65_.jpg",
//         "id": 1
//       },
//       {
//         "title": "Funko Pop Televisión: Silicon Valley Gilfoyle",
//         "price": 24990,
//         "thumbnail": "https://m.media-amazon.com/images/I/41PsLYv3r2L._AC_.jpg",
//         "id": 2
//       },
//       {
//         "title": "Funko Pop Marvel: Old Steve Roger",
//         "price": 24990,
//         "thumbnail": "https://m.media-amazon.com/images/I/51d9zjK3DdL._AC_SX466_.jpg",
//         "id": 3
//       }
   
// ];

const data = productos;

//SETTINGS
app.engine('handlebars', exphbs.engine())

app.set('view engine', 'handlebars')
app.set('views', __dirname + '/public/views')
app.set('port', process.env.PORT || 8080)

//MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extend: true }))
app.use(express.static(__dirname + '/public'));

//rutas
app.get('/', (req, res) => {
    res.render('index')
    
})

app.get('/productos', (req, res) => {
    res.render('productos', {
        datos: data,
        sinproductos: data.length == 0,
        size: "50px"
        })

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
        console.log('producto guardado')
        res.redirect('/')
    }

    catch (error) {
        console.log('Ha ocurrido un error en el proceso', error)
    }
})


//error404
app.use((req, res, next) => {
    res.status(404).sendFile(__dirname + '/public/404.html')
})

//puerto activo
app.listen(8080, () => {
    console.log('El servidor se encuentra activo en el puerto 8080');
})

