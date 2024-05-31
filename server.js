require('dotenv').config();
const express=require('express');
const cors=require('cors')
const app=express();
const connectedToDatabase = require('./config/config')
const userRoute = require('./routes/userRoute');
const categoryRoute=require('./routes/categoryRoute');
const productRoute=require('./routes/productRoute');

const PORT = process.env.PORT



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRoute)
app.use('/category',categoryRoute);
app.use('/product',productRoute);
app.get('/',(req,res)=>{
     res.json({message:'welcome to my project'})
})

require('./routes/user.route')(app);
require('./routes/category.route')(app);
const PORT=process.env.PORT || 8080;


app.listen(PORT,()=>{
     connectedToDatabase()
     console.log(`SERVER RUNNING ${PORT}`)
})