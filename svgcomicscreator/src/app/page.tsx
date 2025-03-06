'use client';

import { SVGViewer } from '@/components/SVGViewer';
import { PromptTemplates } from '@/components/PromptTemplates';
import { CharacterGallery } from '@/components/CharacterGallery';
import { useState } from 'react';

import { PanelGallery } from '@/components/PanelGallery';
import { ComicViewer } from '@/components/ComicViewer';

interface Character {
  name: string;
  role: string;
  physical_descriptions?: string[];
  personality_traits?: string[];
  svg?: string;
}

const SAMPLE_CHARACTER_JSON =
{
  "characters": [
    {
      "name": "Gregor Samsa",
      "role": "Protagonist; a traveling salesman who wakes up transformed into a vermin.",
      "physical_descriptions": [
        "Armour-like back",
        "Brown, domed belly divided into stiff sections",
        "Many thin, helpless legs",
        "Lacks proper teeth but has a strong jaw",
        "Secretes brown fluid from his mouth"
      ],
      "personality_traits": [
        "Dutiful and responsible",
        "Anxious about family finances",
        "Initially in denial about his transformation",
        "Persistent and determined",
        "Caring toward his family"
      ],
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\" width=\"200\" height=\"200\">\n  <style>\n    .armor { fill: #6b5b4d; }\n    .belly { fill: #8d744a; }\n    .leg { stroke: #4d4137; }\n    .jaw { fill: #6b5b4d; }\n    .fluid { fill: #6f4e37; }\n  </style>\n\n  <!-- Armored Back -->\n  <path class=\"armor\" d=\"M80 70 Q100 40 120 70 L115 130 Q100 160 85 130 Z\" stroke=\"#4d4137\" stroke-width=\"2\"/>\n\n  <!-- Segmented Belly -->\n  <ellipse class=\"belly\" cx=\"100\" cy=\"110\" rx=\"40\" ry=\"50\"/>\n  <path class=\"armor\" d=\"M60 110 L140 110 M100 60 L100 160\" stroke-width=\"2\"/>\n\n  <!-- Legs -->\n  <g stroke-width=\"4\" stroke-linecap=\"round\">\n    <path class=\"leg\" d=\"M60 120 L40 160 M65 125 L50 165 M70 130 L60 170\"/>\n    <path class=\"leg\" d=\"M140 120 L160 160 M135 125 L150 165 M130 130 L140 170\"/>\n    <path class=\"leg\" d=\"M85 130 L75 170 M95 135 L90 175 M105 135 L110 175 M115 130 L125 170\"/>\n  </g>\n\n  <!-- Head and Jaw -->\n  <g transform=\"translate(100,70)\">\n    <!-- Head -->\n    <path class=\"jaw\" d=\"M-20 0 Q0 -30 20 0 L15 25 Q0 50 -15 25 Z\"/>\n    \n    <!-- Eyes -->\n    <circle cx=\"-10\" cy=\"-5\" r=\"3\" fill=\"#2c3e50\"/>\n    <circle cx=\"10\" cy=\"-5\" r=\"3\" fill=\"#2c3e50\"/>\n    \n    <!-- Fluid Secretion -->\n    <path class=\"fluid\" d=\"M-5 25 Q0 30 5 25 L5 35 Q0 40 -5 35 Z\"/>\n  </g>\n\n  <!-- Anxious Eyebrows -->\n  <path d=\"M85 55 Q90 50 95 55\" stroke=\"#2c3e50\" fill=\"none\"/>\n  <path d=\"M105 55 Q110 50 115 55\" stroke=\"#2c3e50\" fill=\"none\"/>\n</svg>"
    },
    {
      "name": "Mrs. Samsa (Mother)",
      "role": "Gregor's mother; concerned for his well-being.",
      "physical_descriptions": [
        "Disheveled hair when the chief clerk arrives"
      ],
      "personality_traits": [
        "Gentle and nurturing",
        "Emotionally overwhelmed",
        "Quick to panic",
        "Defensive of Gregor's work ethic"
      ],
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\" width=\"200\" height=\"200\">\n  <style>\n    .dress { fill: #6b82a3; }\n    .hair { fill: #5d4c3e; }\n    .skin { fill: #f0d7c6; }\n    .detail { stroke: #2c3e50; stroke-width: 2; fill: none; }\n  </style>\n\n  <!-- Body -->\n  <path class=\"dress\" d=\"M80 140 Q100 200 120 140 L120 180 L80 180 Z\"/>\n\n  <!-- Arms -->\n  <path class=\"detail\" d=\"M70 120 Q60 140 70 160 M130 120 Q140 140 130 160\"/>\n\n  <!-- Head -->\n  <circle class=\"skin\" cx=\"100\" cy=\"90\" r=\"30\"/>\n\n  <!-- Disheveled Hair -->\n  <path class=\"hair\" d=\"M60 70 Q80 50 100 60 Q120 50 140 70 Q130 40 100 35 Q70 40 60 70\"/>\n  <path class=\"hair\" d=\"M80 55 Q90 40 100 45 Q110 40 120 55\" stroke=\"#5d4c3e\" fill=\"none\"/>\n\n  <!-- Facial Features -->\n  <g class=\"detail\">\n    <!-- Worried Eyes -->\n    <path d=\"M85 80 Q90 85 95 80 M105 80 Q110 85 115 80\"/>\n    <!-- Anxious Mouth -->\n    <path d=\"M90 100 Q100 110 110 100\"/>\n    <!-- Wrinkles -->\n    <path d=\"M95 70 Q100 72 105 70\" stroke-width=\"1\"/>\n  </g>\n\n  <!-- Clasped Hands -->\n  <g transform=\"translate(100,150)\">\n    <circle cx=\"-10\" cy=\"0\" r=\"5\" class=\"skin\"/>\n    <circle cx=\"10\" cy=\"0\" r=\"5\" class=\"skin\"/>\n    <path class=\"detail\" d=\"M-5 -3 Q0 5 5 -3\"/>\n  </g>\n\n  <!-- Skirt Details -->\n  <path class=\"detail\" d=\"M90 140 L110 140 M85 160 L115 160\"/>\n</svg>"
    },
    {
      "name": "Mr. Samsa (Father)",
      "role": "Gregor's authoritarian father; later forces him back into his room.",
      "physical_descriptions": [
        "Powerful chest",
        "Uses a stick and newspaper aggressively"
      ],
      "personality_traits": [
        "Authoritative and strict",
        "Impatient and hostile under stress",
        "Prone to emotional outbursts (weeping, aggression)",
        "Protective of family reputation"
      ],
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\" width=\"200\" height=\"200\">\n  <style>\n    .coat { fill: #2c3e50; }\n    .skin { fill: #e4c6aa; }\n    .accent { stroke: #1a2633; stroke-width: 2; }\n    .weapon { stroke: #5d4c3e; }\n    .hair { fill: #3a2e28; }\n  </style>\n\n  <!-- Dominant Stance -->\n  <path class=\"coat\" d=\"M70 50 Q100 30 130 50 L130 160 L70 160 Z\"/>\n\n  <!-- Powerful Torso -->\n  <rect x=\"75\" y=\"60\" width=\"50\" height=\"60\" rx=\"5\" fill=\"#1a2633\"/>\n\n  <!-- Head -->\n  <g transform=\"translate(100,55)\">\n    <circle class=\"skin\" cx=\"0\" cy=\"0\" r=\"25\"/>\n    <!-- Receding Hair -->\n    <path class=\"hair\" d=\"M-20 -10 Q0 -25 20 -10 L15 5 Q0 15 -15 5 Z\"/>\n    <!-- Angry Features -->\n    <g class=\"accent\" stroke-linecap=\"round\">\n      <path d=\"M-12 -8 Q-6 -18 12 -8\" stroke-width=\"3\"/> <!-- Furrowed brow -->\n      <path d=\"M-8 10 Q0 15 8 10\"/> <!-- Frowning mouth -->\n    </g>\n  </g>\n\n  <!-- Aggressive Implements -->\n  <g stroke-width=\"4\">\n    <!-- Raised Stick -->\n    <path class=\"weapon\" d=\"M140 30 L140 110 M135 35 L145 25\"/>\n    <!-- Crumpled Newspaper -->\n    <path class=\"accent\" d=\"M60 100 Q55 95 65 110 T75 120 T85 115 T95 125\" fill=\"none\"/>\n    <path class=\"accent\" d=\"M65 110 L95 110 M68 115 L92 115\"/>\n  </g>\n\n  <!-- Tense Limbs -->\n  <path class=\"accent\" d=\"M65 70 Q40 90 65 110 M135 70 Q160 90 135 110\"/>\n\n  <!-- Authority Stance -->\n  <path class=\"coat\" d=\"M80 160 L80 180 120 180 120 160\"/>\n  <path class=\"accent\" d=\"M85 170 L115 170\"/>\n  \n  <!-- Stress Details -->\n  <path class=\"accent\" d=\"M95 45 Q100 50 105 45\" stroke-width=\"1.5\"/> <!-- Neck vein -->\n  <path class=\"accent\" d=\"M90 75 L90 85 M110 75 L110 85\" stroke-width=\"2\"/> <!-- Button strain -->\n</svg>"
    },
    {
      "name": "Grete Samsa",
      "role": "Gregor's younger sister; shows early compassion for him.",
      "physical_descriptions": [
        "Quickly dressed after waking",
        "Whispers through the door"
      ],
      "personality_traits": [
        "Compassionate and proactive",
        "Sensitive (cries easily)",
        "First to suggest medical help",
        "Collaborates with family decisions"
      ],
      "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\" width=\"200\" height=\"200\">\n  <style>\n    .dress { fill: #88a2b5; }\n    .skin { fill: #f0d7c6; }\n    .hair { fill: #5d4c3e; }\n    .detail { stroke: #2c3e50; stroke-width: 2; fill: none; }\n    .tear { fill: #a3c1dc; }\n  </style>\n\n  <!-- Compassionate Posture -->\n  <path class=\"dress\" d=\"M80 120 Q100 160 120 120 L120 180 L80 180 Z\"/>\n\n  <!-- Leaning Torso -->\n  <rect x=\"90\" y=\"80\" width=\"20\" height=\"40\" rx=\"5\" fill=\"#f0d7c6\"/>\n\n  <!-- Head -->\n  <g transform=\"translate(100,70)\">\n    <circle class=\"skin\" cx=\"0\" cy=\"0\" r=\"25\"/>\n    \n    <!-- Messy Morning Hair -->\n    <path class=\"hair\" d=\"M-25 -15 Q0 -30 25 -15 L20 0 Q0 10 -20 0 Z\"/>\n    \n    <!-- Worried Face -->\n    <g class=\"detail\">\n      <!-- Tearful Eyes -->\n      <circle cx=\"-12\" cy=\"-5\" r=\"4\"/>\n      <circle cx=\"12\" cy=\"-5\" r=\"4\"/>\n      <path class=\"tear\" d=\"M-10 5 Q-12 8 -10 10 M10 5 Q12 8 10 10\"/>\n      \n      <!-- Concerned Mouth -->\n      <path d=\"M-8 15 Q0 20 8 15\"/>\n    </g>\n  </g>\n\n  <!-- Active Arms -->\n  <g class=\"detail\" stroke-linecap=\"round\">\n    <!-- Whispering Hand -->\n    <path d=\"M120 90 Q140 70 150 90\"/>\n    <path d=\"M150 90 L145 100 L155 100\"/>\n    \n    <!-- Helping Hand -->\n    <path d=\"M80 90 Q60 110 50 100\"/>\n    <path d=\"M50 100 L45 95 L55 95\"/>\n  </g>\n\n  <!-- Quick-Dressed Details -->\n  <path class=\"detail\" d=\"M95 100 L105 100 M90 140 L110 140\"/>\n  \n  <!-- Anxious Legs -->\n  <path class=\"detail\" d=\"M95 180 L95 190 M105 180 L105 190\"/>\n</svg>"
    },

  ]
};

