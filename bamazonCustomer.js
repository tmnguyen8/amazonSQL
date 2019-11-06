// 5. Then create a Node application called `bamazonCustomer.js`. 
// Running this application will first display all of the items available for sale. 
// Include the ids, names, and prices of products for sale.

// 6. The app should then prompt users with two messages.

//    * The first should ask them the ID of the product they would like to buy.
//    * The second message should ask how many units of the product they would like to buy.

// 7. Once the customer has placed the order, 
// your application should check if your store has enough of the product to meet the customer's request.

//    * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

// 8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
//    * This means updating the SQL database to reflect the remaining quantity.
//    * Once the update goes through, show the customer the total cost of their purchase.

var mysql = require("mysql");
var inquirer = require("inquirer");
var keys = require ("./keys.js");

var saleList = [];
var selectedItem =0;
var selectedQuantity =0;

var connection = mysql.createConnection(keys.databaseKeys);
  
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    queryTable();

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
        console.log("You have selected item number: ", answer.selectedItem);
        selectedItem = answer.selectedItem
        console.log("Amount purchase: ", answer.selectedQuantity);
        selectedQuantity = answer.selectedQuantity
    });
    
};



// This function display the items available for purchase
function queryTable() {
    var query = connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price);
            saleList.push(`${res[i].item_id}`);
        }
            console.log("-----------------------------------");
            // console.log(res);
            inquireItem();
            if (selectedItem <= selectedQuantity) {
                console.log("enough to sell");
            } else {
                console.log("out of stock");
            }
            
                    
      });
      // logs the actual query being run
      console.log(query.sql);
}
