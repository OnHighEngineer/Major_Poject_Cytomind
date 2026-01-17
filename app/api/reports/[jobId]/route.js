import { NextResponse } from 'next/server';
import { verifyToken } from '@/src/lib/auth';
import { connectDB } from '@/src/lib/db';
import Report from '@/src/models/report';

export async function GET(request, { params }) {
  const auth = verifyToken(request);
  if (auth.error) {
    return NextResponse.json({ message: auth.error }, { status: 401 });
  }

  await connectDB();
  const { jobId } = params;

  const report = await Report.findOne({
    jobId,
    labId: auth.user.userId
  });

  if (!report) {
    return NextResponse.json(
      { message: 'Report not found or access denied' },
      { status: 404 }
    );
  }

  return new NextResponse('Mock PDF Report Content', {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=report_${jobId}.pdf`
    }
  });
}
