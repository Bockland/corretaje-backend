const mongoose = require('mongoose');

const connectToDb = async (req, res) => {
    await mongoose.connect(process.env.MONGO_DB, { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("BD connect"))
    .catch((e) => console.log(e))
}

module.exports = { connectToDb }