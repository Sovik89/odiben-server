const jwt=require("jsonwebtoken");



module.exports=function(req,res,next){
    try{
        const token=req.headers.authorization.split(" ")[1];
        console.log("Token is: ",token);
        const decoded=jwt.verify(token,process.env.SECRET);
        req.body.userId = decoded.userId;
        console.log("After decoding:==",req.body.userId)
        next();
    }catch(err){
        response.status(401).send({
            success:false,
            message:"Invalid token"
        })
    }
}