'use client';

import { useState } from 'react';

interface PromptTemplate {
  title: string;
  prompt: string;
}

interface PromptTemplatesProps {
  bookText: string;
  characterJson: string;
}

const PROMPT_TEMPLATES: Record<string, (bookText: string, characterJson: string) => PromptTemplate> = {
  characterList: (bookText) => ({
    title: 'Character List Prompt',
    prompt: `Please analyze this book and create a comprehensive list of all characters. For each character, include:
1. Name
2. Role in the story
3. Any physical descriptions mentioned
4. Personality traits
Output as a JSON array.

Book Text:
${bookText}`
  }),
  characterSVG: (_, characterJson) => ({
    title: 'Character SVG Prompt',
    prompt: (() => {
      try {
        const characters = JSON.parse(characterJson);
        return characters.map((char: any) => {
          const physicalDesc = char.physical_descriptions ? 
            char.physical_descriptions.join(', ') : 
            'no specific physical description provided';
          
          return `Create an SVG illustration for ${char.name}:
Character Role: ${char.role}
Physical Description: ${physicalDesc}
Personality: ${char.personality_traits?.join(', ')}

Please create a simple, comic-style SVG illustration that captures these characteristics. The SVG should:
1. Use basic geometric shapes and paths
2. Reflect the character's key physical features
3. Convey their personality through pose and expression
4. Be suitable for a comic book panel
5. Use appropriate colors that match the character's description

Output the complete SVG code.

-------------------
`;
        }).join('\n');
      } catch (e) {
        return 'Please provide valid JSON character data in the format from the Character List prompt';
      }
    })()
  }),
  panelBreakdown: (bookText, characterJson) => ({
    title: 'Panel Breakdown',
    prompt: `Using this character list:
${characterJson}

And this story:
${bookText}

Break this story into sequential comic panels. For each panel include:
1. Scene description
2. Characters present from the provided list
3. Key actions or dialogue
4. Suggested layout and composition
Output as a JSON array.`
  }),
  masterTemplate: (bookText, characterJson) => ({
    title: 'Master Comic Generation',
    prompt: `Using these characters:
${characterJson}

And this story:
${bookText}

Create a complete comic book layout with:
1. All character designs in SVG format
2. Panel sequence with character positions
3. Scene descriptions
4. Dialogue placement
Output as a single JSON object containing all panels and character designs.`
  })
};

export function PromptTemplates({ bookText, characterJson }: PromptTemplatesProps) {
  const [activeTab, setActiveTab] = useState(Object.keys(PROMPT_TEMPLATES)[0]);
  const [copied, setCopied] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const copyToClipboard = async (text: string, promptType: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(promptType);
      setTimeout(() => setCopied(''), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const truncateText = (text: string, maxLines: number = 5) => {
    const lines = text.split('\n');
    if (lines.length > maxLines && !isExpanded) {
      return lines.slice(0, maxLines).join('\n') + '\n...';
    }
    return text;
  };

  const currentPrompt = PROMPT_TEMPLATES[activeTab]?.(bookText, characterJson).prompt;

  return (
    <div className="mb-8">
      <div className="border-b border-gray-200">
        <nav className="flex gap-4 flex-wrap">
          {Object.entries(PROMPT_TEMPLATES).map(([key, templateFn]) => (
            <button
              key={key}
              className={`px-4 py-2 ${activeTab === key ? 'border-b-2 border-blue-500' : ''}`}
              onClick={() => setActiveTab(key)}
            >
              {templateFn(bookText, characterJson).title}
            </button>
          ))}
        </nav>
      </div>
      
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <pre className={`text-sm whitespace-pre-wrap transition-all duration-200 ${isExpanded ? 'max-h-[1000px]' : 'max-h-[120px]'} overflow-hidden`}>
              {truncateText(currentPrompt)}
            </pre>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => copyToClipboard(currentPrompt, activeTab)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {copied === activeTab ? 'Copied!' : 'Copy'}
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                {isExpanded ? 'Show Less' : 'Show More'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
