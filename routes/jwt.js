const token = require('jsonwebtoken');
const secret="12321123321"
const jwt=(req,res,next)=>{
    const s= req.header('auth-token')
    if(!token){
        return res.status(400).send('Access Denied !');
    }
    try{
        const verified= token.verify(s,secret)
        req.user=verified
        next()
    }
    catch(err){
        res.status(400).send('Invalid Token')
    }
}
module.exports=jwt