const express=require('express');
const cors=require('cors')
const app=express();
const db=require('./models');
const userRoute = require('./routes/userRoute')
db.mongoose
.connect(db.url,{
     
}).then(()=>{
     console.log("connected to db")
}).catch(err=>{
     console.log("connot connect to DB",err)
     process.exit();
})


app.use(cors());
app.use(express.json());
app.use('/user', userRoute)


app.get('/',(req,res)=>{
     res.json({message:'welcome to my project'})
})

const PORT=process.env.PORT || 8080;
app.listen(PORT,()=>{
     
     console.log(`SERVER RUNNING ${PORT}`)
})