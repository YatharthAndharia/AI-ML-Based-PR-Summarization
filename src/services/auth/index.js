const {default:fetch}=require('node-fetch')
const { configuration } = require("../../config");
const { User } = require("../../infrastructure/repositories/user-dao");
const { createRepos } = require('../repo');


const getAccessToken=async (code)=>{
  const params=`?client_id=${configuration.client_id}&client_secret=${configuration.client_secret}&code=${code}&duration:P10Y`;
  const response=await fetch(`${configuration.github_url}/login/oauth/access_token${params}`,{
      method:"POST",
      headers:{
          "Accept":"application/json"
      }
  })
  const res=await response.json();
  return res.access_token
}
const registerUser=async ({data})=>{
  let user=await User.get({where:{id:data.id}})
  if(!user){
    user=await User.create({data})
    await createRepos({user,accessToken:user.dataValues.access_token})
    delete user.dataValues.access_token
  }
  delete user.dataValues.access_token
  return user
}


module.exports = { getAccessToken,registerUser };
