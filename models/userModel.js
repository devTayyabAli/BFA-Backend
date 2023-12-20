const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
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

module.exports = mongoose.model("Voting_User", userSchema);
