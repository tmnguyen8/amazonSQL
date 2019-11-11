// 3. Create another Node app called `bamazonSupervisor.js`. Running this application will list a set of menu options:
//    * View Product Sales by Department
//    * Create New Department
// 4. When a supervisor selects `View Product Sales by Department`, the app should display a summarized table in their terminal/bash window. Use the table below as a guide.
// | department_id | department_name | over_head_costs | product_sales | total_profit |
// | ------------- | --------------- | --------------- | ------------- | ------------ |
// | 01            | Electronics     | 10000           | 20000         | 10000        |
// | 02            | Clothing        | 60000           | 100000        | 40000        |
// 5. The `total_profit` column should be calculated on the fly using the difference between `over_head_costs` and `product_sales`. `total_profit` should not be stored in any database. You should use a custom alias.
// 6. If you can't get the table to display properly after a few hours, then feel free to go back and just add `total_profit` to the `departments` table.
//    * Hint: You may need to look into aliases in MySQL.
//    * Hint: You may need to look into GROUP BYs.
//    * Hint: You may need to look into JOINS.
//    * **HINT**: There may be an NPM package that can log the table to the console. What's is it? Good question :)
var mysql = require("mysql");
var inquirer = require("inquirer");
var keys = require ("./keys.js");
var connection = mysql.createConnection(keys.databaseKeys);
var superOptions = [
    'View Product Sales by Department',
    'Create New Department',
    'exit'
];

function superInquire() {
    inquirer
        .prompt([
            {
                name: "superItems",
                type: "list",
                message: "What item would you like to purchase?",
                choices: superOptions
            }
        ]).then(function(answer) {
        console.log("You have selected item number: ", answer.superItems);

        switch (answer.superItems) {
            case ('View Product Sales by Department'):
                console.log('I want to view product sales');
                break;
            case ('Create New Department'):
                console.log('I want to create new department');
                break;
            case "exit":
                connection.end();
                break;
        }
    });
};

function displayProductSale() {

}


// Execute Spervisor Function
superInquire();
