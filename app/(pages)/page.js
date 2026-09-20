"use client"

import { useState } from "react";
import Features from "../components/Features";
import Landing from "../components/Landing";
import Numbers from "../components/Numbers";
import Reviews from "../components/Reviews";
import { auth } from "../firebase";

export default function Home() {

    const [loginOpen, setLoginOpen] = useState(false);
    const [user, setUser] = useState(null);

  return (
    <div>
      <Landing setLoginOpen={setLoginOpen} user={user} auth={auth} />
      <Features />
      <Reviews />
      <Numbers />
    </div>
  );
}
