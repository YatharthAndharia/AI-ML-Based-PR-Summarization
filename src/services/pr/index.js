const {Octokit}=require('octokit');
const { default: fetch } = require('node-fetch');
const { PR } = require('../../infrastructure/repositories/pr-dao');
const { generateComment } = require('../openai');
const { User } = require('../../infrastructure/repositories/user-dao');

const createWebHook=async({owner,repo,accessToken})=>{
    try {
        const octokit = new Octokit({ 
            auth: accessToken,
          });
        console.log("Owner:",owner,"Repo:",repo,accessToken);
        await octokit.request(`POST /repos/${owner}/${repo}/hooks`, {
            owner: 'OWNER',
            repo: 'REPO',
            name: 'web',
            active: true,
            events: [
              'pull_request'
            ],
            config: {
              url: 'https://hkdk.events/d6ajiolOOGIR',
              content_type: 'json',
              insecure_ssl: '0'
            },
            headers: {
              'X-GitHub-Api-Version': '2022-11-28'
            }
          })
    } catch (error) {
        console.log(error);
        return error
    }
    
}

const createPR=async({prData})=>{
    const isExist=await PR.get({where:{repoId:prData.head.repo.id}})
    if(!isExist)
    {
        await PR.create({data:{...prData,raw_data:prData,repoId:prData.head.repo.id}})
    }
}

const addComment=async({prData})=>{
  console.log(prData.state);
  if(prData.state==="open")
  {
    const user=await User.get({where:{userName:prData.user.login}})  
    const diffResponse = await fetch(prData.diff_url);
      const diffContent = await diffResponse.text();
      const commentData=await generateComment({diffContent});
      const octokit = new Octokit({ 
        auth:user.dataValues.access_token,
      });
      const res=await octokit.request(`POST /repos/${prData.user.login}/${prData.head.repo.name}/issues/${prData.number}/comments`,{
        body:commentData
      })
      console.log(res.status);
  }
}
module.exports={createWebHook,createPR,addComment}