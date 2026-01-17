import { NextResponse } from 'next/server';
import { connectDB } from '@/src/lib/db';
import { verifyToken } from '@/src/lib/auth';
import Job from '@/src/models/Job';

export async function GET(request, { params }) {
  const auth = verifyToken(request);
  if (auth.error) {
    return NextResponse.json({ message: auth.error }, { status: 401 });
  }

  await connectDB();
  const { jobId } = params;

  const job = await Job.findOne({
    jobId,
    labId: auth.user.userId
  });

  if (!job) {
    return NextResponse.json(
      { message: 'Job not found or access denied' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    jobId: job.jobId,
    status: job.status,
    progress: job.progress,
    result: job.result
  });
}
