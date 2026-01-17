import { NextResponse } from 'next/server';
import { connectDB } from '@/src/lib/db';
import User from '@/src/models/User';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  const { email, password, labName } = await request.json();
  await connectDB();

  const existing = await User.findOne({ email });
  if (existing) {
    return NextResponse.json(
      { message: 'User already exists' },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashedPassword,
    labName
  });

  return NextResponse.json({ success: true, user });
}
