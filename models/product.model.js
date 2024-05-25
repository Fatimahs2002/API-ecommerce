module.exports=(mongoose)=>{
const products=mongoose.model(
     'product',
     mongoose.Schema
     (
          {
               name:{
                    type:String,
                    required: true
               },
               image:{
                    Type:[String],
                    default:[]
               },
               description:{
                    type:String,
                    required:true,
               },
               charctaristics:[{
                    type:{
                         type:String,
                         required:true
                    },
                    value:{
                         type:String,
                         required:true
                    },
                    price:{
                         type:String,
                         required:true
                    }
               }
          ],
          category: {
               type: mongoose.Schema.Types.ObjectId,
               ref: 'Category',
               required: false,
             },
             categoryName: { // Field to store the category name
               type: String,
               required: true
             }
          },
          {
               timestamps:true
          }
     )
)
return products
}