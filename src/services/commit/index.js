const {Octokit}=require('octokit');
const { Commit } = require('../../infrastructure/repositories/commit-dao');

const createCommit=async({accessToken,owner,repo,repoId})=>{
    const octokit = new Octokit({
        auth: accessToken
      })
    const commits=await octokit.request(`GET /repos/${owner}/${repo}/commits`, {
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      })
    for(let i=0;i<commits.data.length;i+=1)
    {
        Commit.create({data:{url:commits.data[i].url,authorId:commits.data[i].author.id,repoId,message:commits.data[i].commit.message,commitDate:commits.data[i].commit.author.date}})
    }
}
module.exports={createCommit}