import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

// Generar JWT
const generateToken = (payload: { id: string | number, username: string }) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) throw new Error('No JWT_SECRET provided');
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

// Middleware para verificar el token
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token no proporcionado' });

  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET) throw new Error('No JWT_SECRET provided');
  jwt.verify(token, JWT_SECRET, (err) => {
    if (err) return res.status(401).json({ error: 'Unauthorized' });
    next();
  });
};

export { generateToken, verifyToken };
