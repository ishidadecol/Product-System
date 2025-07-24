import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { User } from '../models';

const SECRET = process.env.JWT_SECRET;


export async function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const token = sign({ id: user.id, email: user.email }, SECRET, {
        expiresIn: process.env.JWT_EXPIRE_TIME,
    });

    return res.json({ token });
}
