import "./db.config.js";
const { CarritoModel } = require('../../../models/carrito')
const FactoryClass = require('../plantilla.DAO.js');

class carrDAO extends FactoryClass {
  constructor() {
    super();
  }

  async getAll() {
    try {
      const items = await CarritoModel.find({});
      return items;
    } catch (error) {
      return ` ${error} `;
    }
  }

  async getById(id) {
    try {
      const item = await CarritoModel.findById(id);
      return item;
    } catch (error) {
      return ` ${error} `;
    }
  }

  async add(prodNuevo) {
    try {
      return await CarritoModel.create(prodNuevo);
    } catch (error) {
      return ` ${error} `;
    }
  }

  async deleteById(id) {
    try {
      return await CarritoModel.findByIdAndDelete(id);
    } catch (error) {
      return `${error} `;
    }
  }
}

module.exports = carrDAO;