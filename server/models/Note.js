const mongoose = require('mongoose');

const NoteSchema=new mongoose.Schema({
    email:{
        type:String,
        required: true,
    },
    title:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required:true
    },
    tags:[String],
    imageUrl:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model('Note',NoteSchema);
