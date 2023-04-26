const { default: fetch } = require('node-fetch');
const { Octokit } = require('octokit');
const { Hello } = require('../../services/index.js');
const { MESSAGES } = require('../../utils/constant.js');
const { Configuration, OpenAIApi } = require('openai');
const { configuration } = require('../../config/index.js');

const octokit = new Octokit({
  auth: process.env.GIT_TOKEN
});
const apiKey = configuration.openai_apikey;
class HelloController {
  static async hello(req, res) {
    const data = await octokit.request(
      'GET /repos/YatharthAndharia/TextSummary/pulls',
      {}
    );
    const diffResponse = await fetch(data.data[0].diff_url);
    const diffContent = await diffResponse.text();
    const openai = new OpenAIApi(new Configuration({ apiKey }));
    const augmentedPrompts = [
      {
        role: 'user',
        content: `
      summarize this pull request ${diffContent},
      Format this PR with markdown.
      Add title "PR Summary" in bold and big fonts.
      Add new section
      Create bullet point for New File, Update File with respective file names. Add bold style for bullet point heading.
      Add description below each bullet point`
      }
    ];
    const summary = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: augmentedPrompts,
      temperature: 1,
      max_tokens: 1000
    });
    console.log(summary.data.choices[0].message.content);
    res.json(summary.data.choices[0].message.content);
  }
}

module.exports = { HelloController };
