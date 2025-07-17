import React from "react";

export default function GramLoader() {
  return (
    <div className="relative flex items-center justify-center text-sm font-bold overflow-hidden bg-[#ca1527] text-white w-fit">
      <div className="relative pb-[0.2rem] px-2">
        gram.pl
      </div>
      <div className="absolute inset-0 bg-background animate-reveal"></div>
    </div>
  );
}

// globals.css
// @theme inline {
//  --animate-reveal: reveal 2s ease-in-out infinite;
//   @keyframes reveal {
//     0% {
//       transform: translateX(0%);
//     }
//     50% {
//       transform: translateX(100%);
//     }

//     100% {
//       transform: translateX(100%);
//     }
//   }
// }
