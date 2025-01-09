"use client";

import { signOut } from "next-auth/react";

export default function Settings() {
  return (
    <div>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
}
