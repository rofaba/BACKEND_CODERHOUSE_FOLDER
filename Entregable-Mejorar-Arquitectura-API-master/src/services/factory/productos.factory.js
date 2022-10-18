const productosMongo = require ('../DAO/mongoDB/mongoProductos');
const ProdMem = require('../DAO/fileSystem/fileProductos')

const opcion = process.argv[2] || "mongo";

let dao;
switch (opcion) {
  case "mongo":
    dao = new ProdMongo();
    break;
  case "mem":
    dao = new ProdMem();
    break;
}

module.exports = class DaoFactory {
  static initDao() {
    return dao;
  }
}