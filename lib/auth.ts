import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET!;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not set');
}

export interface JWTPayload {
  userId: string;
  iat?: number;
  exp?: number;
}

export function signJWT(payload: { userId: string }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '30d' });
}

export function verifyJWT(token: string): JWTPayload {
  return jwt.verify(token, JWT_SECRET) as JWTPayload;
}

export function getTokenFromRequest(request: NextRequest): string | null {
  // Check Authorization header first
  const authHeader = request.headers.get('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  // Check cookies
  const cookies = request.cookies;
  const token = cookies.get('auth-token')?.value;
  
  return token || null;
}

export function getUserFromRequest(request: NextRequest): string | null {
  try {
    const token = getTokenFromRequest(request);
    if (!token) return null;

    const payload = verifyJWT(token);
    return payload.userId;
  } catch (error) {
    return null;
  }
}