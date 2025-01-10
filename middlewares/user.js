const {setUser,getUser,jwt}=require("../service/user");

function checkForAuth(req,res,next){
    const token=req.cookies?.uid;
    req.user=null;
    if(!token){
        return next();
    }
    const user=getUser(token);
    if(!user){
        return next();
    }
    req.user=user;
    return next();

}

function restirictTo(roles=[]){
    return (req,res,next)=>{
        if(!req.user){
            return res.redirect("/login")
        }
        if(!roles.includes(req.user.role)){
            return res.status(403).json({error: "Unauthorized"});
        }
        next();
    }
}

module.exports = {
    checkForAuth,
    restirictTo,
 };
