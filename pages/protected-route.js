import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUserAuth } from '../lib/hooks/auth';

import styles from "../styles/app.module.css";

const ProtectedRoute = () => {
    const router = useRouter();
    const { loading, error, loggedIn } = useUserAuth();

    // useEffect surveille les changements de loading et loggedIn
    useEffect(() => {
        if (!loading && !loggedIn) { // redirection quant loading et loggedIn sont false
            router.push('/login');
        }
    }, [loading, loggedIn, router]);

    if (loading) {
        return <div className={styles.container}><p>Loading...</p></div>;
    }

    if (error) {
        return <div className={styles.container}><p>An error occurred.</p></div>;
    }

    return (
        <div className={styles.container}>
            {loggedIn && (
                <>
                    <h1>Protected Route</h1>
                    <p>You can't see me if not logged-in!</p>
                </>
            )}
        </div>
    );
}

export default ProtectedRoute;

