const OpenAI = require('openai');
const promptBuilder = require('../utils/promptBuilder');

const getClient = () => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('Missing OPENAI_API_KEY environment variable');
  }
  return new OpenAI({ apiKey });
};

const chunkCode = (code, chunkSize = 3000) => {
  const chunks = [];
  let start = 0;
  while (start < code.length) {
    chunks.push(code.slice(start, start + chunkSize));
    start += chunkSize;
  }
  return chunks;
};

const getFallbackAnalysis = (error) => {
  if (!process.env.OPENAI_API_KEY) {
    return 'OpenAI API key is not configured. Please set OPENAI_API_KEY in your backend environment.';
  }

  const message = error?.message || '';
  if (error?.response?.status === 429 || /quota/i.test(message)) {
    return 'OpenAI quota exceeded. Please check your billing details or update your plan to continue AI review.';
  }

  if (error?.response?.status === 401 || /invalid api key/i.test(message)) {
    return 'OpenAI authentication failed. Please verify your OPENAI_API_KEY.';
  }

  console.error('AI service error:', error);
  return 'AI service is temporarily unavailable. Please try again later.';
};

const analyzeCode = async ({ code, language, mode = 'review', context = '' }) => {
  try {
    const prompt = promptBuilder.buildReviewPrompt({ code, language, mode, context });
    const chunks = chunkCode(prompt, 2800);
    const messages = chunks.map((chunk, index) => ({
      role: 'user',
      content: index === 0 ? chunk : `CONTINUE: ${chunk}`,
    }));

    const client = getClient();
    const response = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4.1-mini',
      messages,
      temperature: 0.2,
      max_tokens: 1200,
    });

    return response.choices?.[0]?.message?.content || 'No analysis returned';
  } catch (error) {
    return getFallbackAnalysis(error);
  }
};

const createReviewSummary = async ({ code, language, mode, context }) => {
  const analysis = await analyzeCode({ code, language, mode, context });
  return analysis;
};

module.exports = { analyzeCode, createReviewSummary };
