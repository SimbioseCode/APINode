const mongoose = require("mongoose")

const uri = "mongodb+srv://dbati:dbati@mongodbati-tj0n4.mongodb.net/APINode?retryWrites=true&w=majority";

mongoose.connect(uri, {useNewUrlParser: true})

mongoose.Promise = global.Promise



//const MongoClient = require('mongodb').MongoClient;
//const uri = "mongodb+srv://<username>:<password>@mongodbati-tj0n4.mongodb.net/test?retryWrites=true&w=majority";
//const client = new MongoClient(uri, { useNewUrlParser: true });
//module.exports = client

module.exports = mongoose



