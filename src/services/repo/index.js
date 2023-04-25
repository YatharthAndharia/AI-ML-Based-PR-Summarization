const {Octokit}=require('octokit'
);
const { Repo } = require('../../infrastructure/repositories/repo-dao');
const { createWebHook } = require('../pr');
const {createCommit, createCommitWebHook}=require('../commit/index')

const createRepos=async ({user,accessToken})=>{
    const octokit = new Octokit({ 
        auth: accessToken,
      });
    const repoData=await octokit.request(`GET /users/${user.userName}/repos`, {});
    for(let i=0;i<1;i+=1)
    {
        // eslint-disable-next-line no-await-in-loop
        const repo=await Repo.create({data:{...(repoData.data[i]),repo_owner:user.id,raw_data:repoData.data[i]}})
        // eslint-disable-next-line no-await-in-loop
        await createCommitWebHook({owner:repoData.data[i].owner.login,repo:repoData.data[i].name,accessToken})
        // eslint-disable-next-line no-await-in-loop
        
        // eslint-disable-next-line no-await-in-loop
        await createCommit({accessToken,owner:user.userName,repo:repoData.data[i].name,repoId:repo.dataValues.id,userId:user.id})
    }
}
module.exports={createRepos}