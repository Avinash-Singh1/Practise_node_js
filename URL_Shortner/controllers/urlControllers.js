const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewURL(req, res) {
    const body = req.body;
    console.log("url values: ", body.url);

    if (!body.url) {
        return res.status(400).json({ error: "URL is required" });
    }

    const shortID = shortid.generate(); // Generate a unique ID
    console.log("Generated ShortId:", shortID);

    try {
        await URL.create({
            ShortId: shortID, // Use the correct field name as per schema
            redirectedUrl: body.url,
            visitHistory: []
        });

        return res.json({ id: shortID });
    } catch (err) {
        console.error("Error creating URL document:", err);
        return res.status(500).json({ error: "Failed to create URL" });
    }
}

async function handleGetanalytics(req,res){
    const shortid = req.params.shortid;
   console.log("ana: ",shortid);

    try {
        const result = await URL.findOne(
            { ShortId: shortid } // Match schema field name
            // Return the updated document
        );

        if (!result) {
            return res.status(404).json({ error: "Short URL not found" });
        }

        // console.log("Entry: ", entry.redirectedUrl);
        res.json({
            totalClick: result.visitHistory.length,
            analytics:result.visitHistory
        })
    } catch (err) {
        console.error("Error handling shortid redirect:", err);
        res.status(500).json({ error: "Internal server error" });
    }
}


module.exports = {
    handleGenerateNewURL,handleGetanalytics
};
