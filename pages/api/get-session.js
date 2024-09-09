import { parse } from 'cookie';
import { decodeToken } from '../../pages/api/login';

// Gestion des cookies
const handler = (req, res) => {
    if (req.method !== 'GET') {
        return res.status(404).end();
    }

    const {my_auth} = parse(req.headers.cookie || '');
    if (!my_auth) {
        return res.json({loggedIn: false});
        
    }
    try {
        const user = decodeToken(my_auth);
        return res.json({
            loggedIn: true,
            user
        });
        
    } catch (error) {
        return res.status(401).json({ loggedIn: false, error: 'Invalid token' });
    }

   
};
export default handler;