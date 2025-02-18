'use client';

import { useState } from 'react';

export default function Home() {
  const [svgInput, setSvgInput] = useState('<rect width="124" height="124" rx="24" fill="#F97316"/>');

  return (
    <div className="min-h-screen p-4 grid grid-cols-2 gap-4">
      <div>
        <h2 className="mb-2">SVG Input</h2>
        <textarea
          className="w-full h-[500px] p-2 border rounded"
          value={svgInput}
          onChange={(e) => setSvgInput(e.target.value)}
          placeholder="Paste your SVG code here..."
        />
      </div>
      
      <div>
        <h2 className="mb-2">Preview</h2>
        <div 
          className="w-full h-[500px] border rounded p-2 bg-white"
          dangerouslySetInnerHTML={{ __html: svgInput }}
        />
      </div>
    </div>
  );
}
