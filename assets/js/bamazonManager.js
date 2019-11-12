var mysql = require("mysql");
var inquirer = require("inquirer");
var keys = require ("./keys.js");
const cTable = require('console.table');
var connection = mysql.createConnection(keys.databaseKeys);
var managerOptions = [
    'View Products for Sale',
    'View Low Inventory',
    'Add to Inventory',
    'Add New Product',
    'exit'
]
var saleList = [];
// main function of manager to pick the options to update products
function managerInquire() {
    inquirer
        .prompt([
            {
                name: "managerItems",
                type: "list",
                message: "What item would you like to purchase?",
                choices: managerOptions
            }
        ]).then(function(answer) {
        console.log("You have selected item number: ", answer.managerItems);

        switch (answer.managerItems) {
            case ('View Products for Sale'):
                queryTable();
                break;
            case ('View Low Inventory'):
                queryLowInventory();
                break;
            case ('Add to Inventory'):
                addInventory();
                break;
            case ('Add New Product'):
                addNewProduct();
                console.log("add new product");
                break;
            case "exit":
                connection.end();
                break;
        }
        connection.end();
    });
};

// View Products for Sale
function queryTable() {
    var query = connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        
        for (var i = 0; i < res.length; i++) {
            // console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price);
            saleList.push(`${res[i].item_id}`);
        }
            console.log("-----------------------------------");
            console.table(res);
            console.log("-----------------------------------");
      })
    // logs the actual query being run
    // console.log(query.sql);
};

// View Low Inventory
function queryLowInventory() {
    var query = connection.query("SELECT * FROM products WHERE stock_quantity<= 5", function(err, res) {
        if (err) throw err;
        
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        }
            console.log("-----------------------------------");
      })
};

// Add to Inventory
function addInventory() {
    // get item id list prior to identifying 
    var availableItems = [];
    var query = connection.query("SELECT * FROM products", function(err,res) {
        if(err) throw err;
        for (i of res) {
            availableItems.push(`${i.item_id} ${i.product_name}`)
        };
    
        inquirer
        .prompt([
            {
                name: "selectedItem",
                type: "list",
                message: "What item would you like to add to inventory?",
                choices: availableItems
            },
            {
                name: "selectedQuantity",
                type: "input",
                message: "How many would you like to inventory?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                    return true;
                    }
                    return false;
                }
            }
        ]).then(function(answer) {
            var itemArr = answer.selectedItem.split(" ")
            updateProduct(itemArr[0], answer.selectedQuantity)

        });
    })
};

// Updated Quantity
function updateProduct(id, stock) {
    var query = connection.query(
        `UPDATE products SET stock_quantity=stock_quantity+${stock} WHERE item_id=${id};`,
        function(err, res) {
            if (err) throw err;
                console.log(res.affectedRows + " products updated!\n");
      }
    );
    // logs the actual query being run
    // console.log(query.sql);
}

// Add New Product
function addNewProduct() {
    inquirer
        .prompt([
            {
                name: "name",
                type: "input",
                message: "What is the product name?",
            },
            {
                name: "department",
                type: "input",
                message: "What is the product department?",
            },
            {
                name: "price",
                type: "input",
                message: "What is the cost of the item?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                    return true;
                    }
                    return false;
                }
            },
            {
                name: "quantity",
                type: "input",
                message: "How many would you like to add to inventory?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                    return true;
                    }
                    return false;
                }
            }
        ]).then(function(ans) {
            addNewItem(ans.name, ans.department, ans.price, ans.quantity)
        });
}

// function to add new item to database table
function addNewItem(name, department, price, stock) {
    connection.query(
        "INSERT INTO products SET ?",
        {
          product_name: name,
          department_name: department,
          price: price,
          stock_quantity: stock
        },
        function(err) {
          if (err) throw err;
          console.log("Your product was added successfully!");
        }
    );
}

// EXECUTION OF FUNCTIONS
managerInquire();