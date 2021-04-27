const mongoose = require('mongoose')
const config = require('config') 

const db = config.get('mongoURI')

const connectDB = async () =>{
    try {
        await mongoose.connect(db,{
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex:true
        })
        console.log("ready to go")
    } catch (error) {
        console.log(error.message)
        // exiting the failed process
        process.exit(1);        
    }
}

module.exports = connectDB