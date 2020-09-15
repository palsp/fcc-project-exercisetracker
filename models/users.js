const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
  username : String,
  exercise: [{ 
        description : String,
        duration : Number,
        date : String,


  }]
})


module.exports = mongoose.model("User", userSchema)