var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
  
  
// default route
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});
// connection configurations
var dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ecom'
});
  
// connect to database
dbConn.connect(); 
 
 
// Retrieve all Seller 
app.get('/seller/list', function (req, res) {
    dbConn.query('SELECT * FROM seller', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'seller list.' });
    });
});
 
 
// Add a new Seller  
app.post('/seller/add', function (req, res) {
  
    let name = req.body.name;
    let email = req.body.email;
    let created_at = req.body.created_at;

    if (!name || !email || !created_at) {
        return res.status(400).send({ error: user, message: 'Please provide seller' });
    }
  
    dbConn.query("INSERT INTO seller (name, email,created_at) values ('"+ name +"', '"+email+"', '"+created_at+"')", { name, email, created_at }, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New seller has been created successfully.' });
    });
});
 
 
//  Update Seller with id
app.put('/seller/update', function (req, res) {
  
    let seller_id = req.body.seller_id;
    let name = req.body.name;
    let email = req.body.email;
    let created_at = req.body.created_at;

    if (!name || !email || !created_at || !seller_id) {
        return res.status(400).send({ error: user, message: 'Please provide seller and seller_id' });
    }
  
    dbConn.query("UPDATE seller SET name = ?, email = ?,  created_at = ? WHERE id = ?", [name, email, created_at, seller_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'seller has been updated successfully.' });
    });
});
 
 
//  Delete Seller
app.delete('/seller/delete', function (req, res) {
  
    let seller_id = req.body.seller_id;
  
    if (!seller_id) {
        return res.status(400).send({ error: true, message: 'Please provide seller_id' });
    }
    
    dbConn.query('DELETE FROM seller WHERE id = ?', [seller_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'seller has been deleted successfully.' });
    });
}); 


// Retrieve all Product per Seller 
app.get('/productperseller/list', function (req, res) {
    dbConn.query('SELECT * FROM product', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Product list.' });
    });
});

// Retrieve Product per Seller with name 
app.get('/productpersellername/:name', function (req, res) {
  
    let product_name = req.params.name;
  
    if (!product_name) {
        return res.status(400).send({ error: true, message: 'Please provide product_name' });
    }
  
    dbConn.query('SELECT * FROM product where name=?', product_name, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'Product per Seller list.' });
    });
  
});

// Retrieve Product per Seller with description 
app.get('/productpersellerdescription/:description', function (req, res) {
  
    let product_description = req.params.description;
    
    if (!product_description) {
        return res.status(400).send({ error: true, message: 'Please provide product_description' });
    }
  
    dbConn.query('SELECT * FROM product where description = ?', product_description, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'Product per Seller list.' });
    });
  
});
 
 
// Add a new Product per Seller  
app.post('/productperseller/add', function (req, res) {

    let seller_id = req.body.seller_id;
    let name = req.body.name;
    let description = req.body.description;
    let created_at = req.body.created_at;

    if (!seller_id || !name || !description || !created_at) {
        return res.status(400).send({ error: user, message: 'Please provide product' });
    }
  
    dbConn.query("INSERT INTO product (seller_id, name, description, created_at) values ('"+ seller_id +"','"+ name +"', '"+description+"', '"+created_at+"')", { seller_id, name, description, created_at }, function (error, results, fields) {
    //dbConn.query("INSERT INTO product SET ? ", { product: product }, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New user has been created successfully.' });
    });
});
 
 
//  Update Product per Seller with id
app.put('/productperseller/update', function (req, res) {
  
    let product_id = req.body.product_id
    let seller_id = req.body.seller_id;
    let name = req.body.name;
    let description = req.body.description;
    let created_at = req.body.created_at;

    if (!seller_id || !name || !description || !created_at || !product_id) {
        return res.status(400).send({ error: user, message: 'Please provide product and seller_id' });
    }
  
    dbConn.query("UPDATE product SET seller_id = ?, name = ?, description = ?,  created_at = ? WHERE id = ?", [seller_id, name, description, created_at, product_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'product has been updated successfully.' });
    });
});
 
 
//  Delete Product per Seller
app.delete('/productperseller/delete', function (req, res) {
  
    let product_id = req.body.product_id;
  
    if (!product_id) {
        return res.status(400).send({ error: true, message: 'Please provide product_id' });
    }
    dbConn.query('DELETE FROM product WHERE id = ?', [product_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'product has been deleted successfully.' });
    });
}); 
 
// Add to Cart  
app.post('/cart/add', function (req, res) {

    let seller_id = req.body.seller_id;
    let product_id = req.body.product_id;
    let name = req.body.name;
    let description = req.body.description;
    let added_at = req.body.added_at;

    if (!seller_id || !product_id || !name || !description || !added_at) {
        return res.status(400).send({ error: user, message: 'Please provide product information' });
    }
  
    dbConn.query("INSERT INTO cart (seller_id, product_id, name, description, added_at) values ('"+ seller_id +"', '"+ product_id +"', '"+ name +"', '"+description+"', '"+added_at+"')", { seller_id, product_id, name, description, added_at }, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New user has been created successfully.' });
    });
});


// Cart - Product Report Generator  
app.get('/report/product', function (req, res) {
    dbConn.query('SELECT p.id Product_ID, p.NAME as Product_Name, p.description as Description, COUNT(p.id) as Total ' +
                'FROM cart c left outer join product p ' +
                    'on c.product_id = p.id left outer join seller s ' +
                        'on c.seller_id = s.id ' +
                'GROUP BY p.id ASC', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'seller list.' });
    });
});

// Top Seller Report Generator  
app.get('/report/topseller', function (req, res) {
    dbConn.query('SELECT topsales . * FROM (SELECT s.id Seller_ID, s.name as Name, COUNT(p.id) as No_of_Sales, @rownum := @rownum +1 Rank ' +
                    'FROM cart c left outer join product p ' +
                        'on c.product_id = p.id left outer join seller s ' +
                            'on c.seller_id = s.id, (SELECT @rownum :=0)r  ' +
                    'GROUP BY p.id ASC) AS topsales ' +
                'ORDER BY Rank ASC', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'seller list.' });
    });
});

// set port
app.listen(3000, function () {
    console.log('eCommerce API is running on port 3000');
});
 
module.exports = app;