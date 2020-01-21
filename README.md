eCommerce API in Node.js 

## Installation

`npm install --save express`
`npm install --save mysql`
`npm install --save body-parser`
`npm install --save cors`
`npm install`

## Database Setup

`````
Create Database name: ecom
`````

`````
once the database created execute all this scripts:

1. Seller DDL Script
2. Seller DML Script
3. Product DDL Script
4. Product DML Script
5. Cart DDL Script

`````

## Configuration (database)

`````
host: 'localhost',
user: 'root',
password : '',
port : 3306, //port mysql
database:'ecom'	

`````

## To run the application

`npm start`


## Below is the base url for rest api
`http://127.0.0.1:3000/`

To enables to test all the endpoints you may use tools like 'Postman' or 'ARC'.

RESTful Endpoints:

``````
Route			                            HTTP Verb	Description
/seller/list	                            GET			Get	All sellers
/seller/delete	                            DELETE		Delete a seleer
/seller/update                              PUT         Update a seller
/seller/add                                 POST        Add a seller information
/productperseller/list                      GET         Get All products
/productperseller/delete                    DELETE      Delete a product
/productpersellername/{name}                GET         Search by product name
/productpersellerdescription/{description}  GET         Search by product description
/productperseller/update                    PUT         Update a product
/productperseller/add                       POST        Add a product information
/cart/add                                   POST        Add product to Cart
report/product                              GET         Product Report
report/topseller                            GET         Top Seller Report