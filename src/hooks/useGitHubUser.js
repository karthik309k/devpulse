import { useState, useEffect } from "react";
import { getUser } from "../api/github";

export function useGitHubUser(username) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!username) { setUser(null); return; }
        setLoading(true); setError(null);
        getUser(username)
            .then((data) => { setUser(data); setLoading(false); })
            .catch((err) => { setError(err.message); setLoading(false); });
    }, [username]);

    return { user, loading, error };
}