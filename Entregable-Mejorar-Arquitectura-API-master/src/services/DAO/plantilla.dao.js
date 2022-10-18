import Errors from "../../utils/Errors.utils.js";

class FactoryClass {
  async getAll() {
    throw new Errors(500, "falta implementar getAll!");
  }

  async getById(id) {
    throw new Errors(500, `falta implementar getById!, ${id} No encontrado`);
  }

  async add(prodNuevo) {
    throw new Errors(500, `falta implementar add!, ${prodNuevo} No existe!`);
  }

  async deleteById(id) {
    throw new Errors(500, `falta implementar deleteById!, ${id} No encontrado`);
  }

  async updateById(id, nuevoProd) {
    throw new Errors(
      500,
      `falta implementar updateById!, ${id} no encontrado o ${nuevoProd} no existe`
    );
  }
}

export default FactoryClass;
