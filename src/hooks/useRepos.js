import { useState, useEffect } from "react";
import { getUserRepos } from "../api/github";

export function useRepos(username) {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!username) return;
        setLoading(true); setError(null);
        getUserRepos(username, 1, 100)
            .then((data) => { setRepos(data); setLoading(false); })
            .catch((err) => { setError(err.message); setLoading(false); });
    }, [username]);

    return { repos, loading, error };
}