USE bamazon;

DROP TABLE IF EXISTS bamazon.departments;

CREATE TABLE departments (
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL, 
    over_head_costs DECIMAL(10,2),
    product_sales INT,
    PRIMARY KEY (department_id) 
);

INSERT INTO departments (department_name, over_head_costs, product_sales)
VALUES  ('Electronics', 50.00, 0), 
        ("Toys and Games", 40.00, 0),
        ("Grocery", 10.00, 0);