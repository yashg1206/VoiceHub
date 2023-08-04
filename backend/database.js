const mongoose = require('mongoose');  //importing mongoose in our database
function DbConnect() {   // syntax of database
    // const DB_URL = process.env.DB_URL;
    // Database connection
    mongoose.connect("mongodb://0.0.0.0:27017/nayandb", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFindAndModify: false,
    }).then(()=>{
        console.log("db connected");
    }).catch((err)=>{
        console.log(err);
    })
    // const db = mongoose.connection;
    // db.on('error', console.error.bind(console, 'connection error:'));
    // db.once('open', () => {
    //     console.log('DB connected...');
    // });
}

module.exports = DbConnect;