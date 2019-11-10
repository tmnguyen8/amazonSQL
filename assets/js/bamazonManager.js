// * Create a new Node application called `bamazonManager.js`. Running this application will:

//   * List a set of menu options:
//     * View Products for Sale
//     * View Low Inventory
//     * Add to Inventory
//     * Add New Product
//   * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.

//   * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.

//   * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.

//   * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.
var mysql = require("mysql");
var inquirer = require("inquirer");
var keys = require ("./keys.js");
var connection = mysql.createConnection(keys.databaseKeys);
var managerOptions = [
    'View Products for Sale',
    'View Low Inventory',
    'Add to Inventory',
    'Add New Product'
]

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
        }
        
    });
};

// View Products for Sale
function queryTable() {
    var query = connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price);
            saleList.push(`${res[i].item_id}`);
        }
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
            availableItems.push(i.item_id)
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
            updateProduct(answer.selectedItem, answer.selectedQuantity)

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
    console.log(query.sql);
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