const mongoose=require('mongoose');
const Schema=mongoose.Schema

     const categoryScehma=  new Schema({

         name: {
           type: String,
           required:true

         },
         SubCategory:[{
          type: Schema.Types.ObjectId,
          ref: 'SubCategory',
          required: false
        }],
         

     });
   
    const categories=mongoose.model('categories',categoryScehma);
    module.exports=categories;
   