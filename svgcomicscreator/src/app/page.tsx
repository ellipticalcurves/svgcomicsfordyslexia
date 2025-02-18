import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [svgCode, setSvgCode] = useState("");

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] grid grid-cols-2 gap-4">
      <textarea
        className="border p-2 w-full h-full"
        placeholder="Enter SVG code here"
        value={svgCode}
        onChange={(e) => setSvgCode(e.target.value)}
      />
      <div
        className="border p-2 w-full h-full"
        dangerouslySetInnerHTML={{ __html: svgCode }}
      />
    </div>
  );
}
