import React, { PropsWithChildren } from "react";

export default function PollsLayout({ children }: PropsWithChildren) {
  return (
    <div>
      PollsLayout
      <div>{children}</div>
    </div>
  );
}
