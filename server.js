var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');

var connectionString = "postgres://localhost/sandbox";
var massiveInstance = massive.connectSync({connectionString : connectionString})

var app = module.exports = express();
app.use(bodyParser.json());
app.use(cors());

var db = app.get('db');

app.set('db', massiveInstance);

var controller = require('./productsCtrl');

app.get('/api/product/:productId', controller.getOne);
app.get('/api/products', controller.getAll);
app.put('/api/product/:productId', controller.update);
app.post('/api/product', controller.create);
app.delete('/api/product/:productId', controller.delete);


app.listen('3030', function(){
  console.log("Successfully listening on port 3030")	
})
