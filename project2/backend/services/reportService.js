const generateReportPayload = ({ review, user, uploadedFile }) => {
  return {
    title: `Code Review Report - ${review.language} ${review.fileName}`,
    user: { name: user.name, email: user.email },
    summary: review.summary,
    qualityScore: review.qualityScore,
    readabilityScore: review.readabilityScore,
    maintainabilityScore: review.maintainabilityScore,
    tags: review.tags,
    details: review.details,
    file: uploadedFile ? { name: uploadedFile.originalName, size: uploadedFile.size } : null,
    generatedAt: new Date().toISOString(),
  };
};

module.exports = { generateReportPayload };
