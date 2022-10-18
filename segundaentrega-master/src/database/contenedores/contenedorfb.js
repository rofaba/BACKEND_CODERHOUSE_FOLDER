
var admin = require("firebase-admin");

var serviceAccount = require("../config/testcoder-dd570-firebase-adminsdk-rjbd9-cfcc2eb0d6.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-rjbd9%40testcoder-dd570.iam.gserviceaccount.com",
});
console.log("Base de datos conectada");

class ContenedorFirebase {
  constructor(nombreColeccion) {
    this.coleccion = database.collection(nombreColeccion)

    CRUD();

    async function CRUD() {
      const db = admin.firestore();
      const query = db.collection("nombreColeccion");

      //muestra todos los elementos
      query
        .get()
        .then((elementos) => {
          elementos.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
          });
        })
        .catch((err) => {
          throw new Error(err)
        });

      //guardar un nuevo elemento   
      try {
        const nuevoElemento = {
          //propiedades 
        };
        let doc = query.doc();
        await doc.create(nuevoElemento);

        console.log("Elemento agregado");
      } catch (error) {
        console.log(error);
      }

      //actualiza elemento por Id
      query
        .where("Id", "==", "idrequerido")
        .get()
        .then((elementos) => {
          elemento.forEach((doc) => {
            doc.ref.update({ nuevaData: "" });
          });
        })
        .catch((err) => {
          console.log(err)
        });

      // elimina elemento por Id 
      query
        .where("Id", "==", "idrequerido")
        .get()
        .then((elementos) => {
          elemento.forEach((doc) => {
            doc.ref.delete();
          });
        });
    }
  }
}

exports.module = { ContenedorFirebase }   