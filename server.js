const express=require('express');
const cors=require('cors')
const app=express();
const db=require('./models');

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
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
     res.json({message:'welcome to my project'})
})

require('./routes/user.route')(app);
const PORT=process.env.PORT || 8080;
app.listen(PORT,()=>{
     console.log(`SERVER RUNNING ${PORT}`)
})