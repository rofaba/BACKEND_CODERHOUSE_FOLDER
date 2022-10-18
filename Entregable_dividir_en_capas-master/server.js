/*  
ENTREGABLE DIVIDIR PROYECTO EN CAPAS
RODRIGO FAURE COMISION 30995
*/
//SERVER
const express = require('express');
const app = express();
const { logger, compression, fs, inspect, session, passport, Strategy, LocalStrategy, User, 
  bcrypt, fork, minimist, cluster} = require('./src/dependencias');
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
require('dotenv').config({ path: "./src/config/.env"});
const options = { alias: { p: 'PORT' }, default: { PORT: 3000 } }
const args= minimist(process.argv, options );
const PORT = args['PORT'] 
const mockerdata = require('./src/api/mocker');

//MONGOATLAS
const mongoose = require('mongoose');
mongoose
  .connect(process.env.MONGOATLAS)
  .then(() => console.log(" 🗄️  Base de Datos conectada"))
  .catch((err) => console.log(err));

const connectMongo = require('connect-mongo');
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
app.use(express.json())
app.use(express.urlencoded({ extend: true }))
app.use(express.static(__dirname + '/public'));

//MIDDELWARE AUTENTIFICACION
function auth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.render("login-error");
  }
}
//MIDDLEWARE COMPRESSION
app.use(compression());

//SESSION CONFIGURATION
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

//ARRAYS MENSAJES PRODUCTOS
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
var usuario = "";

//ROUTES GENERALES
app.use("/", require('./src/routes/login'));
app.use("/register", require('./src/routes/register'));
app.use('/productos', require('./src/routes/productos'));
app.use('/info', require('./src/routes/info'));
app.use('/random', require('./src/routes/random'));
app.use('/logout', require('./src/routes/logout'));
app.get('/api', require('./src/routes/api)'));

//USE PASSPORT
app.post("/login",
    passport.authenticate("local", { failureRedirect: "login-error" }),
    (req, res) => { res.redirect("/api")
});
// DESAFIO OBJETO PROCESS - LOGG
app.use((req, res, next) => {
    logger("./logs/info.log").info("Ruta %s metodo %s", req.baseUrl, req.method);
});

//DESAFIO NORMALIZR
const { normalizedData, denormalizedData, porcentaje, data, msgescritos, datamsg } = require('./src/api/normalizar');
const { createNoSubstitutionTemplateLiteral } = require('typescript');
const { networkInterfaces } = require('os');

//WEBSOCKET CONNECT
io.on('connection', socket => {
    console.log('Un cliente se ha conectado');
    socket.emit('user', usuario);
    socket.emit('productos', mockerdata); 
    socket.emit('mensajes', msgescritos); 
    socket.emit('compresion', porcentaje);

  socket.on('new-mensaje', data => {
        mensajes.push(data);
        io.sockets.emit('mensajes', mensajes);
        let msgString = JSON.stringify(mensajes, null, 2)
        fs.promises.writeFile('./src/DB/mensajes.txt', msgString);
        console.log('texto guardado')
    });
});

//404 STATIC
app.use((req, res) => {    
  res.status(404).sendFile(__dirname + '/public/404.html')
});

//LISTEN
httpServer.listen(PORT, function () {
    console.log(` 🚀 Servidor esperando peticiones en puerto ${PORT}`);
});