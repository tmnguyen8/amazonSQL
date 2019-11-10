var mysql = require("mysql");
var inquirer = require("inquirer");
var keys = require ("./keys.js");

var saleList = [];
var selectedItem =0;
var selectedQuantity =0;
var selectedItemStockQuantity = 0;

var connection = mysql.createConnection(keys.databaseKeys);
  
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    

});
queryTable();

// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.
function inquireItem() {
    inquirer
        .prompt([
            {
                name: "selectedItem",
                type: "list",
                message: "What item would you like to purchase?",
                choices: saleList
            },
            {
                name: "selectedQuantity",
                type: "input",
                message: "How many would you like to purchase?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                    return true;
                    }
                    return false;
                }
            }
        ]).then(function(answer) {
        console.log("You have selected item number: ", answer.selectedItem);
        selectedItem = parseInt(answer.selectedItem)
        console.log("Amount purchase: ", answer.selectedQuantity);
        selectedQuantity = answer.selectedQuantity
        // Check if quantity is available to sell
        if (selectedItemStockQuantity <= selectedQuantity) {
            console.log("Sufficient quantity");
            updateProduct();
        } else {
            console.log("Insufficient quantity!");
        };
    });
};



// This function display the items available for purchase
function queryTable() {
    saleList = [];
    var query = connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price);
            saleList.push(`${res[i].item_id}`);
        }
            console.log("-----------------------------------");
            // console.log("this is sale list", saleList)
            // console.log(res);
            inquireItem();
          
      });
      // logs the actual query being run
      console.log(query.sql);
};

// function to update the product table 
function updateProduct() {
    console.log("Updating all product quantities...\n");
    var query = connection.query(
    //   "UPDATE products SET ? WHERE ?;",
    //     [`stock_quantity=stock_quantity-${selectedQuantity}`,`item_id=${selectedItem}`],
        `UPDATE products SET stock_quantity=stock_quantity-${selectedQuantity} WHERE item_id=${selectedItem};`,
        function(err, res) {
            if (err) throw err;
                console.log(res.affectedRows + " products updated!\n");

      }
    );
  
    // logs the actual query being run
    console.log(query.sql);
  }


