const mongoose = require('mongoose');

const CarritoSchema = new mongoose.Schema(
  {
    nombre: String,
    precio: Number,
    descripcion: String,
    codigo: String,
    foto: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Carrito", CarritoSchema);
