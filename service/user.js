const jwt=require('jsonwebtoken');

const key="shushanth@123$4"
function setUser(user){
    return jwt.sign({
        id:user._id,
        email:user.email,
        role:user.role,
    },key);
}

function getUser(uid){
    try{ 
    return jwt.verify(uid,key);
    }catch(err){
        return null;
    }

}

module.exports={setUser,getUser,jwt};