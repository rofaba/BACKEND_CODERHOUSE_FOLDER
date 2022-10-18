const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://coder:coder123@cluster0.6esiy.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

exports.module = { client: client }
