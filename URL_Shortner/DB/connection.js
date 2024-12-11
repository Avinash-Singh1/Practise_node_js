const mongoose = require("mongoose");
mongoose.set("strictQuery",true);
async function ConnectToMongodb(url) {
    return mongoose.connect(url);
}

module.exports={
    ConnectToMongodb
}