const ContenedorFirebase = require('../../database/contenedores/contenedorfb');

class CarritoFirebase extends ContenedorFirebase {
    constructor() {
        super('carrito')
    }
}

exports.module = { CarritoFirebase }