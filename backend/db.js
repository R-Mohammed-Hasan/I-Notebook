const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/i-notebook";

// connect to particuler url from mongodb with DB as i-notebook specified
const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("Connected to Mongo");
    });
}
module.exports = connectToMongo;