"use client";

import { useState } from "react";
import { registerTestUser } from "@/lib/api";

export default function TestPage() {
  const [response, setResponse] = useState(null);

  const handleTest = async () => {
    const fakeUser = {
      provider: "llllelelenekn",
      providerId: "9874321",
      name: "Frontend Test User",
      email: "frontend@test.com",
      picture: "https://picsum.photos/300",
    };

    const res = await registerTestUser(fakeUser);
    setResponse(res);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Frontend → Backend Test</h1>
      <button
        onClick={handleTest}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Send Test User
      </button>

      {response && (
        <pre className="mt-4 p-4 bg-gray-100  text-black rounded-lg">
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </div>
  );
}
