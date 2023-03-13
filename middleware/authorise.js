const authorise = (role)=>{
    return (req,res,next)=>{
        const roles = req.body.role
        if(role.includes(roles)){
            next()
        }else{
            res.send("Your Are not Authorise")
        }
    }
}


module.exports={
    authorise
}