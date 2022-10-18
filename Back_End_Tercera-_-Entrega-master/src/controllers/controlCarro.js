const { timingSafeEqual } = require('crypto');
const fs = require ('fs');
const {Contenedor} = require('../contenedor')
var archivo = new Contenedor('productos.txt'); 
var carrito = new Contenedor('carrito.txt')

//com => a JS propios para import/require

const twilio = require('twilio')
const accountSid = process.env.ACCOUNTSID 
const authToken = process.env.AUTHTOKEN

const client = twilio(accountSid, authToken);
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
})
module.exports = {

postCarro: (req, res) => {
    const carritos = JSON.parse(fs.readFileSync('carrito.txt', 'utf-8'));
    const carrosArray = carritos;
    const nuevoCarro = req.body
    nuevoCarro.timestamp = Date.now()
    
    try {
        if (carrosArray.length == 0) {
            nuevoCarro.id = 1
        } else {
            const identificadores = [];
            carrosArray.forEach(element => identificadores.push(element.id));
            nuevoCarro.id = (Math.max(...identificadores) + 1);
        }

        carrosArray.push(nuevoCarro);

        const nuevoArrayCarros = JSON.stringify(carrosArray, null, 2)
        fs.writeFileSync('carrito.txt', nuevoArrayCarros);
        console.log(`se ha ingresado un carro nuevo con el id: ${nuevoCarro.id}`)
        res.sendStatus(200)
    }
    catch (error) {
        console.log('Ha ocurrido un error en el proceso', error)
    }
},

delCarro: (req, res) => {
         
    const carrosexistentes = JSON.parse(fs.readFileSync('carrito.txt', 'utf-8'));
    const carrosarray = carrosexistentes;
    const idparaborrar = Number(req.params.id);
          try {
            const elementoParaBorrar = carrosarray.findIndex((element) => element.id == idparaborrar);
            
                if (elementoParaBorrar != -1) {
            carrosarray.splice((carrosarray.findIndex((elem) => elem.id == idparaborrar)), 1);
            fs.writeFileSync('carrito.txt', JSON.stringify(carrosarray, null, 2));
            console.log(`El carrito ${idparaborrar} ha sido correctamente eliminado`)

                } else console.log('No se encuentra un carro con el id solicitado')
    }
    catch (error) {
        console.log('Ha ocurrido un error en el proceso', error)
    }
}, 

getIdProducts: (req, res) => {
    
    const carros = JSON.parse(fs.readFileSync('carrito.txt', 'utf-8'));
    let carrosarray = carros;
    const idcarro = req.params.id;
    if ( carrosarray.find(e => e.id == idcarro) == undefined) 
    {   res.json({error: "Error", descripcion: "No existe carro con ese Id"})
        console.log('ERROR. No existe carro con ese id')
    }
        
        const carroSolicitado = carrosarray.indexOf(carrosarray.find(e => e.id == idcarro));
        const productoscarroparafront = carrosarray[carroSolicitado].productos
        const carrofront = carrosarray[carroSolicitado];
            res.send(productoscarroparafront,carrofront)
    },
 postByIds: (req, res) => {
    //busca producto
     
     const todosProductos = JSON.parse(fs.readFileSync('productos.txt', 'utf-8'));
     const productosarray = todosProductos;
     const idproducto = Number(req.params.id_product); 
     const indiceAgregar =  productosarray.findIndex((element) => element.id == idproducto);  
     const productoAgregar = productosarray[indiceAgregar]
         //buscar carro asociado
     const carrosexistentes = JSON.parse(fs.readFileSync('carrito.txt', 'utf-8'));
     const carrosarray = carrosexistentes;
     const idcarropost = Number(req.params.id);
     const carroModificar = carrosarray.findIndex(element => element.id == idcarropost);
     const carroactual = carrosarray[carroModificar]

    try {  
        if (carroModificar == -1 || indiceAgregar == -1) {
            res.json({error: "Error", descripcion: "No existe carro o producto con ese Id"})
            console.log("Error, imposible agregar. No existe el Id del Carro o Producto ingresados")
     } else {

     const productosencarro = carroactual.productos;
     productosencarro.push(productoAgregar);
     carroactual.productos = productosencarro;
     carrosarray.splice([idcarropost], 1, carroactual)
     
     fs.writeFileSync('carrito.txt', JSON.stringify(carrosarray, null, 2));
     console.log('producto agregado')
     
     res.redirect(200)
     }
     }
     catch (error) {
     console.log('Ha ocurrido un error en el proceso', error)
     }
 },

 deleteByIds: (req, res) => {
    try {
                //busca carro a modificar 
     const carrosexistentes = JSON.parse(fs.readFileSync('carrito.txt', 'utf-8'));
     const carrosarray = carrosexistentes;
     const idcarrodel = Number(req.params.id);
     const indexCarroModificar = carrosarray.findIndex(element => element.id == idcarrodel);
     const carroactual = carrosarray[indexCarroModificar] 
     const grupoproductos = carroactual.productos
     //busqueda producto
        console.log(grupoproductos)
     const idproductodel = Number(req.params.id_product); 
     const indiceBorrar =  grupoproductos.findIndex((element) => element.id == idproductodel);  
     grupoproductos.splice(indiceBorrar, 1)

     carroactual.productos = grupoproductos         
     carrosarray[indexCarroModificar]=carroactual
     
     fs.writeFileSync('carrito.txt', JSON.stringify(carrosarray, null, 2));
     console.log(carrosarray[indexCarroModificar])
     console.log('producto eliminado')
     //leer nuevo carro
     res.send(200)
     
     }
     catch (error) {
     console.log('Ha ocurrido un error en el proceso', error)
     }
 }, 
buyCarro: async (req, res) =>{ 
    try {
        const userId = req.user._id.valueOf()
        const userPhone = req.user.phone
        const userCart = await CartDB.findOne({ userId: userId }).lean()
        const cartProducts = userCart.products
    } catch (error) { 
        console.log('ha ocurrido un error en el proceso');      
    }
    //comunicacion admin
    toMail()
    async function toMail(){
        try {
          let info = await transporter.sendMail({
            from: `"Nuevo pedido de" <${USER_EMAIL}>`,
            to: `${ADMIN_EMAIL}`,
            subject: `"Nuevo pedido de" ${USER_EMAIL}`,
            html: `Lista de productos seleccionados por${newUser}
            ${userCart.products} `           });
        console.log('email enviado al administrador');
    
        const optionsTwilioBuy = {
            body: `"Nuevo pedido de" ${USER_EMAIL}`,
            from: "whatsapp:+14155238886",
            to: "whatsapp:+56999986367",
          };
          
          const message = client.messages.create(optionsTwilioBuy);
          console.log(message);

        } catch (error) {
          console.log(err, 'error envio de whattsapp');
        }
      }
}
}  