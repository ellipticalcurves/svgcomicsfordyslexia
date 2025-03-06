'use client';

import { useState } from 'react';

interface Character {
  name: string;
  role: string;
  physical_descriptions?: string[];
  personality_traits?: string[];
  svg?: string;
}

interface CharacterGalleryProps {
  characters: Character[];
  onUpdateCharacter?: (index: number, updatedCharacter: Character) => void;
}

export function CharacterGallery({ characters, onUpdateCharacter }: CharacterGalleryProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const generateCharacterPrompt = (char: Character) => {
    return `Create an SVG illustration for ${char.name}:
Character Role: ${char.role}
Physical Description: ${char.physical_descriptions?.join(', ') || 'None provided'}
Personality: ${char.personality_traits?.join(', ') || 'None provided'}

Please create a simple, comic-style SVG illustration that captures these characteristics.
Output the complete SVG code.`;
  };

  const copyPrompt = async (char: Character) => {
    try {
      await navigator.clipboard.writeText(generateCharacterPrompt(char));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleSvgUpdate = (svg: string) => {
    if (onUpdateCharacter && characters[activeTab]) {
      onUpdateCharacter(activeTab, {
        ...characters[activeTab],
        svg
      });
    }
  };

  if (!Array.isArray(characters) || characters.length === 0) {
    return <div className="p-4 text-gray-500">No characters loaded. Please generate character list first.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto flex border rounded-lg overflow-hidden min-h-[400px]">
      <div className="w-48 bg-gray-50 border-r">
        {characters.map((char, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`w-full text-left p-4 hover:bg-gray-100 transition-colors
              ${activeTab === index ? 'bg-gray-200 border-l-4 border-blue-500' : ''}`}
          >
            {char.name}
          </button>
        ))}
      </div>

      <div className="flex-1 p-4">
        <div className="mb-4">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold">{characters[activeTab].name}</h3>
            <button
              onClick={() => copyPrompt(characters[activeTab])}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {copied ? 'Copied!' : 'Copy Prompt'}
            </button>
          </div>
          <p className="text-gray-600">{characters[activeTab].role}</p>
          {characters[activeTab].physical_descriptions && (
            <div className="mt-2">
              <h4 className="font-bold">Physical Description:</h4>
              <ul className="list-disc pl-5">
                {characters[activeTab].physical_descriptions.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </div>
          )}
          {characters[activeTab].personality_traits && (
            <div className="mt-2">
              <h4 className="font-bold">Personality:</h4>
              <ul className="list-disc pl-5">
                {characters[activeTab].personality_traits.map((trait, i) => (
                  <li key={i}>{trait}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-4">
          <h4 className="font-bold mb-2">SVG Input</h4>
          <textarea
            className="w-full h-32 p-2 border rounded font-mono text-sm mb-4"
            value={characters[activeTab].svg || ''}
            onChange={(e) => handleSvgUpdate(e.target.value)}
            placeholder="Paste the generated SVG code here..."
          />
          {characters[activeTab].svg && (
            <div className="border rounded-lg p-4 bg-white">
              <div 
                className="w-full aspect-square"
                dangerouslySetInnerHTML={{ __html: characters[activeTab].svg }} 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
