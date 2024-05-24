module.exports=(mongoose)=>{
     const categories=mongoose.model(
          'categories',
          mongoose.Schema
          (
               {
                    name:String
                   
               },
               {
                    timestamps:true
               }
          )
     )
     return categories
     }