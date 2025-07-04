import crypto from 'crypto';

const secretKey = crypto.randomBytes(64).toString('hex'); // Generates a 64-byte random key in hexadecimal format
console.log(secretKey);
