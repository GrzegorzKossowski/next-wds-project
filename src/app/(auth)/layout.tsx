import React, { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <h1 className="text-4xl">Auth Layout</h1>
      <hr />
      <div>{children}</div>
    </div>
  );
}
