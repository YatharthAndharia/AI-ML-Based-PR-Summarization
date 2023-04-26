const { Configuration, OpenAIApi } = require('openai');
const { configuration } = require('../../config');

const apiKey = configuration.openai_apikey;

const generateComment = async ({ diffContent }) => {
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
  return summary.data.choices[0].message.content;
};
module.exports = { generateComment };
