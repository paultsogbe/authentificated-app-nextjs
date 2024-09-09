import { useState, useEffect } from "react";

// GETION DE L' AUTHENTICATION

const useUserAuth = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);

        fetch('/api/get-session')
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to fetch session');
                }
                return res.json();
            })
            .then((data) => {
                if (data.loggedIn) {
                    setLoggedIn(true);
                    setUser(data.user);
                }
            })
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }, []);

    return {
        user,
        loggedIn,
        loading,
        error,
    };
};

export default useUserAuth;
