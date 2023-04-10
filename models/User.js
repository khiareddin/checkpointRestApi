// 7. Create a models folder and a User.js file in it 
// 8. In User.js you must define a mongoose Schema and export the model , you will use it in the server.js

const mongoose = require("mongoose");
const User = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true,
    },
    LastName: {
        type: String,
        required: true,
    },

    Age: {
        type: Number,
    },

    PhoneNumber: {
        type: Number,
        unique: true,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("user", User);
