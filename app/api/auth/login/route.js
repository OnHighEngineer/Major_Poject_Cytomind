import { NextResponse } from 'next/server';
import { connectDB } from '@/src/lib/db';
import User from '@/src/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  const { email, password } = await request.json();
  await connectDB();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json(
      { success: false, message: 'User not found' },
      { status: 401 }
    );
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json(
      { success: false, message: 'Invalid password' },
      { status: 401 }
    );
  }

  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  return NextResponse.json({
    success: true,
    token,
    user: { email: user.email, labId: user._id }
  });
}
