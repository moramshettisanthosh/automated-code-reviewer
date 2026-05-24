const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);
const validatePassword = (password) => password && password.length >= 8;
const validateLanguage = (language) => [
  'javascript', 'typescript', 'python', 'java', 'c', 'c++', 'c#', 'go', 'php', 'rust'
].includes(language?.toLowerCase());

module.exports = { validateEmail, validatePassword, validateLanguage };
