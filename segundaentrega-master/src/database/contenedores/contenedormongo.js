import { MongoClient, ObjectId } from 'mongodb'
const mongo = require('../config/index')
const client = new MongoClient(mongo.uri)
await client.connect()
const database = client.db('ecommerce')
console.log("Base de datos conectada");

class ContenedorMongo {
    constructor(nombreColeccion) {
        this.coleccion = database.collection(nombreColeccion)
    }
    //muestra todos los elementos
    async mostrarTodos() {
        try {
            const resultado = await this.coleccion.find().toArray()
            return resultado
        } catch (error) {
            throw new Error(error)
        }
    }
    //guarda un nuevo elemento
    async guardarNuevo(nuevo) {
        try {
            const respuesta = await this.coleccion.insertOne(nuevo)
            return respuesta
        } catch (error) { throw new Error(error) }
    }
    //muestra elemento pot Id
    async mostrarPorId(id) {
        try {
            const resultado = await this.coleccion.findOne({ _id: ObjectId(id) })
            return resultado
        } catch (error) { throw new Error(error) }
    }
    //actualiza elemento por Id
    async actualizar(id, cambios) {
        try {
            const elementoActualizado = this.coleccion.findOneAndUpdate({ _id: ObjectId(id) }, { $set: cambios })
            return elementoActualizado
        } catch (error) { throw new Error(error) }
    }
    //elimina elemento por id     
    async eliminarPorId(id) {
        try {

            const elementoeliminado = await this.coleccion.deleteOne({ _id: ObjectId(id) })
            return elementoeliminado
        } catch (error) { throw new Error(error) }
    }
}

exports.module = { ContenedorMongo };