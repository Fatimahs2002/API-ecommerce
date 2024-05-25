module.exports=(mongoose)=>{
     const users=mongoose.model(
          'users',
          mongoose.Schema
          (
               {fullName: {
                    type: String,
                    required: true,
                  },
                 
                
                  email: {
                    type: String,
                    unique: true,
                    required: true,
                  },
                
                  password: {
                    type: String,
                    required: true,
                  },
                  phoneNumber: {
                    type: String,
                    required: true,
                  },
                
                  address: {
                    type: String,
                    required: true,
                  },
                  role: {
                    type: String,
                    enum: [ "admin", "customer"],
                    default: "customer",
                  },
               },
               {
                    timestamps:true
               }
          )
     )
     return users
     }