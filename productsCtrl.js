var app = require('./server');
var db = app.get('db');

module.exports = {
    create: function(req, res, next) {
        var name = req.body.name;
        var description = req.body.description;
        var price = req.body.price;
        var image = req.body.imageurl;

        db.create_product([name, description, price, image], function(err, product) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(product);
            }
        });
    },
    getOne: function(req, res, next) {
        var selectedProduct = req.params.productId;

        console.log(selectedProduct);
        db.read_product([selectedProduct], function(err, product) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(product)
            }
        });
    },
    getAll: function(req, res, next) {
        db.read_products(function(err, products) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(products)
            }
        });
    },
    update: function(req, res, next) {
        var id = req.params.productId;
        var query = req.query.description;

        db.update_product([query, id], function(err, product) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(product)
            }
        })
    },
    delete: function(req, res, next) {
        db.delete_product([req.params.productId], function(err, product) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.json(product)
            }
        })
    }
}