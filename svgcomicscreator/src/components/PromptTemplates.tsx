'use client';

import { useState } from 'react';

interface PromptTemplate {
  title: string;
  prompt: string;
}

const PROMPT_TEMPLATES: Record<string, PromptTemplate> = {
  characterList: {
    title: 'Character List Prompt',
    prompt: `Please analyze this book and create a comprehensive list of all characters. For each character, include:
1. Name
2. Role in the story
3. Any physical descriptions mentioned
4. Personality traits
Output as a JSON array.`
  },
  characterSVG: {
    title: 'Character SVG Prompt',
    prompt: `For each character in the list, create an SVG character design prompt using this format:
"Create an SVG illustration of [character name]. They are [physical description]. The style should be [comic book style/simple/detailed] with [specific artistic elements]."`
  },
  panelBreakdown: {
    title: 'Panel Breakdown',
    prompt: `Break this story into sequential comic panels. For each panel include:
1. Scene description
2. Characters present
3. Key actions or dialogue
4. Suggested layout and composition
Output as a JSON array.`
  }
  // Add more templates here following the same structure
};

export function PromptTemplates() {
  const [activeTab, setActiveTab] = useState(Object.keys(PROMPT_TEMPLATES)[0]);
  const [copied, setCopied] = useState('');

  const copyToClipboard = async (text: string, promptType: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(promptType);
      setTimeout(() => setCopied(''), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="mb-8">
      <div className="border-b border-gray-200">
        <nav className="flex gap-4 flex-wrap">
          {Object.entries(PROMPT_TEMPLATES).map(([key, template]) => (
            <button
              key={key}
              className={`px-4 py-2 ${activeTab === key ? 'border-b-2 border-blue-500' : ''}`}
              onClick={() => setActiveTab(key)}
            >
              {template.title}
            </button>
          ))}
        </nav>
      </div>
       
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-start">
          <pre className="text-sm whitespace-pre-wrap">
            {PROMPT_TEMPLATES[activeTab]?.prompt}
          </pre>
          <button
            onClick={() => copyToClipboard(PROMPT_TEMPLATES[activeTab]?.prompt, activeTab)}
            className="ml-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {copied === activeTab ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
}
