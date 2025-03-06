'use client';

import { useState } from 'react';

interface Panel {
  id: number;
  scene: string;
  characters: string[];
  action: string;
  dialogue?: string;
  layout: string;
  svg?: string;
  textSummary: string;
  originalText: string;
}

interface ComicViewerProps {
  panels: Panel[];
}

export function ComicViewer({ panels }: ComicViewerProps) {
  const [selectedPanel, setSelectedPanel] = useState<number | null>(null);

  const renderSvgPanel = (svg: string) => {
    // Extract viewBox from SVG to maintain aspect ratio
    const viewBoxMatch = svg.match(/viewBox=["']([^"']+)["']/);
    const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 200 200';

    return (
      <div className="relative w-full h-0 pb-[75%]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="w-full h-full"
            dangerouslySetInnerHTML={{
              __html: svg.replace(
                /<svg([^>]*)>/,
                `<svg$1 preserveAspectRatio="xMidYMid meet" style="width: 100%; height: 100%;">`
              )
            }}
          />
        </div>
      </div>
    );
  };

  if (!panels?.length) {
    return <div className="text-gray-500">No panels available to display.</div>;
  }

  return (
    <div className="space-y-8">
      {/* Comic Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold font-['Comic_Sans_MS']">Comic Storyboard</h2>
      </div>

      {/* Comic Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 bg-gray-100 p-8 rounded-lg">
        {panels.map((panel, index) => (
          <div
            key={index}
            onClick={() => setSelectedPanel(selectedPanel === index ? null : index)}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-102 cursor-pointer"
          >
            {/* Panel Number */}
            <div className="bg-gray-800 text-white px-4 py-2 flex justify-between items-center">
              <span className="font-bold">Panel {panel.id}</span>
              {panel.dialogue && (
                <span className="text-sm italic truncate ml-2">{panel.dialogue}</span>
              )}
            </div>

            {/* SVG Content */}
            <div className="p-4 bg-white border-b">
              {panel.svg ? (
                renderSvgPanel(panel.svg)
              ) : (
                <div className="w-full aspect-video bg-gray-100 flex items-center justify-center text-gray-400">
                  No illustration
                </div>
              )}
            </div>

            {/* Panel Text */}
            <div className="p-4">
              <p className="font-['Comic_Sans_MS'] text-lg leading-relaxed">
                {panel.textSummary}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Panel View */}
      {selectedPanel !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedPanel(null)}
        >
          <div
            className="bg-white rounded-lg max-w-4xl w-full overflow-y-auto max-h-[90vh]"
            onClick={e => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-bold">Panel {panels[selectedPanel].id}</h3>
              <button
                onClick={() => setSelectedPanel(null)}
                className="text-white hover:text-gray-300"
              >
                Close
              </button>
            </div>
            <div className="p-6 space-y-6">
              {panels[selectedPanel].svg ? (
                <div className="w-full max-w-3xl mx-auto">
                  {renderSvgPanel(panels[selectedPanel].svg)}
                </div>
              ) : (
                <div className="w-full aspect-video bg-gray-50 flex items-center justify-center text-gray-400">
                  No illustration
                </div>
              )}
              <div className="space-y-4">
                <p className="font-['Comic_Sans_MS'] text-xl">
                  {panels[selectedPanel].textSummary}
                </p>
                {panels[selectedPanel].dialogue && (
                  <p className="italic text-gray-600 text-lg">
                    "{panels[selectedPanel].dialogue}"
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
