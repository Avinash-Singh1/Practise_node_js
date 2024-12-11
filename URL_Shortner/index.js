const express = require("express");
const  urlRoutes  = require("./routes/url");
const { ConnectToMongodb } = require("./DB/connection");
const URL = require("./models/url");

const app = express();
const PORT = 8000;

// Middleware for parsing JSON
app.use(express.json());

// Connect to MongoDB
ConnectToMongodb("mongodb://localhost:27017/shortUrl")
    .then(() => console.log("DB connected"))
    .catch((err) => console.error("Error connecting to DB:", err));

// Use URL routes
app.use("/url", urlRoutes);
app.get("/:shortid", async (req, res) => {
    const shortid = req.params.shortid;
    console.log("s: ", shortid);

    try {
        const entry = await URL.findOneAndUpdate(
            { ShortId: shortid }, // Match schema field name
            {
                $push: {
                    visitHistory: {
                        timeStamp: Date.now(),
                    },
                },
            },
            { new: true } // Return the updated document
        );

        if (!entry) {
            return res.status(404).json({ error: "Short URL not found" });
        }

        console.log("Entry: ", entry.redirectedUrl);
        res.redirect(entry.redirectedUrl);
    } catch (err) {
        console.error("Error handling shortid redirect:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});



// Start the server
app.listen(PORT, () => {
    console.log(`Listening at Port ${PORT}`);
});
