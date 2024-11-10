const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    phone_no:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:function(v){
                return /^\+[0-9]{2}\s[0-9]{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
})

const User = mongoose.model('User',userSchema);
module.exports = User;