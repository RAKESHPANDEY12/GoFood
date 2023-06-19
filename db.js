const mongoose = require('mongoose');


const Connection=(URL)=>{
     mongoose.connect(URL)
     .then(()=>{
            console.log("connected");
            const fetched_data= mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray()
            .then((data)=>{
                const foodCategory= mongoose.connection.db.collection("Categories");
                foodCategory.find({}).toArray()
                  .then((catdata)=>{
                      global.food_items=data;
                      global.foodCategory=catdata;
                        }).catch((err)=>{
                            console.log(err);                        
                        })
                //  console.log(food_items);
            }).catch((err)=>{
                console.log(err);
            });
        }).catch((err)=>{
            console.log("...",err);
        })
}
module.exports=Connection;