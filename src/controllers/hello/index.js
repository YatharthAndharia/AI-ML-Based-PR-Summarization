const { default: fetch } = require('node-fetch');
const {Octokit}=require('octokit')
const { Hello } = require('../../services/index.js');
const { MESSAGES } = require('../../utils/constant.js');
const {Configuration,OpenAIApi}=require('openai')

const octokit = new Octokit({ 
  auth: process.env.GIT_TOKEN,
});
const apiKey="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"
class HelloController {
  static async hello(req, res) {
    const data = await octokit.request("GET /repos/YatharthAndharia/TextSummary/pulls", {});
    const diffResponse = await fetch(data.data[0].diff_url);
    const diffContent = await diffResponse.text();
    const openai=new OpenAIApi(new Configuration({apiKey}))
    const augmentedPrompts = [
      {role:'user', content: `summarize this pull request ${diffContent}` }
    ];
    const summary = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: augmentedPrompts,
      temperature: 1,
      max_tokens: 1000
    });
    console.log(summary.data.choices[0].message.content);
    res.json(summary.data.choices[0].message.content.toString())
  }
}

module.exports = { HelloController };
