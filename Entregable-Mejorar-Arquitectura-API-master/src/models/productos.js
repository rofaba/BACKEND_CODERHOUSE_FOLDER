import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    precio: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    codigo: {
      type: String,
      required: true,
    },
    foto: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Producto", ProductSchema);
