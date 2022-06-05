const mongoose = require('mongoose')

const otpSchema = new mongoose.Schema({
    userId :{
        type : String
    },
    oneTimeKey : {
        type : String 
    },
    refreshToken : {
        default:null,
        type: String,
        expires: 30*86400
    }
})

module.exports = mongoose.model('UserToken',otpSchema)