"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type SomeDataT = {
    id: string;
    body: string
}

export default function DataList() {
  const [data, setData] = useState<SomeDataT[]>();

  useEffect(() => {
    const someData = Array.from({ length: 50 }, () => ({
      id: Math.random().toString(16).slice(2, 12),
      body: "Lorem ipsum sid dolor",
    }));
    setData(someData);
  }, []);

  return (
    <>
      <div>InfinitePage</div>
      <div className="flex flex-col space-y-4 w-[450px]">
        {data &&
          data.map((el) => {
            return (
              <Link
                key={el.id}
                href={`/infinite-modal/${el.id}`}
                className="border border-yellow-400/30"
              >
                {el.id}
                <hr />
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Consequuntur asperiores nulla harum rerum ratione eum placeat
                temporibus delectus optio illum ea corrupti, saepe iusto odit
                distinctio quia hic odio magni!
              </Link>
            );
          })}
      </div>
    </>
  );
}
