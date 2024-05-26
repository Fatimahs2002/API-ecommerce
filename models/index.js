const dbConfig=require('../config/config');
const mongoose=require('mongoose');
mongoose.Promise=global.Promise;

const db={}
db.mongoose=mongoose;
db.url=dbConfig.url;
db.products=require('./product.model')(mongoose)
db.users=require('./userModel')(mongoose)
db.categories=require('./category.model')(mongoose)
db.orders=require('./order.model')(mongoose)
module.exports=db;
