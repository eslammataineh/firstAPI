const app = require('express')();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const db = mongoose.connect('mongodb://localhost/onlineShope', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const Tshirt = require('./model/shirt');
const Category = require('./model/category');
const Order = require('./model/order');

app.post('/tShirt',(req,res)=>{
    let newShirt = new Tshirt();

    newShirt.TshirtName = req.body.shirtName;
    newShirt.TshirtCategoryID = req.body.categoryId;
    newShirt.TshirtPrice = req.body.price;
    newShirt.NumberOfAvailableItems= req.body.availableItem;

    newShirt.save(function(err,savedShirt){
        if(err)
            res.status(500).send({error:"cannot add shirt to the store"});
        else
            res.status(200).send(savedShirt);

    })

})

app.get('/tShirt',(req,res)=>{
    Tshirt.find({}).populate({
        path:'Category',
        model:'Category',
        select:'CategoryName'
    }).exec((err, tShirt)=>{
        if(err)
            res.status(500).send({error:"cannot get t-shirt"});
        else
            res.status(200).send(tShirt);
    })

})

app.post('/category',(req,res)=>{
    let newCategory = new Category();

    newCategory.CategoryName = req.body.Cname;

    newCategory.save(function(err,savedCategory){
        if(err)
            res.status(500).send({error:"cannot add new category"});
        else
            res.status(200).send(savedCategory);

    })

})

app.get('/category',(req,res)=>{

    Category.find({},(err,Category)=>{
        if(err)
        res.status(500).send({error:"cannot get category name"});
    else
        res.status(200).send(Category);
    })

})

app.post('/order',(req,res)=>{
    let newOrder = new Order();

    newOrder.orderNumber = req.body.oNumber;
    newOrder.orderDateTime = req.body.oDate;
    newOrder.customerPhoneNumber = req.body.CPhone;

    newOrder.save(function(err,savednewOrder){
        if(err)
            res.status(500).send({error:"cannot save the order"});
        else
            res.status(200).send(savednewOrder);

    })
})

app.get('/order',(req,res)=>{
    Order.find({}).populate({
        path:'Tshirt',
        model:'Tshirt',
        select:'TshirtName'
    }).exec((err, orderdTshirt)=>{
        if(err)
            res.status(500).send({error:"cannot get Order tShirt"});
        else
            res.status(200).send(orderdTshirt);
    })
}) 


app.put('/tShirt/category/add',(req,res)=>{
    let tShirtId = req.body.TShirtId;
    let categoryId = req.body.cId;

    Category.findOne({_id:categoryId},(err,category)=>{
        if(err)
        res.status(500).send({error:"cannot find this category"});
        else{
            Tshirt.updateOne(
                {_id:tShirtId},
                {$addToSet:{Category:category._id}},(err,status)=>{
                    if(err)
                        res.status(500).send({error:"cannot update Tshirt"});
                    else{
                        res.send(status);
                    }
                }
            )
            
        }
        
    });
})


  app.put('/order/tShirt',(req,res)=>{
    let orderdTshirtId = req.body.TShirtId;
    let orderId = req.body.oId;

    Tshirt.findOne({_id:orderdTshirtId},(err,orderdTshirt)=>{
        if(err)
        res.status(500).send({error:"cannot find this tshirt"});
        else{
            Order.updateOne(
                {_id:orderId},
                {$addToSet:{Tshirt:orderdTshirt._id}},(err,status)=>{
                    if(err)
                        res.status(500).send({error:"cannot update Order"});
                    else{
                        res.send(status);
                    }
                }
            )
        }
     })
})


 app.put('/orderdtshirt/dec',(req,res)=>{
    let orderdTshirtId = req.body.TShirtId;
    
                Tshirt.updateOne(
                   {_id:orderdTshirtId} ,
                   {$inc:{NumberOfAvailableItems:-1}},
                   function(err, status){
                    if(err){
                        res.status(500).send({error:"cannot update order"})
                    }else{
                        res.send(status)
                    }
                   }
                )
})


app.listen(3000,()=> console.log('the server is running'));