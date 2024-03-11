const jwt=require('jsonwebtoken')
const auth=(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1]
    try{
        if(token)
        {
            const decoded=jwt.verify(token,'khalid')
            if(decoded)
            {
                req.headers.userID=decoded.userID
                next()
            }
            else{
                res.status(200).json({msg:'you are not authorised'})
            }
        }
        else{
            res.status(200).json({msg:'you are not authorised'})
        }
    }
    catch(err)
    {
        res.status(400).json({error:err})
    }
}

module.exports={
    auth
}