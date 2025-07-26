// "use client";

// import { useTransition } from "react";
// import { addTeamToDynasty, removeTeamFromDynasty } from "@/actions/dynastyTeams";

// export default function DynastyTeamManager({
//   dynastyId,
//   teams,
//   selectedTeamIds,
// }: {
//   dynastyId: string;
//   teams: { id: string; name: string }[];
//   selectedTeamIds: string[];
// }) {
//   const [isPending, startTransition] = useTransition();

//   const toggleTeam = (teamId: string) => {
//     startTransition(() => {
//       if (selectedTeamIds.includes(teamId)) {
//         removeTeamFromDynasty(dynastyId, teamId);
//       } else {
//         addTeamToDynasty(dynastyId, teamId);
//       }
//     });
//   };

//   return (
//     <div className="space-y-2">
//       <h2 className="text-xl font-semibold">Teams in Dynasty</h2>
//       <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
//         {teams.map((team) => {
//           const isSelected = selectedTeamIds.includes(team.id);
//           return (
//             <li key={team.id}>
//               <button
//                 onClick={() => toggleTeam(team.id)}
//                 className={`w-full px-4 py-2 rounded-lg text-left ${
//                   isSelected ? "bg-green-200" : "bg-gray-100 hover:bg-gray-200"
//                 }`}
//               >
//                 {team.name}
//               </button>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// }
