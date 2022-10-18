const ContenedorMongo = require('../../database/contenedores/contenedormongo');

class CarritoMongo extends ContenedorMongo {
    constructor() {
        super('carrito')
    }
}

exports.module = { CarritoMongo }