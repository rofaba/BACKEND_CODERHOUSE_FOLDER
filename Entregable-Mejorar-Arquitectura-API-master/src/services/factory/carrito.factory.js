const carrDAO = require ('../DAO/mongoDB/mongoCarrito');
const CarrMem = require ('../DAO/fileSystem/fileCarrito');

const opcion = process.argv[2] || "mongo";

let dao;
switch (opcion) {
  case "mongo":
    dao = new carrDAO();
    break;
  case "mem":
    dao = new CarrMem();
    break;
}

export default class DaoFactory {
  static initDao() {
    return dao;
  }
}