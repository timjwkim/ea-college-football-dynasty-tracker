import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { comparePasswords } from '@/utils/hash';

export async function POST(req: Request) {
  const { dynastyId, password } = await req.json();

  const result = await sql`
    SELECT password_hash FROM dynasties WHERE dynasty_id = ${dynastyId}
  `;

  if (result.length === 0) {
    return NextResponse.json({ error: 'Dynasty not found' }, { status: 404 });
  }

  const isValid = await comparePasswords(password, result[0].password_hash);

  if (!isValid) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  return NextResponse.json({ success: true });
}
