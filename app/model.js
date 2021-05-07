const mongoose = require('mongoose');

// defining the model schema
const  dataSchema = mongoose.Schema({
    name : String,
    email : String,
    country : String
})

module.exports = mongoose.model('data', dataSchema);