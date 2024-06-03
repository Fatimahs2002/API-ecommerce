const dbConfig=require('../config/config');
const mongoose=require('mongoose');
mongoose.Promise=global.Promise;

const db={}
db.mongoose=mongoose;
db.url=dbConfig.url;
db.products=require('./product.model')(mongoose)
db.users=require('./userModel')(mongoose)
db.categories=require('./category.model')(mongoose)
db.Orderrder=require('./order.model')
db.Cart=require('./cartModel')
module.exports=db;
