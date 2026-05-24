const buildReviewPrompt = ({ code, language, mode = 'review', context = '' }) => {
  const normalizedLanguage = language ? language.toLowerCase() : 'unknown';
  const instructions = {
    review: 'Perform an AI-powered code review with bug detection, security analysis, performance recommendations, maintainability score, and best practices.',
    explain: 'Explain the chosen code clearly and concisely for a developer audience, including how it works and why each part exists.',
    fix: 'Identify issues and provide corrected code with clear explanations for each fix.',
    optimize: 'Recommend performance optimizations and refactoring strategies to improve speed, memory usage, and readability.',
    audit: 'Run a security audit and report vulnerabilities, risky patterns, and patch recommendations.',
    summary: 'Generate a concise documentation summary and code comments for the module.',
  };

  return `You are NovaReviewAI, an advanced code review assistant.
Mode: ${mode}
Language: ${normalizedLanguage}
Context: ${context || 'General code review'}

${instructions[mode] || instructions.review}

Code:
${code}

Produce:
- Review summary
- Bug list
- Security vulnerabilities
- Performance suggestions
- Readability and maintainability indicators
- Suggested refactor details
- Inline examples if useful
`;
};

module.exports = { buildReviewPrompt };