const SAMPLE_PANEL_JSON ={
  "panels": [
    {
      "id": 1,
      "scene": "Dim bedroom, unsettling morning light",
      "characters": ["Gregor Samsa"],
      "action": "Gregor awakens transformed into a giant insect",
      "layout": "Close-up of insect eye reflecting window light",
      "textSummary": "Gregor wakes up as a giant bug, confused by his armored back and wiggling legs",
      "originalText": "One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked."
    },
    {
      "id": 2,
      "scene": "Same bedroom, tense atmosphere",
      "characters": ["Gregor Samsa"],
      "action": "Gregor tries to roll over but can't control his body",
      "dialogue": "\"How about if I sleep a little bit longer and forget all this nonsense\"",
      "layout": "Low angle showing insect body struggling against bedsheets",
      "textSummary": "Gregor tries to move but fails, realizing this isn't a dream",
      "originalText": "However hard he threw himself onto his right, he always rolled back to where he was. He must have tried it a hundred times, shut his eyes so that he wouldn’t have to look at the floundering legs, and only stopped when he began to feel a mild, dull pain there that he had never felt before."
    },
    {
      "id": 3,
      "scene": "Bedroom door, morning light",
      "characters": ["Gregor Samsa", "Mother", "Father", "Sister"],
      "action": "Family members knock on Gregor's door",
      "dialogue": "\"Gregor, open the door, I beg of you!\"",
      "layout": "Split panel showing insect Gregor by bed and family shadows under door",
      "textSummary": "The family discovers Gregor still home and demands he open the door",
      "originalText": "There was a cautious knock at the door near his head. 'Gregor', somebody called—it was his mother—'it’s quarter to seven. Didn’t you want to go somewhere?'... His father came knocking at one of the side doors, gently, but with his fist. 'Gregor, Gregor', he called, 'what’s wrong?'... His sister whispered: 'Gregor? Aren’t you well? Do you need anything?'"
    },
    {
      "id": 4,
      "scene": "Bedroom interior, tense atmosphere",
      "characters": ["Gregor Samsa", "Chief Clerk"],
      "action": "Gregor speaks through door to suspicious chief clerk",
      "dialogue": "\"I’m slightly unwell... I’m getting up now!\"",
      "layout": "Over-the-shoulder view of insect Gregor facing closed door",
      "textSummary": "Gregor tries to reassure the angry chief clerk through the door",
      "originalText": "\"But Sir\", called Gregor... \"I’ll open up immediately, just a moment. I’m slightly unwell, an attack of dizziness, I haven’t been able to get up... I’m getting up now.\""
    }

  ]
};

