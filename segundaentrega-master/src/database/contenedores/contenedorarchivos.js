const fs = require('fs');

class Contenedor {
    constructor(nombre) {
        this.contenedor = nombre
    }

    //método "save": recibe un objeto, lo guarda en archivo y devuelve su id.
    async save(productoNuevo) {
        try {
            const datosExistentes = JSON.parse(await fs.promises.readFile(`./${this.contenedor}`, 'utf-8'));
            let arrayProductos = datosExistentes;
            if (arrayProductos.length == 0) {
                productoNuevo.id = 1
            } else {
                const identificadores = [];
                arrayProductos.forEach(element => identificadores.push(element.id));
                productoNuevo.id = (Math.max(...identificadores) + 1);
            }
            arrayProductos.push(productoNuevo);
            let arrayString = JSON.stringify(arrayProductos, null, 2)
            await fs.promises.writeFile(`./${this.contenedor}`, arrayString);
            console.log('Se ha guardado correctamente el producto')
            console.log(productoNuevo)
            console.log(`Se le asignó el Id: ${productoNuevo.id}`)
        }

        catch (error) {
            console.log('Ha ocurrido un error en el proceso', error)
        }
    }

    // método "getById()" recibe un id y retorna el objeto con ese id || null si no está.            
    async getById(num) {
        try {
            const datosExistentes = JSON.parse(await fs.promises.readFile(`./${this.contenedor}`, 'utf-8'));
            let arrayProductos = datosExistentes;
            const elementoBuscado = arrayProductos.find((element) => element.id == num);
            if (elementoBuscado == undefined) {
                console.log(`No se encuentra ningún elemento con el id: ${num}`)
                return (null)
            } else console.log('El producto solicitado es:')
            console.log(elementoBuscado);
            return elementoBuscado
        }
        catch (error) {
            console.log('Ha ocurrido un error en el proceso', error)

        }
    }
    // método "gelAll()" Devuelve un array con los objetos presentes en el archivo
    getAll() {
        try {
            const datosExistentes = JSON.parse(fs.readFileSync(`./${this.contenedor}`, 'utf-8'));

            if (datosExistentes.length == 0) {
                console.log('El archivo no contiene productos')
            } else {
                return datosExistentes
            };
        }

        catch (error) {
            console.log('Ha ocurrido un error en el proceso', error)

        }
    }

    // método "deleteById" recibe un id y elimina el objeto con el id buscado.
    async deleteById(numero) {
        try {
            const datosExistentes = JSON.parse(await fs.promises.readFile(`./${this.contenedor}`, 'utf-8'));
            let arrayProductos = datosExistentes;
            let elementoParaBorrar = arrayProductos.findIndex((element) => element.id == numero);
            if (elementoParaBorrar != -1) {
                arrayProductos.splice((arrayProductos.findIndex((producto) => producto.id == numero)), 1);
                await fs.promises.writeFile(`./${this.contenedor}`, JSON.stringify(arrayProductos, null, 2));
                console.log('El producto ha sido correctamente eliminado')
            } else console.log('No se encuentra el producto con el id solicitado')
        }
        catch (error) {
            console.log('Ha ocurrido un error en el proceso', error)
        }
    }

    // método "deleteAll()"  Elimina todos los abjetosd presente en al archivo
    async deleteAll() {
        {
            try {
                await fs.promises.writeFile(`./${this.contenedor}`, "[ ]");
                console.log('Se han eliminado todos los productos')

            }

            catch (error) {
                console.log('Ha ocurrido un error en el proceso', error)
            }
        }

    }
}
module.exports = { Contenedor }