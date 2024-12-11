const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    ShortId: { // Matches field used in the controller
        type: String,
        required: true,
        unique: true,
    },
    redirectedUrl: {
        type: String,
        required: true,
    },
    visitHistory: [{ timeStamp: { type: Number } }],
}, { timestamps: true });

const URL = mongoose.model("url", urlSchema);

module.exports = URL;
