'use client';

import { useState } from 'react';

interface Character {
  name: string;
  role: string;
  description: string;
  svg: string;
}

interface CharacterGalleryProps {
  characters: Character[];
  onUpdateCharacter?: (index: number, updatedCharacter: Character) => void;
}

export function CharacterGallery({ characters, onUpdateCharacter }: CharacterGalleryProps) {
  const [activeTab, setActiveTab] = useState(0);

  if (!characters.length) {
    return <div className="p-4 text-gray-500">No characters loaded</div>;
  }

  return (
    <div className="flex border rounded-lg overflow-hidden min-h-[400px]">
      {/* Vertical Tabs */}
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

      {/* Character Display */}
      <div className="flex-1 p-4">
        <div className="mb-4">
          <h3 className="text-xl font-bold">{characters[activeTab].name}</h3>
          <p className="text-gray-600">{characters[activeTab].role}</p>
          <p className="mt-2">{characters[activeTab].description}</p>
        </div>

        {/* SVG Display */}
        <div className="mt-4 border rounded-lg p-4 bg-white">
          <div 
            className="w-full aspect-square"
            dangerouslySetInnerHTML={{ __html: characters[activeTab].svg }} 
          />
        </div>
      </div>
    </div>
  );
}
