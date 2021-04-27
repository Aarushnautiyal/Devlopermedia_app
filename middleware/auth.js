const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next)=>{
    // get token from header

    const token =req.header('x-auth-token')
    // if no token
    if(!token){
        return res.status(401).json({msg:"no token, authorization denied"})
    }
}