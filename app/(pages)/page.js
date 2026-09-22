"use client";

import Features from "../components/Features";
import Landing from "../components/Landing";
import Numbers from "../components/Numbers";
import Reviews from "../components/Reviews";

export default function Home() {
  return (
    <div>
      <Landing />
      <Features />
      <Reviews />
      <Numbers />
    </div>
  );
}
