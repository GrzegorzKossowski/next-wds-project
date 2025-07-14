import React, { PropsWithChildren } from "react";

export default function InfiniteLayout({ children }: PropsWithChildren) {
  return (
    <div>
      InfiniteLayout
      <div>{children}</div>
    </div>
  );
}
