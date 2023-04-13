const { createPR, addComment } = require("../../services/pr")

const prListener=async(req,res)=>{
    const prData=req.body.pull_request
    await createPR({prData})
    await addComment({prData})
    res.sendStatus(200)
}
module.exports={prListener}