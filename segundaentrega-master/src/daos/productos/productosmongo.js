const ContenedorMongo = require('../../database/contenedores/contenedormongo');

class ProductosMongo extends ContenedorMongo {
    constructor() {
        super('carrito')
    }
}

exports.module = { ProductosMongo }