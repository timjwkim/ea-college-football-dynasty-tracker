import { TEAMS as ALL_TEAMS } from '@/lib/teams';
import sql from '@/lib/db';
import { addTeamToDynasty, removeTeamFromDynasty } from '@/lib/actions';

type Props = {
  params: Promise<{ dynastyId: string }>;
};

export default async function DynastyPage({ params }: Props) {
  const { dynastyId } = await params;

  const dynasty = await sql`
    SELECT * FROM dynasties WHERE dynasty_id = ${dynastyId}
  `;

  const currentTeams = await sql`
    SELECT team_id FROM dynasty_teams WHERE dynasty_id = ${dynastyId}
  `;

  const currentTeamIds = new Set(currentTeams.map((t: any) => t.team_id));
  const availableTeams = ALL_TEAMS.filter(t => !currentTeamIds.has(t.id));

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Dynasty: {dynasty[0]?.name}</h1>
      <h2 className="text-xl">ID: {dynastyId}</h2>

      <form action={addTeamToDynasty.bind(null, dynastyId)} className="flex gap-2">
        <select name="teamId" className="border rounded px-2 py-1">
          {availableTeams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">Add Team</button>
      </form>

      <h3 className="text-lg mt-4 font-semibold">Teams in Dynasty:</h3>
      <ul className="list-disc pl-5">
        {Array.from(currentTeamIds).map((teamId) => {
          const team = ALL_TEAMS.find(t => t.id === teamId);
          return (
            <li key={teamId} className="flex justify-between items-center">
              {team?.name || teamId}
              <form action={removeTeamFromDynasty.bind(null, dynastyId)} className="inline">
                <input type="hidden" name="teamId" value={teamId} />
                <button type="submit" className="text-red-500 ml-4">Remove</button>
              </form>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
