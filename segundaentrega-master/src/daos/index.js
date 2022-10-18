const  CarritoFirebase  = require("./carritos/carritosfb")
const  CarritoMongo  = require("./carritos/carritosmongo")
const  ProductoFirebase  = require("./productos/productosfb")
const  ProductoMongo   = require("./productos/productosmongo")

const DATABASES = {
    mongo: {
        carritoApi: new CarritoMongo(),
        productosApi: new ProductoMongo()
    },
    firebase: {
        carritoApi: new CarritoFirebase(),
        productosApi: new ProductoFirebase()
    }
}

const DB = process.env.SELECTED_DB || 'mongo'
const FB = process.env.SELECTED_FB || 'firebase'

const {carritoApi, productosApi} = DATABASES[DB]
const {carritoApiF, productosApiF}= DATABASES[FB]

export {carritoApi, productosApi}
export {carritoApiF, productosApiF}
