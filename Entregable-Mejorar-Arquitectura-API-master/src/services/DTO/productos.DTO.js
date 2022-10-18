module.export = { 

    constructor({
      id,
      nombre,
      precio,
      stock,
      descripcion,
      codigo,
      foto,
      createdAt,
      updatedAt,
    }) {
      this.id = id;
      this.nombre = nombre;
      this.precio = precio;
      this.stock = stock;
      this.descripcion = descripcion;
      this.codigo = codigo;
      this.foto = foto;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  export function asDto(prod) {
    if (Array.isArray(prod)) return prod.map((p) => new ProductoDTO(p));
    else return new ProductoDTO(prod);
  }
  