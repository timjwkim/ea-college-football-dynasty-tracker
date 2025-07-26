'use client';

import { TEAMS } from '@/lib/teams';
import { useState } from 'react';

type Team = {
  id: string;
  name: string;
};

type Props = {
  dynastyId: string;
  existingTeams: Team[];
};

export default function AddTeamForm({ dynastyId, existingTeams }: Props) {
  const [selectedTeam, setSelectedTeam] = useState('');
  const [teams, setTeams] = useState<Team[]>(existingTeams);
  const [status, setStatus] = useState('');

  const handleAddTeam = async () => {
    if (!selectedTeam) return;

    const res = await fetch(`/api/dynasty/${dynastyId}/teams`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ teamId: selectedTeam }),
    });

    if (res.ok) {
      const teamToAdd = TEAMS.find((t) => t.id === selectedTeam);
      if (teamToAdd) {
        setTeams((prev) => [...prev, teamToAdd]);
      }
      setSelectedTeam('');
      setStatus('✅ Team added');
    } else {
      setStatus('❌ Error adding team');
    }
  };

  return (
    <div className="mt-4">
      <label className="block mb-2 text-sm font-medium">Add a Team</label>
      <select
        value={selectedTeam}
        onChange={(e) => setSelectedTeam(e.target.value)}
        className="p-2 border rounded w-full max-w-sm mb-2"
      >
        <option value="">-- Select a team --</option>
        {TEAMS.filter(t => !teams.find(added => added.id === t.id)).map((team) => (
          <option key={team.id} value={team.id}>
            {team.name}
          </option>
        ))}
      </select>

      <button
        onClick={handleAddTeam}
        disabled={!selectedTeam}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        Add Team
      </button>

      {status && <p className="mt-2 text-sm">{status}</p>}

      {teams.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Teams in Dynasty:</h2>
          <ul className="list-disc list-inside text-gray-800">
            {teams.map((team) => (
              <li key={team.id}>{team.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
