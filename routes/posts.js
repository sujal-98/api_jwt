const router=require('express').Router()
const jwt=require('./jwt')

router.get('/',jwt,(req,res)=>{
    res.json({
        posts:{
            title:'My first post',
            description:'You shouldnt access this'
        }
    })
})
module.exports=router