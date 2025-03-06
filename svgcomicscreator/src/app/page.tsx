'use client';

import { SVGViewer } from '@/components/SVGViewer';
import { PromptTemplates } from '@/components/PromptTemplates';
import { CharacterGallery } from '@/components/CharacterGallery';
import { useState } from 'react';

interface Character {
  name: string;
  role: string;
  description: string;
  svg: string;
}

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
  const [bookText, setBookText] = useState(`One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked.

“What’s happened to me?” he thought. It wasn’t a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls. A collection of textile samples lay spread out on the table—Samsa was a travelling salesman—and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame. It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer.`);

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharacterJson(e.target.value);
  };

  const parseCharacters = (jsonString: string) => {
    try {
      const data = JSON.parse(jsonString);
      return Array.isArray(data) ? { characters: data } : data;
    } catch (e) {
      return { characters: [] };
    }
  };

  const handleUpdateCharacter = (index: number, updatedCharacter: Character) => {
    try {
      const currentData = parseCharacters(characterJson);
      currentData.characters[index] = updatedCharacter;
      setCharacterJson(JSON.stringify(currentData, null, 2));
    } catch (e) {
      console.error('Failed to update character:', e);
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="mb-4">
        <h3 className="text-lg mb-2">Book Text</h3>
        <textarea
          className="w-full h-48 p-2 border rounded font-mono text-sm"
          value={bookText}
          onChange={(e) => setBookText(e.target.value)}
          placeholder="Paste your book text here..."
        />
      </div>




      <PromptTemplates bookText={bookText} characterJson={characterJson} />


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
        characters={parseCharacters(characterJson).characters}
        onUpdateCharacter={handleUpdateCharacter}
      />
      <SVGViewer initialSvg={svgInput} />
    </div>
  );
}
