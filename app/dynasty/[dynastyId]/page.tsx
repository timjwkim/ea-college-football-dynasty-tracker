'use client';

import { useParams } from "next/navigation";

export default async function DynastyPage() {
  const params = useParams();
  const dynastyId = params.dynastyId;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded p-6">
        <h1 className="text-2xl font-bold">Dynasty ID</h1>
        <p className="text-lg mt-2">{dynastyId}</p>
      </div>
    </div>
  );
}
