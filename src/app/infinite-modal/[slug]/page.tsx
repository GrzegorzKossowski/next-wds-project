import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div>
      <div>src\app\infinite-modal\[slug]\page.tsx</div>
      <div>page {slug}</div>
    </div>
  );
}