export default function Home() {
  const [svgInput, setSvgInput] = useState('<svg viewBox="0 0 100 100"><rect x="20" y="20" width="60" height="60" fill="#059669"/></svg>');
  const [characterJson, setCharacterJson] = useState(JSON.stringify(SAMPLE_CHARACTER_JSON, null, 2));
  const [bookText, setBookText] = useState(`One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked.

“What’s happened to me?” he thought. It wasn’t a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls. A collection of textile samples lay spread out on the table—Samsa was a travelling salesman—and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame. It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer.
`);

  const [panelJson, setPanelJson] = useState(JSON.stringify(SAMPLE_PANEL_JSON, null, 2));

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

  const parsePanels = (jsonString: string) => {
    try {
      const data = JSON.parse(jsonString);
      return data?.panels || [];
    } catch (e) {
      return [];
    }
  };

  const handleUpdatePanel = (index: number, updatedPanel: any) => {
    try {
      const currentPanels = parsePanels(panelJson);
      currentPanels[index] = updatedPanel;
      setPanelJson(JSON.stringify({ panels: currentPanels }, null, 2));
    } catch (e) {
      console.error('Failed to update panel:', e);
    }
  };

  const handlePanelJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPanelJson(e.target.value);
  };

  return (
    <div className="p-4 max-w-6xl mx-auto space-y-8">
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
        characters={parseCharacters(characterJson).characters} onUpdateCharacter={handleUpdateCharacter}
      />

      <div className="border-t pt-8">
        <h2 className="text-2xl font-bold mb-4">Panel Editor</h2>
        <div className="mb-4">
          <h3 className="text-lg mb-2">Panel JSON Input</h3>
          <textarea
            className="w-full h-48 p-2 border rounded font-mono text-sm"
            value={panelJson}
            onChange={handlePanelJsonChange}
            placeholder="Paste your panel JSON here..."
          />
        </div>

        <PanelGallery 
          panels={parsePanels(panelJson)}
          characters={parseCharacters(characterJson).characters}
          onUpdatePanel={handleUpdatePanel}
        />

        <ComicViewer panels={parsePanels(panelJson)} />
      </div>

      {/* <SVGViewer initialSvg={svgInput} /> */}
    </div>
  );
}
