const mongoose = require("mongoose");

const schema = mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    useremail:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },

})

const userSchema = mongoose.model("userSchema", schema);
module.exports = userSchema;