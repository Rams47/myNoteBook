const mongoose = require('mongoose');
const {Schema} = mongoose;

const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
        //he used user here
    },
    title:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    tag:{
        type: String,
        default: "General"
    },
    date:{
        type: Date,
        default: Date.now
    }
});

//he used user here
module.exports = mongoose.model('notes',NotesSchema);