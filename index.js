const express = require('express');
const path = require('path')
const cookieParser = require('cookie-parser');

const staticRoute=require("./routes/StaticRouter")
const urlRoute=require("./routes/url");
const userRoute=require("./routes/user");
const adminRoute=require("./routes/admin");
const { checkAuth, restrictToLoggedInUser, checkForAuth, restirictTo } = require('./middlewares/user');
const connectMongoDB = require('./connection');
const { handleRedirectUrl } = require('./controllers/url');
const URL=require("./models/url");


const app = express();

const PORT=3000;

connectMongoDB("mongodb://127.0.0.1:27017/su1").then(console.log("Mongo connected"));

app.set('view engine', 'ejs');
app.set('views',path.resolve("./views"))

app.use(express.json());
app.use(express.urlencoded({ extended:false }));
app.use(cookieParser());
app.use(checkForAuth)

app.use("/",staticRoute);
app.use("/user",userRoute)
app.use("/url",urlRoute);
app.use("/admin",restirictTo(['admin']),adminRoute)

app.get("/:id",async (req, res)=>{
    const shortId = req.params.id
    
    try {
        let entry = await URL.findOneAndUpdate(
            { shortid: shortId },
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
})

app.listen(PORT,console.log(`listening on port ${PORT}`));

module.exports = PORT
