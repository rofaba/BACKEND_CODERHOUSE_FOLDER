const ContenedorFirebase = require('../../database/contenedores/contenedorfb');

class ProductosFirebase extends ContenedorFirebase {
    constructor() {
        super('carrito')
    }
}

exports.module = { ProductosFirebase }