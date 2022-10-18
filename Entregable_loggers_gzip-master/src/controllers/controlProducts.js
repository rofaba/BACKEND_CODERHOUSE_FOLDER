//basado en archivos

const fs = require('fs');
const { Contenedor } = require('../src/contenedor')
var archivo = new Contenedor('productos.txt');
var carrito = new Contenedor('carrito.txt')
module.exports = {

    getPbyId: (req, res) => {
        const data = archivo.getAll();
        let arrayproductos = data;
        console.log(arrayproductos)

        try {    // const datosExistentes = JSON.parse(await fs.promises.readFile(`./${this.contenedor}`, 'utf-8'));
            // let arrayProductos = datosExistentes;
            let num = req.params.id;
            console.log(num)
            const elementoBuscado = arrayproductos.find((element) => element.id == num);
            if (elementoBuscado == undefined) {
                console.log(`No se encuentra ningún elemento con el id: ${num}`)
                res.json({ error: "Error", descripcion: "No existe producto con ese Id" })
            } else;
            let objdatos = []
            objdatos.push(elementoBuscado)
            console.log(objdatos)

            const carros = JSON.parse(fs.readFileSync('carrito.txt', 'utf-8'));
            const muestracarro = carros;
            const numerocarros = muestracarro.length
            res.render('productos', {
                datos: objdatos,

            });
        } catch (error) {
            console.log('Ha ocurrido un error en el proceso', error)

        }
    },

    getAllProducts: (req, res) => {
        const data = archivo.getAll();
        const carros = JSON.parse(fs.readFileSync('carrito.txt', 'utf-8'));
        const carrosarray = carros;
        const numerocarros = carros.length
        res.render('productos', {
            datos: data,

        });
    },

    postProduct: (req, res) => {
        const productosactuales = JSON.parse(fs.readFileSync('productos.txt', 'utf-8'));
        const productosarray = productosactuales;

        try {
            const nuevoProducto = req.body;
            nuevoProducto.timestamp = Date.now()
            if (productosarray.length == 0) {
                nuevoProducto.id = 1
            } else {
                const identificadores = [];
                productosarray.forEach(element => identificadores.push(element.id));
                nuevoProducto.id = (Math.max(...identificadores) + 1);
            }

            productosarray.push(nuevoProducto)
            const nuevoarchivo = JSON.stringify(productosarray, null, 2)
            fs.writeFileSync('productos.txt', nuevoarchivo);
            console.log('producto guardado');
            res.redirect('/')

        }
        catch (error) {
            console.log('Ha ocurrido un error en el proceso', error)
        }
    },

    putOneProduct: (req, res) => {

        // borrar anterior
        const existentes = JSON.parse(fs.readFileSync('productos.txt', 'utf-8'));
        const productosarray = existentes;
        const idparaborrar = Number(req.params.id);
        try {
            let elementoParaBorrar = productosarray.findIndex((element) => element.id == idparaborrar);

            if (elementoParaBorrar != -1) {
                productosarray.splice((productosarray.findIndex((producto) => producto.id == idparaborrar)), 1);
                fs.writeFileSync('productos.txt', JSON.stringify(productosarray, null, 2));
            } else console.log('No se encuentra el producto con el id solicitado')
        }
        catch (error) {
            console.log('Ha ocurrido un error en el proceso', error)
        }
        // grabar producto editado

        try {
            const nuevoProducto = req.body;
            nuevoProducto.timestamp = Date.now()
            nuevoProducto.id = req.params.id;

            productosarray.push(nuevoProducto)

            const nuevoarchivo = JSON.stringify(productosarray, null, 2)
            fs.writeFileSync('productos.txt', nuevoarchivo);
            console.log('producto guardado');
            res.redirect('/')

        }
        catch (error) {
            console.log('Ha ocurrido un error en el proceso', error)
        }
    },

    delProdById: (req, res) => {

        const existentes = JSON.parse(fs.readFileSync('productos.txt', 'utf-8'));
        const productosarray = existentes;
        const idparaborrar = Number(req.params.id);
        try {
            let elementoParaBorrar = productosarray.findIndex((element) => element.id == idparaborrar);

            if (elementoParaBorrar != -1) {
                productosarray.splice((productosarray.findIndex((producto) => producto.id == idparaborrar)), 1);
                fs.writeFileSync('productos.txt', JSON.stringify(productosarray, null, 2));
                console.log(`El producto ${idparaborrar} ha sido correctamente eliminado`)

            } else console.log('No se encuentra el producto con el id solicitado')
        }
        catch (error) {
            console.log('Ha ocurrido un error en el proceso', error)
        }
    }
