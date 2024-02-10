const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");
const {User} = require('./db')
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://Ani:Abhiani@atlascluster.phipben.mongodb.net/");

const authMiddleware = async( req ,res ,next)=>{
    const authHeader = req.headers.authorization;
    const username = req.headers.username;
    if (!authHeader || !authHeader.startsWith('Bearer ')|| !username) {
        return res.status(403).json({message:"middleware issue"});
    }

    // const token = authHeader.split(' ')[1];

    try {
        // const decoded = jwt.verify(token, JWT_SECRET);
        const exisitngUser = await User.findOne({ username: username });
        req.userId = exisitngUser._id;

        next();
    } catch (err) {
        return res.status(403).json({message:"middleware issue"});
    }
}
module.exports = {
    authMiddleware
}