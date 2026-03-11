import githubApi from "./axiosConfig";

// ── Fetch a GitHub user profile ──
export const getUser = (username) =>
    githubApi.get(`/users/${username}`).then((res) => res.data);

// ── Fetch all public repos of a user ──
export const getUserRepos = (username, page = 1, perPage = 30) =>
    githubApi
        .get(`/users/${username}/repos`, {
            params: { sort: "updated", per_page: perPage, page },
        })
        .then((res) => res.data);

// ── Fetch a single repository ──
export const getRepo = (username, repoName) =>
    githubApi.get(`/repos/${username}/${repoName}`).then((res) => res.data);

// ── Fetch repo contributors ──
export const getContributors = (username, repoName) =>
    githubApi
        .get(`/repos/${username}/${repoName}/contributors`, {
            params: { per_page: 10 },
        })
        .then((res) => res.data);

// ── Fetch repo languages ──
export const getRepoLanguages = (username, repoName) =>
    githubApi.get(`/repos/${username}/${repoName}/languages`).then((res) => res.data);

// ── Fetch trending repos via search ──
export const getTrendingRepos = (language = "", since = "weekly") => {
    const date = new Date();
    if (since === "daily") date.setDate(date.getDate() - 1);
    else if (since === "weekly") date.setDate(date.getDate() - 7);
    else date.setMonth(date.getMonth() - 1);
    const dateStr = date.toISOString().split("T")[0];
    const langQuery = language ? ` language:${language}` : "";
    return githubApi
        .get("/search/repositories", {
            params: {
                q: `created:>${dateStr}${langQuery}`,
                sort: "stars",
                order: "desc",
                per_page: 20,
            },
        })
        .then((res) => res.data.items);
};

// ── Check GitHub API rate limit ──
export const getRateLimit = () =>
    githubApi.get("/rate_limit").then((res) => res.data.rate);