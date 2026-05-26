const axios = require("axios");

const extractPrDetails = (url) => {
  const cleanUrl = url.trim();
  const match = cleanUrl.match(
    /github\.com\/([^/]+)\/([^/]+)\/pull\/(\d+)/
  );
  if (!match) throw new Error("Invalid GitHub PR URL");
  return { owner: match[1], repo: match[2], pullNumber: match[3] };
};

const fetchPRCode = async (prUrl) => {
  const { owner, repo, pullNumber } = extractPrDetails(prUrl);

  console.log(`Fetching PR: ${owner}/${repo}/pull/${pullNumber}`);

  try {
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/pulls/${pullNumber}/files`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      }
    );

    const files = response.data;

    if (!files || files.length === 0) {
      throw new Error("No files found in this PR");
    }

    const code = files
      .map(
        (file) =>
          `// File: ${file.filename}\n${file.patch || "// Binary or no diff"}`
      )
      .join("\n\n");

    return code;
  } catch (error) {
    if (error.response) {
      console.error("GitHub API error:", error.response.status, error.response.data);
      if (error.response.status === 401) throw new Error("Invalid GitHub token");
      if (error.response.status === 404) throw new Error("PR not found — make sure the repo is public and PR exists");
      if (error.response.status === 403) throw new Error("GitHub API rate limit exceeded");
    }
    throw error;
  }
};

module.exports = { fetchPRCode };