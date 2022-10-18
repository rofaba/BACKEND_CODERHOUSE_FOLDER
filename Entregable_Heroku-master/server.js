/*  
ENTREGABLE BALANCE DE CARGA SERVIDOR 
RODRIGO FAURE COMISION 30995
*/

//server
const express = require('express');
const app = express();
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const compression = require('compression');

const logger = require("pino");
// logger().level = "info";

// const winston = require('winston')
// const PORT = process.env.PORT || 3000;

require('dotenv').config({ path: "./src/config/.env"});
const fs = require('fs');
const { inspect } = require('util');
const session = require('express-session');
const passport = require('passport');
const Strategy = require('passport-local');
const LocalStrategy = Strategy;
const User= require('./src/models/user')
const bcrypt = require('bcrypt');

const {fork} = require('child_process');
const minimist=require('minimist');
const options = { alias: { p: 'PORT' }, default: { PORT: 3000 } }
const args= minimist(process.argv, options );
const PORT = process.env.PORT || 3000;


const cluster = require('cluster');

// MONGOATLAS
const mongoose = require('mongoose');
mongoose
  .connect(process.env.MONGOATLAS)
  .then(() => console.log("Base de Datos conectada"))
  .catch((err) => console.log(err));

const connectMongo = require("connect-mongo");
const optionsAvanzada = { useNewUrlParser: true, useUnifiedTopology: true };
const MongoStore = connectMongo.create({
  mongoUrl: process.env.MONGOATLAS,
  mongoOptions: optionsAvanzada,  
  ttl: 60
});

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


//----- logger ------

// const logger = winston.createLogger({
//    level: 'info',
//    transports : [
//        new winston.transports.Console({ level:'verbose' }),
//        new winston.transports.File({ filename: 'info.log', level:'error' }),
//    ]
// })
// });
//---------------- COMPRESSION MW --------------

app.use(compression());

//Session config
app.use(
  session({
    store: MongoStore,
    secret: process.env.SESSIONSECRET,
    resave: false,
    saveUninitialized: false,
    
  })
);
//PASSPORT
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) console.log(err);
      if (!user) return done(null, false);
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) console.log(err);
        if (isMatch) return done(null, user);
        return done(null, false);
      });
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});


//FAKE DATA
const mockerdata = require('./src/api/mocker');

// console.log(mockerdata);

//NORMALIZR
const { normalizedData, denormalizedData, porcentaje, data, msgescritos, datamsg } = require('./src/api/normalizar');
const { createNoSubstitutionTemplateLiteral } = require('typescript');
const { loggers } = require('winston');
const { networkInterfaces } = require('os');

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

//ROUTES (PERSISTENCIA EN ARCHIVOS)

//MIDDELWARE AUTENTIFICACION

function auth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.render("login-error");
  }
}

//ROUTES
var usuario = "";

app.get("/", (req, res) => {
  if (req.user) {
    res.redirect("/api");
  } else {
    res.redirect("/login");
  }
});

app.get("/login", (req, res) => {
 
  res.render("login");
  logger().info(`ruta - metodo correctos'${req.url}' método '${req.method}'`)
});

app.get("/login-error", (req, res) => {
  res.render("login-error");
});

app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "login-error" }),
  (req, res) => {
    res.redirect("/api");
  }
);
app.get("/register", (req, res) => {
  res.render("register");
  logger().info(`ruta - metodo correctos'${req.url}' método '${req.method}'`)
});

app.post("/register", (req, res) => {
  logger().info(`ruta - metodo correctos'${req.url}' método '${req.method}'`)
  const { username, password, name } = req.body;
  User.findOne({ username }, async (err, user) => {
    if (err) console.log(err);
    if (user) res.render("register-error");
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        password: hashedPassword,
        name,
      });
      await newUser.save();
      res.redirect("/login");
    }
  });
});

app.get("/logout", (req, res, next) => {
  logger().info(`ruta - metodo correctos'${req.url}' método '${req.method}'`)
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.render('logout');
  });
});

app.get("/api", async (req, res) => {
  logger().info(`ruta - metodo correctos'${req.url}' método '${req.method}'`)
  if (req.user) {
    const datosUsuario = await User.findById(req.user._id).lean();
    res.render("index", {
      usuario: req.user.name,
      username: req.user.username
    });
  } else {
    res.redirect("/login");
  }
});

app.post('/productos', (req, res) => {
  logger().info(`ruta - metodo correctos'${req.url}' método '${req.method}'`)
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
        fs.promises.writeFile('./src/DB/productos.txt', prodString);
        console.log('producto guardado')
        res.redirect('/api')
    }

    catch (error) {
        console.log('Ha ocurrido un error en el proceso', error)
    }
})

//  -------------  DESAFIO OBJETO PROCESS - LOGG -----------

app.get('/info', (req, res) => {
  logger().info(`ruta - metodo correctos'${req.url}' método '${req.method}'`)
   const data = {
    "argv": `Argumentos de entrada: ${process.argv.slice(2)}`,
    "so": `Sistema operativo utilizado: ${process.platform}`,
    "verNode": `Versión de Node: ${process.version}`,
    "memoria": `Memoria total reservada - RSS: ${process.memoryUsage().rss} bytes`,
    "pathexec": `Path de ejecución: ${process.execPath}`,
    "processId": `Process Id: ${process.pid}`,
    "folder": `Carpeta de proyecto: ${process.cwd()}`,
    // Procesadores - Desafío Balance de Carga
    "numprocess":`Número de Procesadores: ${require('os').cpus().length}`,
    }
    console.log(data)  
    res.render('info', { data: data })
      
});

app.get('/random', (req, res) => {
  logger().info("ruta - metodo correctos")
  console.log(`cant = ${req.query.cant} || Si no fue ingresado el parámetro se asignará valor de 100 millones`)
  let cant = req.query.cant
  if (cant === undefined) { cant= 100000000};
  const child = fork('./temp/random.js');
  child.send(cant);
  child.on("message", msg => {
    res.json({ numeros: msg });
  });
});
//logger
app.use((req, res, next) => {
    logger("./logs/info.log").info("Ruta %s metodo %s", req.baseUrl, req.method);
});

app.use((req, res, next) => {
  res.status(404).render('404');
  logger("./logs/warn.log").warn("Ruta %s metodo %s no implementado", req.url, req.method);
  next();
});

//server websocket
io.on('connection', socket => {
    console.log('Un cliente se ha conectado');
    socket.emit('user', usuario);
    socket.emit('productos', mockerdata); 
    // console.log(inspect(normalizedData, true, 12, true))
    socket.emit('mensajes', msgescritos); 
    socket.emit('compresion', porcentaje);

  socket.on('new-mensaje', data => {
        // console.log(data)
        mensajes.push(data);
        io.sockets.emit('mensajes', mensajes);
        let msgString = JSON.stringify(mensajes, null, 2)
        fs.promises.writeFile('./src/DB/mensajes.txt', msgString);
        console.log('texto guardado')

    });
});

//404
app.use((req, res) => {    
  res.status(404).sendFile(__dirname + '/public/404.html');
    })

//online
httpServer.listen(PORT, function () {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
