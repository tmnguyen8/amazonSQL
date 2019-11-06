-- Create a MySQL Database called `bamazon`.
-- 2. Then create a Table inside of that database called `products`.
-- 3. The products table should have each of the following columns:
--    * item_id (unique id for each product)
--    * product_name (Name of product)
--    * department_name
--    * price (cost to customer)
--    * stock_quantity (how much of the product is available in stores)
-- 4. Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).
DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30) NOT NULL, 
    department_name VARCHAR(30), 
    price DECIMAL(10,2),
    stock_quantity INT,
    PRIMARY KEY (item_id) 
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ("Macbook Pro 2019", 'Electronics', 3000, 10), 
        ("Samsung QLED 4K TV", "Electronics", 1999, 50),
        ("Apple Air Pods", "Electronics", 250, 120),
        ("DJI Mavic Pro","Toys and Games", 2119, 10),
        ("Nature's Own Honey Wheat Bread", "Grocery", 3.69, 1000),
        ("Chocolate", "Grocery", 5.99, 200),
        ("Milk", "Grocery", 2.99, 100),
        ("Nikon D3500 DSLR Camera", "Electronics", 446.95, 120),
        ("iPhone 11 Max Pro", "Electronics", 1099, 100),
        ("Strawberry", "Grocery", 3.25, 75);
