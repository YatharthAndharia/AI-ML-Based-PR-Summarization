const { default: fetch } = require('node-fetch');
const { MESSAGES } = require('../../utils/constant.js');
const { Repo } = require('../../infrastructure/repositories/repo-dao.js');

const getRepos= async (req, res) =>{
    try {
      const repos=await Repo.getAll({where:{repo_owner:req.user.id}})
      return res.success(MESSAGES.SUCCESS,repos)
    } catch (error) {
      console.log(error);
      return res.error(error)
    }
  }
module.exports = { getRepos };
