const jwt = require("jsonwebtoken");
require("dotenv").config();


const authenticate = (req,res,next)=>{
    const token =  req.cookies.NOR
    try {
        if(!token){
            return res.send("please login again")
        }
        const blacklisted = JSON.parse(fs.readFileSync("./db.json","utf-8"))
        if(blacklisted.includes(token)){
            return res.send("You Are Logged Out Please Login Again")
        }
        jwt.verify(token,process.env.NORMAL,(err,decoded)=>{
            if(err){
                console.log(err)
                res.send("Your Token Has been expired Please Login First")
            }else{
                console.log(decoded)
                const role = decoded.role;
                req.body.role = role;
                next()
            }
        })
    } catch (error) {
        console.log(error);
        res.send("something went wrong in athenticate  middleware")
    }
}

module.exports ={
    authenticate
}