'use client';

import { useState, useEffect } from 'react';

interface Panel {
  id: number;
  scene: string;
  characters: string[];
  action: string;
  dialogue?: string;
  layout: string;
  svg?: string;
  textSummary: string;
  originalText: string;  // Add this field for the corresponding book text
}

interface PanelGalleryProps {
  panels: Panel[];
  characters: any[];
  onUpdatePanel?: (index: number, updatedPanel: Panel) => void;
}

export function PanelGallery({ panels, characters, onUpdatePanel }: PanelGalleryProps) {
  const [activePanel, setActivePanel] = useState(0);
  const [copied, setCopied] = useState(false);

  // Reset active panel when panels array changes
  useEffect(() => {
    if (activePanel >= panels.length) {
      setActivePanel(0);
    }
  }, [panels.length, activePanel]);

  const generatePanelPrompt = (panel: Panel) => {
    return `Create a comic panel SVG for this scene:
Scene Description: ${panel.scene}
Characters Present: ${panel.characters.join(', ')}
Action: ${panel.action}
Layout: ${panel.layout}
${panel.dialogue ? `Dialogue: ${panel.dialogue}` : ''}
Story Text: ${panel.textSummary}

Character SVGs to include:
${characters
  .filter(char => panel.characters.includes(char.name))
  .map(char => char.svg)
  .join('\n')}

Please create a comic panel that:
1. Uses Comic Sans MS for all text (font-family: "Comic Sans MS", cursive)
2. Has high contrast between text and background
3. Maintains good spacing between letters and words
4. Uses a clear panel layout as described
5. Places character SVGs appropriately in the scene
6. Adds background elements that don't overwhelm the main action
7. Uses a minimum font size of 14px
8. Keeps text alignment consistent
9. Incorporates the story text in a dyslexia-friendly way

Output the complete SVG code for the panel.`;
  };

  const copyPrompt = async (panel: Panel) => {
    try {
      await navigator.clipboard.writeText(generatePanelPrompt(panel));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (!Array.isArray(panels) || panels.length === 0) {
    return (
      <div className="p-4 text-gray-500 border rounded-lg">
        No panels loaded. Use the Panel Breakdown prompt to generate panels first.
      </div>
    );
  }

  const currentPanel = panels[activePanel];
  if (!currentPanel) return null;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Panel Editor</h2>
      <div className="max-w-6xl mx-auto flex border rounded-lg overflow-hidden min-h-[400px]">
        {/* Panel navigation */}
        <div className="w-48 bg-gray-50 border-r flex-shrink-0">
          {panels.map((panel, index) => (
            <button
              key={index}
              onClick={() => setActivePanel(index)}
              className={`w-full text-left p-4 hover:bg-gray-100 transition-colors
                ${activePanel === index ? 'bg-gray-200 border-l-4 border-blue-500' : ''}`}
            >
              {`Panel ${panel.id || index + 1}`}
            </button>
          ))}
        </div>

        {/* Main content area */}
        <div className="flex-1 p-4 overflow-y-auto">
          {/* Panel header */}
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold">Panel {currentPanel.id || activePanel + 1}</h3>
            <button
              onClick={() => copyPrompt(currentPanel)}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {copied ? 'Copied!' : 'Copy Panel Prompt'}
            </button>
          </div>

          {/* Two-column layout for panel details */}
          <div className="grid grid-cols-2 gap-4">
            {/* Left column: Panel details and SVG */}
            <div className="space-y-4">
              <div className="space-y-2">
                <p><strong>Scene:</strong> {currentPanel.scene}</p>
                <p><strong>Characters:</strong> {currentPanel.characters.join(', ')}</p>
                <p><strong>Action:</strong> {currentPanel.action}</p>
                {currentPanel.dialogue && (
                  <p><strong>Dialogue:</strong> {currentPanel.dialogue}</p>
                )}
                <p><strong>Layout:</strong> {currentPanel.layout}</p>
              </div>

              <div>
                <h4 className="font-bold mb-2">Panel SVG</h4>
                <textarea
                  className="w-full h-32 p-2 border rounded font-mono text-sm mb-4"
                  value={currentPanel.svg || ''}
                  onChange={(e) => onUpdatePanel?.(activePanel, { ...currentPanel, svg: e.target.value })}
                  placeholder="Paste the generated SVG code here..."
                />
                {currentPanel.svg && (
                  <div className="border rounded-lg p-4 bg-white">
                    <div 
                      className="w-full aspect-video"
                      dangerouslySetInnerHTML={{ __html: currentPanel.svg }} 
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Right column: Text content */}
            <div className="space-y-4">
              {/* Comic summary */}
              <div>
                <h4 className="font-bold">Comic Summary</h4>
                <p className="mt-2 p-4 bg-gray-50 rounded font-['Comic_Sans_MS'] text-lg leading-relaxed">
                  {currentPanel.textSummary}
                </p>
              </div>

              {/* Original text */}
              <div>
                <h4 className="font-bold">Original Text</h4>
                <div className="mt-2 p-4 border rounded max-h-[400px] overflow-y-auto">
                  <p className="text-gray-700 leading-relaxed">
                    {currentPanel.originalText}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
