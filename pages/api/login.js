

import jwt from "jsonwebtoken"; // à installer
import { serialize } from 'cookie';

const JWT_SECRET= process.env.JWT_SECRET || 'my_jwt_password';

// Fonction pour encoder le token JWT
export function encodeToken(payload) {
    return jwt.sign(payload, JWT_SECRET);
}

// Fonction pour décoder le token JWT
export function decodeToken(token) {
    return jwt.verify(token, JWT_SECRET);
}

// Gestion des requêtes de login
export default (req, res) => {
    const { method } = req;
    const { email, password } = req.body;

    if (method !== 'POST') {
        return res.status(404).end();
    }

    if (!email || !password) {
        return res.status(400).json({
            error: 'Missing required params',
        });
    }

    const user = authenticateUser(email, password);

    if (user) {
        const token = encodeToken(user); // Générer le token

        res.setHeader('Set-Cookie',
            serialize('my_auth', token, { path: '/', httpOnly: true })
        );

        return res.json({ success: true, user });
    } else {
        return res.status(401).json({
            success: false,
            error: "Wrong email or password",
        });
    }
};


// Fonction d'authentification utilisateur
// import { encode } from "../../lib/jwt";
function authenticateUser(email, password) {
    const validEmail = 'Johndoe@somecompany.com';
    const validPassword = 'strongpassword';

    if (email === validEmail && password === validPassword) {
        return {
            id: 'f678f078-fcfe-43ca-9d20-e8c9a95209b6',
            name: 'John Doe',
        };
    }

    return null;
}
