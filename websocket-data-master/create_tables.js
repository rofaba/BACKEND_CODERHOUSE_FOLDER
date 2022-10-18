// SCRIPT CREACION DATABASE DE PRODUCTOS Y MENSAJES

const { options } = require('./options');
const knex = require('knex')(options);

//MENSAJES BASE
const mensajes = 
    [
        {
          "user": "Chat_Bot",
          "message": "Bienvenido, para empezar ingrese su email luego el mensaje.",
          "timestamp":" "
        }
      ]

      
      knex('mensajes')
              .insert(mensajes)
              .then(() => {
                  console.log('Mensajes agregados a la base de datos')
              })
              .catch(err => { console.log(err) 
              })
              .finally(() => {
                  knex.destroy();
              })



knex.schema.createTable('productos', table => {
    table.increments('id')
    table.string('title')
    table.integer('price')
    table.string('codigo')
    table.string('thumbnail')
})
    .then(() => console.log('tabla creada correctamente'))
    .catch((err) => { console.log(err); throw err})

//DATABASE CREAR TABLA DE MENSAJES
knex.schema.createTable('mensajes', table => {
    table.increments('id')
    table.string('user')
    table.integer('timestamp')
    table.string('message')
})
    .then(() => console.log('tabla mensajes creada correctamente'))
    .catch((err) => { console.log(err); throw err})
    .finally(() => {
        knex.destroy();
})

//PRODUCTOS BASE
const productos = [
    {
        "title": "Funko Pop Star Wars: The Mandalorian",
        "price": 24990,
        "thumbnail": "https://m.media-amazon.com/images/I/5176rALHhgS._AC_UL480_FMwebp_QL65_.jpg",
         "codigo": "FPM"       
      },
      {
        "title": "Funko Pop Televisión: Silicon Valley Gilfoyle",
        "price": 24990,
        "thumbnail": "https://m.media-amazon.com/images/I/41PsLYv3r2L._AC_.jpg",
        "codigo": "FPS"
      },
      {
        "title": "Funko Pop Televisión Marvel: Old Steve Roger",
        "price": 24990,
        "thumbnail": "https://m.media-amazon.com/images/I/51d9zjK3DdL._AC_SX466_.jpg",
        "codigo": "FPO"
      }
  ]


knex('productos')
        .insert(productos)
        .then(() => {
            console.log('Producto agregado a la base de datos')
        })
        .catch(err => { console.log(err) 
        })
        .finally(() => {
            knex.destroy();
        })
