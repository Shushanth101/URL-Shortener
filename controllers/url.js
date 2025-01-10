const shortid =require('shortid');
const URL=require("../models/url")
const PORT=require("../index")

async function handleGenerateShortId(req, res) {  
    if (!req.body.url) return res.render("home",{ error: "Url!! dumb fuck" });
     const shortID = shortid.generate();
     const port=3000
     const short="http://localhost:3000/"+shortID;
     await URL.create({
        shortid: shortID,
        redirectUrl: req.body.url,
        createdBy: req.user.id,
        shorturl: short,
        visitHistory:[],
     })

    return res.render("home",{
        shorturl:shortID
    })

}
async function handleRedirectUrl(req, res) {
    const shortId = req.params.id
    try {
        let entry = await URL.findOneAndUpdate(
            { shortId },
            { 
                $push: {
                    visitHistory: { timestamp: Date.now() }
                }
            },
            { new: true } 
        );

        if (entry==null) {
            return res.status(404).json({ message: "URL not found" });
        }

        return res.redirect(entry.redirectUrl);
    } catch (error) {
        console.error("Error while redirecting: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {
    handleGenerateShortId,
    handleRedirectUrl,

}