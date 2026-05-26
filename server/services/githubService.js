const axios = require("axios");

const extractPrDetails = (url) => {
  const match = url.match(
    /github\.com\/([^/]+)\/([^/]+)\/pull\/(\d+)/
  );
  if (!match) throw new Error("Invalid GitHub PR URL");
  return { owner: match[1], repo: match[2], pullNumber: match[3] };
};

const fetchPRCode = async (prUrl) => {
  const { owner, repo, pullNumber } = extractPrDetails(prUrl);

  const response = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/pulls/${pullNumber}/files`,
    {
      headers: {
        Accept: "application/vnd.github.v3+json",
        ...(process.env.GITHUB_TOKEN && {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        }),
      },
    }
  );

  const files = response.data;
  const code = files
    .map(
      (file) =>
        `// File: ${file.filename}\n${file.patch || "// Binary or no diff"}`
    )
    .join("\n\n");

  return code;
};

module.exports = { fetchPRCode };