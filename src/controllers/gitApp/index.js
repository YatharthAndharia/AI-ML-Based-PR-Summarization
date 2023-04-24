const { default: fetch } = require('node-fetch');
const { configuration } = require("../../config");

const CLIENT_ID="de921624ce571949fab9"
const CLIENT_SECRET="2d5b7a08f2ea8cbec23d588858ee476b86537e85"
const getAccessToken=async (req,res,next)=>{
    const params=`?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${req.query.code}`;
    const response=await fetch(`${configuration.github_url}/login/oauth/access_token${params}`,{
        method:"POST",
        headers:{
            "Accept":"application/json"
        }
    })
    const object=await response.json();
    res.json(object)
}
module.exports={
    getAccessToken
}