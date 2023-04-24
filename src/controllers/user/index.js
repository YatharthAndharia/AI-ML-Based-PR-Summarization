const { MESSAGES } = require("../../utils/constant")

// eslint-disable-next-line arrow-body-style
const getUserData=async(req,res)=>{
    return res.success(MESSAGES.SUCCESS,req.user)
}
module.exports={getUserData}