const mongoose = require('mongoose');
let objectId = mongoose.Schema.Types.ObjectId;
let schema = mongoose.Schema;

let tShirt = new schema({
    TshirtName :String,
    TshirtCategoryID :Number,
    TshirtPrice :Number,
    NumberOfAvailableItems:Number,
    Category:[{type:objectId , ref:'Category'}]
})

module.exports = mongoose.model('Tshirt',tShirt);