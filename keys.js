require('dotenv').config();

// Databases Keys
exports.databaseKeys = {
    // host name
    host: process.env.DB_HOST,
    
    // Your port;
    port: process.env.DB_PORT,
    
    // Your username
    user: process.env.DB_USER,
    
    // Your password
    password: process.env.DB_PASSWORD,

    // Database name
    database: process.env.DB_DATABASE_NAME
     
}

