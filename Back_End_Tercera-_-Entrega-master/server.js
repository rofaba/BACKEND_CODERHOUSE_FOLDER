/*  
ENTREGABLE 3
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

//CLUSTER
const cluster  =require('cluster');
const { cpus } =require('os');
const PORT = parseInt(process.argv[2]) || 3000;
const modoCluster = process.argv[3] == "CLUSTER";

if (modoCluster && cluster.isPrimary) {
  const numCPUs = cpus().length;

  console.log(`Número de procesadores: ${numCPUs}`);
  console.log(`PID MASTER ${process.pid}`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
}
  // ---Logger -------------------------------

const logger = require("pino");

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

// const PORT = args['PORT'] 
// const cluster = require('cluster');

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

// ----------------  NODEMAILER ETHEREAL CONFIG --------------------------------

const nodemailer = require("nodemailer");
// const createTransport = require('nodemailer');

const ADMIN_EMAIL = 'rodrigofaure@gmail.com';
const USER_EMAIL = 'jaida.barton@ethereal.email';
const USER_PASSWORD = 'Ud4KzQjrJMTRNX7gMF';

const transporter = nodemailer.createTransport({
  
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
      user: USER_EMAIL, 
      pass: USER_PASSWORD,
  }
});

// ---------------   TWILIO CONFIG ------------------------------

const twilio = require('twilio')
const accountSid = process.env.ACCOUNTSID 
const authToken = process.env.AUTHTOKEN

const client = twilio(accountSid, authToken);

// ------- option configuración mensaje de prueba ------------

const optionsTwilio = {
  body: "espera what?",
  mediaUrl: [
    "https://i0.wp.com/www.periodismo.com/wp-content/subid/Replica-LEGO-del-gato.jpg?fit=1440%2C1440&ssl=1",
  ],
  from: "whatsapp:+14155238886",
  to: "whatsapp:+56999986367",
};

// ---- envío mensaje --------------------------------
const message = client.messages.create(optionsTwilio);
console.log(message);

  //TEMPLATE ENGINE
const exphbs = require('express-handlebars');
const ejs = require('ejs');

//SETTINGS
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs.engine())
app.set('views', __dirname + '/public/views')

app.set('port', PORT)
// app.set('view engine', 'ejs')
//MIDDELWARE
app.use(express.json())
app.use(express.urlencoded({ extend: true }))
app.use(express.static(__dirname + '/public'));

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
let carrosarray = [
    {
      "id": 1,
      "timestamp": 1657245632172,
      "productos": [
        {
          "title": "Funko Pop Televisión: Men in Black",
          "thumbnail": "https://m.media-amazon.com/images/I/61gWrFdmcpL._AC_SL1300_.jpg",
          "codigo": "37707",
          "price": "24990",
          "stock": "12",
          "descripcion": "Buddy: Men In Black: Agent K & Neeble Figura De Vinil , Multicolor",
          "timestamp": 1657238310200,
          "id": 1
        }
      ]
    },
    {
      "id": 1,
      "timestamp": 1657245632172,
      "productos": [
        {
          "title": "Funko Pop Televisión: Men in Black",
          "thumbnail": "https://m.media-amazon.com/images/I/61gWrFdmcpL._AC_SL1300_.jpg",
          "codigo": "37707",
          "price": "24990",
          "stock": "12",
          "descripcion": "Buddy: Men In Black: Agent K & Neeble Figura De Vinil , Multicolor",
          "timestamp": 1657238310200,
          "id": 1
        },
        {
          "title": "Funko Pop Star Wars: The Mandalorian",
          "thumbnail": "https://m.media-amazon.com/images/I/5176rALHhgS._AC_UL480_FMwebp_QL65_.jpg",
          "codigo": "2322",
          "price": "1990",
          "stock": "7",
          "descripcion": "Funko Pop Mandalorian With The Child Completamente Nuevo y Original",
          "id": 2,
          "timestamp": 1657231377094
        },
        {
          "title": "Funko Pop Silicon Valley: Gilfoyle",
          "thumbnail": "https://m.media-amazon.com/images/I/41PsLYv3r2L._AC_.jpg",
          "codigo": "45610",
          "price": "24990",
          "stock": "8",
          "descripcion": "Silicon Valley: Gilfoyle, original nuevo. Sellado.",
          "id": "3",
          "timestamp": 1657238881029
        }
      ]
    }
  ]


//MIDDELWARE AUTENTIFICACION

function auth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.render("login-error");
  }
}

//ROUTES
app.use('api/carrito', require('./src/routes/routescarros')) 
app.get("/carrito", (req, res, next) => { res.render("carrito") });

var usuario = "";

//ingreso
app.get("/", (req, res) => {
  if (req.user) {
    res.redirect("/api");
  } else {
    res.redirect("/login");
  }
});

//login
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

//registro

app.get("/register", (req, res) => {
  res.render("register");
  logger().info(`ruta - metodo correctos'${req.url}' método '${req.method}'`)
});

app.post("/register", (req, res) => {
  logger().info(`ruta - metodo correctos'${req.url}' método '${req.method}'`)
  const { username, password, name, address, phone, avatar } = req.body;
  User.findOne({ username }, async (err, user) => {
    if (err) console.log(err);
    if (user) res.render("register-error");
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        password: hashedPassword,
        name,
        address,
        phone, 
        avatar
      });
      await newUser.save();
      //ENVIO MAIL DE REGISTRO A ADMIN
      toMail();
      async function toMail(){
      try {
        let info = await transporter.sendMail({
          from: `"E-Commerce Register" <${USER_EMAIL}>`,
          to: `${ADMIN_EMAIL}`,
          subject: "Nuevo registro",
          html: `Se ha registrado un nuevo usuario ${newUser}`,
            });
        
            console.log(info);
        
      } catch (error) {
        console.log(err, 'error envio de mail');
      }
    }
    
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

//API
app.get("/api", async (req, res) => {
  logger().info(`ruta - metodo correctos'${req.url}' método '${req.method}'`)
  if (req.user) {
    const datosUsuario = await User.findById(req.user._id).lean();
    res.render("index", {
      avatar: req.user.avatar,
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
    socket.emit('productos', productos); 
    // console.log(inspect(normalizedData, true, 12, true))
    socket.emit('mensajes', msgescritos); 
    // socket.emit('compresion', porcentaje);

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
    console.log(`Servidor esperando peticiones en puerto ${PORT}`);
});
