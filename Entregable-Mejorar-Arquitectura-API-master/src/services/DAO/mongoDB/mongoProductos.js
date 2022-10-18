require('./db.config.js');
const { ProductoModel } = require ('../../../models/Productos.model.js');
const FactoryClass = require ('../template.DAO.js');

class proDAO extends FactoryClass {
  constructor() {
    super();
  }
  async getAll() {
    try {
      const productos = await ProductoModel.find({});
      return productos;
    } catch (error) {
      return `☠ ${error} `;
    }
  }

  async getById(id) {
    try {
      const producto = await ProductoModel.findById(id);
      return producto;
    } catch (error) {
      return `☠ ${error} `;
    }
  }

  async add(prodNuevo) {
    try {
      return await ProductoModel.create(prodNuevo);
    } catch (error) {
      return `☠ ${error} `;
    }
  }

  async deleteById(id) {
    try {
      return await ProductoModel.findByIdAndDelete(id);
    } catch (error) {
      return `☠ ${error} `;
    }
  }

  async updateById(id, nuevoProd) {
    try {
      const prodUpdated = await ProductoModel.findByIdAndUpdate(id, {
        nombre: nuevoProd.nombre,
        precio: nuevoProd.precio,
        stock: nuevoProd.stock,
        descripcion: nuevoProd.descripcion,
        codigo: nuevoProd.codigo,
        foto: nuevoProd.foto,
      });
      return prodUpdated;
    } catch (error) {
      return `☠ ${error} `;
    }
  }
}

export default proDAO;