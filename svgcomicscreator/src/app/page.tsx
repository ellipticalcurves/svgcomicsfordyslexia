'use client';

import { SVGViewer } from '@/components/SVGViewer';
import { PromptTemplates } from '@/components/PromptTemplates';
import { CharacterGallery } from '@/components/CharacterGallery';
import { useState } from 'react';

const SAMPLE_CHARACTER_JSON = {
  characters: [
    {
      name: "Hero",
      role: "Main Character",
      description: "A brave young adventurer with a mysterious past",
      svg: '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#4F46E5"/></svg>'
    },
    {
      name: "Mentor",
      role: "Guide",
      description: "Wise elder who guides the hero",
      svg: '<svg viewBox="0 0 100 100"><rect x="20" y="20" width="60" height="60" fill="#059669"/></svg>'
    }
  ]
};

export default function Home() {
  const [svgInput, setSvgInput] = useState('<svg viewBox="0 0 100 100"><rect x="20" y="20" width="60" height="60" fill="#059669"/></svg>');
  const [characterJson, setCharacterJson] = useState(JSON.stringify(SAMPLE_CHARACTER_JSON, null, 2));

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharacterJson(e.target.value);
  };

  return (
    <div className="p-4">
      <PromptTemplates />
      <div className="mb-4">
        <h3 className="text-lg mb-2">Character JSON Input</h3>
        <textarea
          className="w-full h-32 p-2 border rounded font-mono text-sm"
          value={characterJson}
          onChange={handleJsonChange}
          placeholder="Paste your character JSON here..."
        />
      </div>
      <CharacterGallery 
        characters={JSON.parse(characterJson).characters} 
      />
      <SVGViewer initialSvg={svgInput} />
    </div>
  );
}
