module.exports = class CarritoDTO {
    constructor({ id, nombre, precio, descripcion, codigo, foto }) {
      this.id = id;
      this.nombre = nombre;
      this.precio = precio;
      this.descripcion = descripcion;
      this.codigo = codigo;
      this.foto = foto;
    }
  }
  
  export function CarrAsDto(carr) {
    if (Array.isArray(carr)) return carr.map((c) => new CarritoDTO(c));
    else return new CarritoDTO(carr);
  }
  