import axios from "axios";

const githubApi = axios.create({
    baseURL: `${import.meta.env.VITE_GITHUB_BASE_URL}`,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/vnd.github.v3+json",
    },
});

// Request interceptor — injects token if stored in localStorage
githubApi.interceptors.request.use((config) => {
    const token = localStorage.getItem("github_token");
    if (token) {
        config.headers.Authorization = `token ${token}`;
    }
    return config;
});

// Response interceptor — normalizes errors
githubApi.interceptors.response.use(
    (response) => response,
    (error) => {
        const message =
            error.response?.status === 404 ? "User or resource not found." :
                error.response?.status === 403 ? "GitHub API rate limit exceeded." :
                    error.response?.status === 401 ? "Invalid GitHub token." :
                        "Something went wrong. Please try again.";
        return Promise.reject({ message, status: error.response?.status });
    }
);

export default githubApi;