const  mongoose = require("mongoose");
const schema = mongoose.Schema;

const UserSchema = new schema({
    username : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true,
        unique : true
    },
    password : {
        type : String,
        require : true,
        unique : true
    }
},{
    timestamps : true
})

const User = mongoose.model('User',UserSchema);

module.exports = User;