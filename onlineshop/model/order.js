const mongoose = require('mongoose');
let objectId = mongoose.Schema.Types.ObjectId;
let schema = mongoose.Schema;

let order = new schema({
    orderNumber:Number,
    orderDateTime :Date,
    customerPhoneNumber:Number,
    Tshirts:[{type:objectId , ref:'Tshirt'}]
})

module.exports = mongoose.model('Order',order);