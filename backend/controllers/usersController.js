import * as User from '../models/usersModel.js';
import  { getUserByName }  from '../models/usersModel.js';
import { signToken } from '../auth/auth.js';
import bcrypt from 'bcryptjs';


export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with hashed password
    const id = await User.createUser({ username, email, password: hashedPassword });

    res.status(201).json({ user_id: id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const loginController = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await getUserByName(username);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = signToken({ id: user.id, username: user.username });

    res.json({ token, user: { id: user.id, email: user.email, username: user.username } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

