const mongoose = require('mongoose')   

const urlSchema=mongoose.Schema({
    shortid:{
        type:String,
        required:true
    },
    redirectUrl:{
        type:String,
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    shorturl:{
        type: String,
        required: true,
    },
    visitHistory:[{timestamp:{ type: Number} }]
},{ timestamps:true});

const URL = mongoose.model('Url', urlSchema)

module.exports = URL;