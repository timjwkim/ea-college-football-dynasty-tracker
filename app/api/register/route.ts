import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { hashPassword } from '@/utils/hash';

export async function POST(req: Request) {
  const { dynastyId, password, name } = await req.json();

  const passwordHash = await hashPassword(password);

  try {
    await pool.query(
      `INSERT INTO dynasties (dynasty_id, password_hash, name) VALUES ($1, $2, $3)`,
      [dynastyId, passwordHash, name]
    );
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Dynasty already exists' }, { status: 400 });
  }
}
