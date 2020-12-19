const mongoose = require('mongoose');
let schema = mongoose.Schema;

let category = new schema({
    CategoryName:String
})

module.exports = mongoose.model('Category',category);