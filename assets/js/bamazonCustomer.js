var mysql = require("mysql");
var inquirer = require("inquirer");
var keys = require ("./keys.js");
const cTable = require('console.table');

var saleList = [];
var saleDepartment = [];
var selectedItem =0;
var selectedItemPrice;
var selectedQuantity =0;
var selectedItemStockQuantity = 0;

var connection = mysql.createConnection(keys.databaseKeys);
  
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    

});


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
            var answerArr = answer.selectedItem.split(" ");
            selectedQuantity = answer.selectedQuantity;

            console.log("You have selected item number: ", answerArr[0]);
            selectedItem = parseInt(answerArr[0]);
            selectedItemPrice = parseInt(answerArr[answerArr.length-1]);
            selectedDepartment = findDepartment(selectedItem);
            console.log(`THIS IS THE SELECTED DEPARTMENT = ${selectedDepartment}`)

            console.log("Purchased Quantity: ", selectedQuantity);
            
            // Check if quantity is available to sell
            if (selectedItemStockQuantity <= selectedQuantity) {
                // console.log("Sufficient quantity");
                console.log(`Your total price is: ${selectedItemPrice*selectedQuantity}`)
                updateProduct();
            } else {
                console.log("Insufficient quantity!");
            };
    
        });
};

// function to find the department based on item_id
function findDepartment(id) {
    for (i of saleDepartment) {
        var arr = i.split(" ");
        if (arr[0] == id) {
            var result = arr.slice(1, arr.lenth).join(" ");
            return result;
        }
    }
}


// This function display the items available for purchase
function queryTable() {
    saleList = [];
    var query = connection.query("SELECT item_id AS 'item_id', product_name AS 'product_name', price AS 'price', department_name AS 'department_name' FROM bamazon.products;", function(err, res) {
        if (err) throw err;
        
        for (var i = 0; i < res.length; i++) {
            // console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price);
            saleList.push(`${res[i].item_id} ${res[i].product_name} : $ ${res[i].price}`);
            saleDepartment.push(`${res[i].item_id} ${res[i].department_name}`);
        }
            console.log("-----------------------------------");
            console.table(res);
            console.log("-----------------------------------");
            
            // console.log(res);
            inquireItem(); 
      })
      // logs the actual query being run
    //   console.log(query.sql);
};

// function to update the product table 
function updateProduct() {
    console.log("\n");
    var query = connection.query(
        `UPDATE products SET stock_quantity=stock_quantity-${selectedQuantity}, product_sales=product_sales+${selectedQuantity} WHERE item_id=${selectedItem};`,
        function(err, res) {
            if (err) throw err;
                console.log(res.affectedRows + " product stock and sales updated!\n");
        }
    );
    
    var query = connection.query(
        `UPDATE departments SET product_sales=product_sales+${selectedQuantity} WHERE department_name='${selectedDepartment}';`,
        function(err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " product_sales updated!\n");
        }
    );
    // logs the actual query being run
    // console.log(query.sql);
    connection.end();
}

queryTable();


