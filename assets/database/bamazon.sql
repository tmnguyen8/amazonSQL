DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30) NOT NULL, 
    department_name VARCHAR(30), 
    price DECIMAL(10,2),
    stock_quantity INT,
    product_sales INT,
    PRIMARY KEY (item_id) 
);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES  ("Macbook Pro 2019", 'Electronics', 3000, 10, 0), 
        ("Samsung QLED 4K TV", "Electronics", 1999, 50, 0),
        ("Apple Air Pods", "Electronics", 250, 120, 0),
        ("DJI Mavic Pro","Toys and Games", 2119, 10, 0),
        ("Nature's Own Honey Wheat Bread", "Grocery", 3.69, 1000, 0),
        ("Chocolate", "Grocery", 5.99, 200, 0),
        ("Milk", "Grocery", 2.99, 100, 0),
        ("Nikon D3500 DSLR Camera", "Electronics", 446.95, 120, 0),
        ("iPhone 11 Max Pro", "Electronics", 1099, 100, 0),
        ("Strawberry", "Grocery", 3.25, 75, 0);