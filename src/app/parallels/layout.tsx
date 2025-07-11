import React, { ReactNode } from "react";
import Header from "./Header";

export default function ParallersLayout({
  children,
  team,
  analytics,
}: {
  children: ReactNode;
  team: ReactNode;
  analytics: ReactNode;
}) {
  return (
    <div>
      <Header />
      <h1 className="text-4xl my-2">Parallers Layout</h1>
      <div className="mb-4">{children}</div>
      <div className="flex space-x-2">
        <div>{team}</div>
        <div>{analytics}</div>
      </div>
    </div>
  );
}
