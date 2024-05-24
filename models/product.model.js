module.exports=(mongoose)=>{
const products=mongoose.model(
     'product',
     mongoose.Schema
     (
          {
               name:String,
               image:[],
               descripption:String,
               charctaristics
          },
          {
               timestamps:true
          }
     )
)
return products
}