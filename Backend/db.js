const mongoose = require('mongoose');


const mongOURI = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";

const connectToMongo = () =>{
    mongoose.connect(mongOURI, ()=>{
        console.log("Connected to mongo sucessfully");
    })
}

module.exports = connectToMongo;