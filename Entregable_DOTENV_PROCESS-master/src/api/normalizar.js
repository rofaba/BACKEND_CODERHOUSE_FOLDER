
const fs= require('fs');
const { schema } = require('normalizr')
const { normalize } = require('normalizr');
const { denormalize } = require('normalizr');
const { inspect } = require('util');

let msgescritos = JSON.parse(fs.readFileSync('./src/DB/mensajes.txt', 'utf-8'));

let datamsg = {
    id: "mensajes",
    porcentaje: "",
    mensajes: msgescritos
}
// console.log(data)

//USO DE NORMALIZR - Definición de esquemas 
const authorSchema = new schema.Entity('author', { author: "author" }, { idAttribute: '_id' });
const textSchema = new schema.Entity('text');
const mySchema = new schema.Entity("message-center", {
    authors: authorSchema,
    mensajes: [textSchema],
});

const normalizedData = normalize(datamsg, mySchema);

const denormalizedData = denormalize(
    normalizedData.result,
    mySchema,
    normalizedData.entities)

// console.log(msgescritos)
// console.log("Datos denormalizados :")
// console.log("Denormalizado" + inspect(denormalizedData, true, 12, true))

// console.log("Datos normalizados :")
// console.log(normalizedData)
// console.log(inspect(normalizedData, true, 12, true))

//porcentaje size bytes
const porcentaje = (Buffer.byteLength(JSON.stringify(denormalizedData)) * 100) / Buffer.byteLength(JSON.stringify(normalizedData))
console.log("porcentaje compresion: "  + porcentaje);

module.exports = { normalizedData, denormalizedData, porcentaje, datamsg, msgescritos }