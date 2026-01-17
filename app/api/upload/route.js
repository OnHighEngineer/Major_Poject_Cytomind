import { NextResponse } from 'next/server';
import { connectDB } from '@/src/lib/db';
import { verifyToken } from '@/src/lib/auth';
import Job from '@/src/models/Job';
import { randomUUID } from 'crypto';

export async function POST(request) {
  const auth = verifyToken(request);
  if (auth.error) {
    return NextResponse.json({ message: auth.error }, { status: 401 });
  }

  await connectDB();
  const formData = await request.formData();
  const patientId = formData.get('patientId');

  const jobId = randomUUID();

  await Job.create({
    jobId,
    patientId,
    labId: auth.user.userId,
    status: 'PENDING',
    progress: 0
  });

  return NextResponse.json({
    jobId,
    status: 'PENDING',
    message: 'Image uploaded, ML processing started'
  });
}
