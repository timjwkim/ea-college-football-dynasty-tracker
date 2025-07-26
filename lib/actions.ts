'use server';

import sql from './db';
import { revalidatePath } from 'next/cache';

export async function addTeamToDynasty(dynastyId: string, formData: FormData) {
  const teamId = formData.get('teamId');

  if (typeof teamId !== 'string') {
    throw new Error('Invalid teamId');
  }

  await sql`
    INSERT INTO dynasty_teams (dynasty_id, team_id)
    VALUES (${dynastyId}, ${teamId})
    ON CONFLICT DO NOTHING
  `;

  revalidatePath(`/dynasty/${dynastyId}`);
}

export async function removeTeamFromDynasty(dynastyId: string, formData: FormData) {
  const teamId = formData.get('teamId');

  if (typeof teamId !== 'string') {
    throw new Error('Invalid teamId');
  }

  await sql`
    DELETE FROM dynasty_teams
    WHERE dynasty_id = ${dynastyId} AND team_id = ${teamId}
  `;

  revalidatePath(`/dynasty/${dynastyId}`);
}