import React from "react";
import BackButton from "./BackButton";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div>
      <div>
        src\app\infinite-modal\<strong>@(modal)</strong>\[slug]\page.tsx
      </div>
      <div>page {slug}</div>
      <div>
        <BackButton />
      </div>
    </div>
  );
}
