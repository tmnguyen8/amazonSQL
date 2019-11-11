USE bamazon;

CREATE TABLE summary (
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL, 
    over_head_costs DECIMAL(10,2),
    product_sales INT,
    PRIMARY KEY (department_id) 
);

