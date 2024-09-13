const jwt=require('jsonwebtoken');

const isAuthenticated = async(req, res, next)=>{
    const token = req.headers.authorization?.split(' ')[1];
    //*VERIFY THE TOKEN
    const verifyToken=jwt.verify(token,"heyheyhey",(err,decoded)=>{
        if(err){return false}
        else{return decoded}
    })
    // console.log("verifyTOken",verifyToken);
    if(verifyToken){
        //*SAVE THE USER REQ OBJ (SAVE THE USER DATA(id) IN  REQ.USER)
        req.user=verifyToken.id;
        next()
    }else{
        const  err=new Error(" Token expired, please login again");
        next(err);
    }

}

module.exports=isAuthenticated;