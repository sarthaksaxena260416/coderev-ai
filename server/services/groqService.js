const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const reviewCode = async (code, language = "auto-detect") => {
  const prompt = `
You are an expert code reviewer. Analyze the following ${language} code and return a JSON response with this exact structure:

{
  "language": "detected language",
  "bugs": ["bug1", "bug2"],
  "security": ["issue1", "issue2"],
  "performance": ["issue1", "issue2"],
  "bestPractices": ["suggestion1", "suggestion2"],
  "summary": "overall summary in 2-3 sentences",
  "score": 7
}

Rules:
- score is out of 10 (10 = perfect code)
- Each array should have 1-5 items max
- Be specific and actionable
- Return ONLY the JSON, no extra text

Code to review:
\`\`\`
${code}
\`\`\`
`;

  const response = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3,
    max_tokens: 1500,
  });

  const content = response.choices[0].message.content;

  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Invalid response from AI");

  return JSON.parse(jsonMatch[0]);
};

module.exports = { reviewCode };