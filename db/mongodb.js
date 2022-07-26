const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/bookes',{ useNewUrlParser: true}).then(() => console.log("Connection Sucessfuly")).catch((error) => console.log(error))
