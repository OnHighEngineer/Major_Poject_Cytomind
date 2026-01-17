import jwt from 'jsonwebtoken';

export function verifyToken(request) {
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { error: 'Unauthorized: No token provided' };
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { user: decoded };
  } catch (error) {
    return { error: 'Unauthorized: Invalid or expired token' };
  }
}
