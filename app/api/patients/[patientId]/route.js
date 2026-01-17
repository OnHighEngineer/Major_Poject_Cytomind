import { NextResponse } from 'next/server';
import { connectDB } from '@/src/lib/db';
import { verifyToken } from '@/src/lib/auth';
import Patient from '@/src/models/Patient';

export async function GET(request, { params }) {
  const auth = verifyToken(request);
  if (auth.error) {
    return NextResponse.json({ message: auth.error }, { status: 401 });
  }

  await connectDB();
  const { patientId } = params;

  const patient = await Patient.findOne({
    patientId,
    labId: auth.user.userId
  });

  if (!patient) {
    return NextResponse.json(
      { success: false, message: 'Patient not found or access denied' },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, patient });
}
