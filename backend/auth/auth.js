import jwt from 'jsonwebtoken';
export const JWT_SECRET = 'c3c9135afad4d0c8d12ce85e9ae59c44c3ece7784b254742ab0a53f0da15fc26f1b402da8935bf5b7bc98b4053194ade15bead98c337dd61752c4bf0ed391f88';


// Function to create a JWT token
export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}

export const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // expects 'Bearer <token>'

  if (!token) return res.status(401).json({ error: 'No token provided' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });

    req.user = user;
    next();
  });
};