import React, { useEffect, useRef, useState } from 'react';
import type { Phase, Planet, ZanianTime, CelestialBody, Star, Moon } from './types';
import { Clock } from './Clock';
import { Calendar } from './Calendar';
import { Modal } from './Modal';

export const yearDuration = 782;
export const dayDuration = 36;
export const phases: Phase[] = [
  { name: 'Phase 1 (P1)', color: 'Purple', days: 118 },
  { name: 'Blue Phase (B)', color: 'Blue', days: 150 },
  { name: 'Phase 2 (P2)', color: 'Purple', days: 116 },
  { name: 'Phase 3 (P3)', color: 'Purple', days: 118 },
  { name: 'Red Phase (R)', color: 'Red', days: 162 },
  { name: 'Phase 4 (P4)', color: 'Purple', days: 116 },
];

const stars: Star[] = [
  { 
    name: 'Spica', 
    color: '#87CEFA', 
    x: -50, y: 0, 
    radius: 20,
    description: "A brilliant blue star, one of the two suns in the Redo system. Its light is crucial during Zan's Blue Phase, allowing for safe travel across the Hades Ocean.",
    details: [
      { label: 'Type', value: 'Blue Giant' },
      { label: 'Luminosity', value: 'High' },
    ]
  },
  { 
    name: 'Antares', 
    color: '#FF4500', 
    x: 50, y: 0, 
    radius: 20,
    description: "A radiant red supergiant, the second sun in the system. It dominates the sky during Zan's Red Phase. Rak, leader of the Natural Born, has formed a cult devoted to its destruction.",
    details: [
      { label: 'Type', value: 'Red Supergiant' },
      { label: 'Luminosity', value: 'Variable' },
    ]
  },
];

const planets: Planet[] = [
      { 
        name: 'Zan', 
        color: '#6A0DAD', 
        orbitScale: 150, 
        orbitSpeed: 1, 
        moons: [
          { 
            name: 'Agape', 
            parentPlanet: 'Zan',
            color: '#DC143C',
            radius: 4,
            description: "Home to the red-skinned Agape tribe. They worship the red sun Antares and often find themselves in conflict with the Death Zanians.", 
            details: [
              { label: 'Skin Color', value: 'Red' },
              { label: 'Avg. Lifespan', value: '100 years' },
              { label: 'Worships', value: 'Antares (Red Sun)' },
              { label: 'Rivals', value: 'Death Zanians' },
            ] 
          },
          { 
            name: 'Ales', 
            parentPlanet: 'Zan',
            color: '#228B22',
            radius: 4,
            description: "The green-skinned Ales are a proud, self-reliant tribe who worship their own moon. They are known for their rivalry with the Death Zanians.", 
            details: [
              { label: 'Skin Color', value: 'Green' },
              { label: 'Avg. Lifespan', value: '125 years' },
              { label: 'Worships', value: 'Self (Moon)' },
              { label: 'Rivals', value: 'Death Zanians' },
            ] 
          },
          { 
            name: 'Alyx', 
            parentPlanet: 'Zan',
            color: '#ADD8E6',
            radius: 4,
            description: "The Alyx are a peaceful, blue-skinned tribe devoted to the blue sun, Spica. They are unique in that they hold no rivalries.", 
            details: [
              { label: 'Skin Color', value: 'Blue' },
              { label: 'Avg. Lifespan', value: '62 years' },
              { label: 'Worships', value: 'Spica (Blue Sun)' },
              { label: 'Rivals', value: 'None' },
            ] 
          },
          { 
            name: 'Andel', 
            parentPlanet: 'Zan',
            color: '#8A2BE2',
            radius: 4,
            description: "The long-lived, purple-skinned Andel tribe worships the 'GOD' recreation unit. Like most moon tribes, they are rivals with the Death Zanians.", 
            details: [
              { label: 'Skin Color', value: 'Purple' },
              { label: 'Avg. Lifespan', value: '130 years' },
              { label: 'Worships', value: 'GOD (Recreation Unit)' },
              { label: 'Rivals', value: 'Death Zanians' },
            ] 
          },
        ], 
        moonScale: 20,
        description: "Zan, also known as Death, is the cradle of a new civilization founded by humanity after the destruction of Earth. Its surface is dominated by the vast Hades Ocean and a continent divided into two regions: the technologically advanced Zan region (led by God) and the rugged Death region (led by Rak).",
        details: [
          { label: 'Orbital Period', value: '782 days (36-hour days)' },
          { label: 'Origin', value: 'Settled in 2998 post-Earth' },
          { label: 'Population', value: 'Cloned & Natural Born Humans' },
          { label: 'Major Races', value: '7 major races' },
          { label: 'Regional Cycles', value: 'Zan (P1, B, P2), Death (P3, R, P4)'},
        ]
      },
      { 
        name: 'Casa', 
        color: '#3A86FF', 
        orbitScale: 200, 
        orbitSpeed: 0.87, 
        moons: [], 
        moonScale: 25, 
        twinOffset: 0,
        description: "A 'twin planet' to Judo, similar in size and appearance. Its bioforms are yet to be discovered by explorers.",
        details: [
            { label: 'Status', value: 'Bioforms undiscovered' },
            { label: 'Moons', value: '3 (unnamed)' },
            { label: 'Exploration', value: 'Investigated by Zanians' },
        ]
      },
      { 
        name: 'Judo', 
        color: '#FFC107', 
        orbitScale: 200, 
        orbitSpeed: 0.87, 
        moons: [], 
        moonScale: 0, 
        twinOffset: 1.5,
        description: "A 'twin planet' to Casa, currently with no known life forms or moons. A barren but intriguing world.",
        details: [
            { label: 'Status', value: 'No known life forms' },
            { label: 'Moons', value: '0' },
            { label: 'Exploration', value: 'Investigated by Zanians' },
        ]
      },
      { 
        name: 'Flack', 
        color: '#A0A0A0', 
        orbitScale: 300, 
        orbitSpeed: 0.71, 
        moons: [], 
        moonScale: 0,
        description: "The smallest and most distant planet in the system. A cold, inhospitable rock with no moons.",
        details: [
            { label: 'Status', value: 'Inhospitable for life' },
            { label: 'Moons', value: '0' },
            { label: 'Size', value: 'Smallest in the system' },
        ]
      },
];

const factions = [
    {
      name: "The Zan Zanians (Cloned)",
      description: "Led by GOD, the cloned society of the Zan Region prioritizes knowledge and order. Their control over the planet's official currency, the Lumin, and their advanced technology gives them immense economic power, but their sheltered existence has left them unprepared for the raw brutality of the Death Zanians.",
      characters: [
        { 
          name: "Commander Kael", 
          role: "Supreme Commander of the Zan Legion", 
          backstory: "A brilliant tactician, Kael is torn between his loyalty to GOD's peaceful philosophy and the grim necessity of war. He believes clones are the future but secretly fears their inexperience in true combat could lead to their extinction. His pragmatism often clashes with the idealism of his peers, making him a lonely but vital leader." 
        },
        { 
          name: "Dr. Elara", 
          role: "Head Scientist of Project Recreation", 
          backstory: "The chief architect of the modern cloning process, Elara views every clone as her child. Horrified by the conflict, she works on a secret project to bridge the genetic gap between the Cloned and Natural Born, hoping a biological solution can end the war her 'children' are forced to fight." 
        }
      ]
    },
    {
      name: "The Death Zanians (Natural Born)",
      description: "United by RAK, the Death Zanians are a proud, hardy people who value strength and instinct. Hardened by the rugged Death Region, they reject the clones' digital currency and rely on a barter economy. They see the clones as unnatural abominations and their economic control as a form of tyranny.",
      characters: [
        { 
          name: "War-Chief Grak", 
          role: "Commander of the Sun Eaters", 
          backstory: "RAK's most brutal and loyal follower, Grak is the embodiment of the Natural Born's rage. He lost his family to a plague the clones were immune to, fueling a deep-seated hatred. He enforces RAK's will with an iron fist and is the primary antagonist on the battlefield." 
        },
        { 
          name: "Mara", 
          role: "Civilian Scavenger", 
          backstory: "A young woman who cares for her ailing younger brother. Mara doesn't believe in RAK's crusade but follows along to survive. When her brother's condition worsens, she realizes the only cure lies in the advanced technology of the Zan Region, forcing her to question her loyalties and risk everything for family." 
        }
      ]
    },
    {
        name: "The Moon Coalition",
        description: "The four moon tribes—Agape, Ales, Alyx, and Andel—are culturally distinct and historically divided. They are forced to trade their unique natural resources for the Zan Zanians' technology and Lumin, creating an uneasy economic dependence that fuels their desire for unity and autonomy.",
        characters: [
            {
                name: "Chieftain Zorgan",
                role: "Leader of the Agape Tribe",
                backstory: "A fiery and traditional warrior who respects only strength. Initially, he sees RAK as a powerful ally who can elevate his people. However, as he witnesses RAK's cruelty and recklessness, he faces a crisis of honor, forcing him to reconsider his allegiance for the good of all moon tribes."
            },
            {
                name: "Lyra",
                role: "Agape Scout & Zorgan's Daughter",
                backstory: "A skilled scout and diplomat in the making, Lyra witnesses RAK's treachery firsthand during a supposedly peaceful negotiation. Disobeying her father, she embarks on a dangerous mission to unite the fractured moon tribes, serving as the narrative's hero and driving force for the coalition."
            },
            {
                name: "High Priest Valerius",
                role: "Spiritual Leader of the Andel Tribe",
                backstory: "A devout follower of the 'GOD' unit's teachings of peace and knowledge. The war tests his faith to its limits, as he must reconcile his pacifist beliefs with the need to defend his people. His struggle represents the soul of the Moon Coalition, torn between old traditions and new, violent realities."
            }
        ]
    },
    {
        name: "The Hades Zanians",
        description: "The enigmatic, original bioforms of Zan, the Hades Zanians dwell in the deepest trenches of the Hades Ocean. Self-sufficient and possessing unparalleled control over water, they have no need for the surface-dwellers' currency. Their formidable Trident Guard enforces their isolation, but the surface war now threatens to pollute their sacred waters.",
        characters: [
            {
                name: "The Tide-Speaker",
                role: "Oracle and Leader",
                backstory: "An ancient and mysterious being who communicates through psychic ripples in the water. The Tide-Speaker has watched civilizations rise and fall. The escalating conflict above, particularly RAK's plan to destroy a sun, threatens the planet's ecological balance, forcing the Tide-Speaker to consider intervening—an act that would change the course of the war forever."
            }
        ]
    }
];


type ViewAngle = 'top' | 'perspective' | 'side';

const getZanianTime = (startTime: number, timeScaleFactor: number): ZanianTime => {
    const elapsedMilliseconds = (Date.now() - startTime) * timeScaleFactor;
    
    const totalZanianSeconds = elapsedMilliseconds / 1000;
    const totalZanianHours = totalZanianSeconds / 3600;
    const totalZanianDays = totalZanianHours / dayDuration;

    const currentDayOfYear = Math.floor(totalZanianDays % yearDuration) + 1;
    
    const dayProgress = totalZanianDays - Math.floor(totalZanianDays);
    
    let hours = Math.floor(dayProgress * dayDuration);
    let minutes = Math.floor((dayProgress * dayDuration * 60) % 60);
    let seconds = Math.floor((dayProgress * dayDuration * 3600) % 60);
    
    let currentPhase = phases[0];
    let dayCounter = 0;
    for (const phase of phases) {
        if (currentDayOfYear > dayCounter && currentDayOfYear <= dayCounter + phase.days) {
            currentPhase = phase;
            break;
        }
        dayCounter += phase.days;
    }

    return {
        day: currentDayOfYear,
        phase: currentPhase.name,
        time: `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    };
};

const App: React.FC = () => {
  const orbitCanvasRef = useRef<HTMLCanvasElement>(null);
  const internalCanvasRef = useRef<HTMLCanvasElement>(null);
  const sphereCanvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const [selectedObject, setSelectedObject] = useState<CelestialBody | null>(() => {
    const zan = planets.find(p => p.name === 'Zan');
    return zan ? { ...zan, type: 'planet' } : null;
  });
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [zanianTime, setZanianTime] = useState<ZanianTime>({ day: 1, phase: 'Phase 1 (P1)', time: '00:00:00' });
  const appStartTime = useRef(Date.now());
  const rotationRef = useRef({ y: 0 });
  
  const [isSimulating, setIsSimulating] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [viewAngle, setViewAngle] = useState<ViewAngle>('top');
  const isPanningRef = useRef(false);
  const lastPanPosRef = useRef({ x: 0, y: 0 });
  const didPanRef = useRef(false);
  const [expandedCharacter, setExpandedCharacter] = useState<string | null>(null);

  const handleCharacterClick = (name: string) => {
    setExpandedCharacter(expandedCharacter === name ? null : name);
  };

  useEffect(() => {
    const timeScaleFactor = 3600; // Speeds up time for demonstration
    const timer = setInterval(() => {
        setZanianTime(getZanianTime(appStartTime.current, timeScaleFactor));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const orbitCanvas = orbitCanvasRef.current;
    const internalCanvas = internalCanvasRef.current;
    const sphereCanvas = sphereCanvasRef.current;

    if (!orbitCanvas || !internalCanvas || !sphereCanvas) return;

    const orbitCtx = orbitCanvas.getContext('2d');
    const internalCtx = internalCanvas.getContext('2d');
    const sphereCtx = sphereCanvas.getContext('2d');
    
    if (!orbitCtx || !internalCtx || !sphereCtx) return;
    
    let orbitWidth: number, orbitHeight: number;
    let internalWidth: number, internalHeight: number;
    let sphereWidth: number, sphereHeight: number;
    
    const textureCanvas = document.createElement('canvas');
    textureCanvas.width = 1024;
    textureCanvas.height = 512;

    const generateTexture = (object: CelestialBody | null, canvas: HTMLCanvasElement): void => {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if (!object || object.type === 'star') return;

        const drawCraters = (count: number, baseColor: string) => {
             for (let i = 0; i < count; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const r = Math.random() * 20 + 5;
                const grad = ctx.createRadialGradient(x - r * 0.2, y - r * 0.2, r * 0.1, x, y, r);
                grad.addColorStop(0, 'rgba(0,0,0,0)');
                grad.addColorStop(0.8, 'rgba(0,0,0,0.4)');
                grad.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2);
                ctx.fill();
            }
        };

        switch (object.name) {
            case 'Zan':
                 const textureCtx = textureCanvas.getContext('2d');
                 if(!textureCtx) return;
                  textureCtx.fillStyle = '#1A5F7A';
                  textureCtx.fillRect(0, 0, textureCanvas.width, textureCanvas.height);
                  const drawVegetation = (regionX: number, regionWidth: number) => {
                      textureCtx.fillStyle = '#2E8B57';
                      for (let i = 0; i < 150; i++) {
                          const x = regionX + Math.random() * regionWidth;
                          const y = Math.random() * textureCanvas.height;
                          const radius = Math.random() * 1.5 + 0.5;
                          textureCtx.beginPath();
                          textureCtx.arc(x, y, radius, 0, Math.PI * 2);
                          textureCtx.fill();
                      }
                  };
                  textureCtx.beginPath();
                  textureCtx.moveTo(350, 0);
                  textureCtx.bezierCurveTo(250, 150, 450, 350, 350, 512);
                  textureCtx.lineTo(674, 512);
                  textureCtx.bezierCurveTo(774, 350, 574, 150, 674, 0);
                  textureCtx.closePath();
                  textureCtx.save();
                  textureCtx.clip();
                  textureCtx.fillStyle = '#6A0DAD';
                  textureCtx.fillRect(0, 0, 512, 512);
                  drawVegetation(0, 512);
                  textureCtx.fillStyle = '#333333';
                  textureCtx.fillRect(512, 0, 512, 512);
                  drawVegetation(512, 512);
                  textureCtx.restore();
                break;
            case 'Casa':
                ctx.fillStyle = object.color;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                for (let i = 0; i < 50; i++) {
                    ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.2 + 0.1})`;
                    ctx.beginPath();
                    ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 80 + 20, 0, Math.PI * 2);
                    ctx.fill();
                }
                break;
            case 'Judo':
            case 'Flack':
                ctx.fillStyle = object.color;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                drawCraters(object.name === 'Judo' ? 100 : 150, object.color);
                break;
            case 'Agape':
            case 'Ales':
            case 'Alyx':
            case 'Andel':
                ctx.fillStyle = object.color;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                drawCraters(80, object.color);
                break;
            default:
                 ctx.fillStyle = (object as Planet | Moon).color || '#555';
                 ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    };
    
    const drawCrossSectionView = (object: CelestialBody | null, ctx: CanvasRenderingContext2D, width: number, height: number) => {
        const titleEl = document.getElementById('cross-section-title');
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, width, height);

        if (!object) {
            ctx.fillStyle = '#666';
            ctx.textAlign = 'center';
            ctx.font = '16px sans-serif';
            ctx.fillText('Select a celestial body to view.', width / 2, height / 2);
            if(titleEl) titleEl.textContent = 'Geographical Layout';
            return;
        }

        if(titleEl) titleEl.textContent = object.type === 'star' ? 'Internal Structure' : 'Geographical Layout';

        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) * 0.4;

        switch (object.type) {
            case 'star':
                ctx.strokeStyle = 'white';
                ctx.fillStyle = 'white';
                ctx.font = '14px sans-serif';
                ctx.textAlign = 'center';
                ctx.fillStyle = 'yellow';
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius * 0.25, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeText('Core', centerX, centerY);
                ctx.strokeStyle = 'orange';
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius * 0.7, 0, Math.PI * 2);
                ctx.stroke();
                ctx.strokeText('Radiative Zone', centerX, centerY - radius * 0.45);
                ctx.strokeStyle = 'red';
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
                ctx.stroke();
                ctx.strokeText('Convective Zone', centerX, centerY - radius * 0.85);
                break;
            case 'planet':
                 if (object.name === 'Zan') {
                    internalCtx.fillStyle = '#1A5F7A';
                    internalCtx.beginPath();
                    internalCtx.arc(centerX, centerY, radius, 0, Math.PI * 2);
                    internalCtx.fill();
                    const continentPath = new Path2D();
                    continentPath.arc(centerX, centerY, radius, 0, Math.PI * 2);
                    internalCtx.save();
                    internalCtx.clip(continentPath);
                    internalCtx.beginPath();
                    internalCtx.moveTo(centerX - radius * 0.6, 0);
                    internalCtx.bezierCurveTo(centerX + radius * 0.2, height / 2, centerX - radius * 0.2, height / 2, centerX + radius * 0.6, height);
                    internalCtx.lineTo(centerX - radius, height);
                    internalCtx.lineTo(centerX - radius, 0);
                    internalCtx.closePath();
                    internalCtx.fillStyle = '#6A0DAD';
                    internalCtx.fill();
                    internalCtx.fillStyle = '#333333';
                    internalCtx.beginPath();
                    internalCtx.moveTo(centerX + radius * 0.6, 0);
                    internalCtx.bezierCurveTo(centerX - radius * 0.2, height / 2, centerX + radius * 0.2, height/2, centerX - radius * 0.6, height);
                    internalCtx.lineTo(centerX + radius, height);
                    internalCtx.lineTo(centerX + radius, 0);
                    internalCtx.closePath();
                    internalCtx.fill();
                    for(let i=0; i<300; i++){
                        const x = (Math.random() * radius * 2) + (centerX - radius);
                        const y = (Math.random() * radius * 2) + (centerY - radius);
                        if (Math.sqrt((x-centerX)**2 + (y-centerY)**2) < radius) {
                            internalCtx.fillStyle = '#2E8B57';
                            internalCtx.beginPath();
                            internalCtx.arc(x,y, Math.random() * 1.5, 0, Math.PI * 2);
                            internalCtx.fill();
                        }
                    }
                    internalCtx.restore();
                    internalCtx.fillStyle = 'white';
                    internalCtx.font = '14px sans-serif';
                    internalCtx.textAlign = 'center';
                    internalCtx.fillText('Zan Region', centerX - 60, centerY);
                    internalCtx.fillText('Death Region', centerX + 60, centerY);
                } else {
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
                    ctx.fillStyle = object.color;
                    ctx.fill();
                    ctx.fillStyle = 'rgba(0,0,0,0.2)';
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, radius * 0.9, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.fillStyle = 'rgba(255,255,100,0.4)';
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, radius * 0.4, 0, Math.PI * 2);
                    ctx.fill();
                }
                break;
            case 'moon':
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
                ctx.fillStyle = object.color;
                ctx.fill();
                ctx.fillStyle = 'rgba(0,0,0,0.2)';
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius * 0.9, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = 'rgba(150,150,150,0.4)';
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius * 0.4, 0, Math.PI * 2);
                ctx.fill();
                break;
        }
    };

    const drawSphereView = (object: CelestialBody | null, ctx: CanvasRenderingContext2D, width: number, height: number) => {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, width, height);

        if (!object) {
            ctx.fillStyle = '#666';
            ctx.textAlign = 'center';
            ctx.font = '16px sans-serif';
            ctx.fillText('Select a celestial body to view.', width / 2, height / 2);
            return;
        }

        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) * 0.4;
        
        if (object.type === 'star') {
            const grad = ctx.createRadialGradient(centerX, centerY, radius * 0.1, centerX, centerY, radius);
            grad.addColorStop(0, 'white');
            grad.addColorStop(0.5, object.color);
            grad.addColorStop(1, 'rgba(0,0,0,0)');
            
            ctx.fillStyle = object.color;
            ctx.shadowColor = object.color;
            ctx.shadowBlur = 30;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            ctx.fill();
            ctx.shadowBlur = 0;
            
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            ctx.fill();
        } else {
             for (let i = 0; i < width; i++) {
                const x = i - centerX;
                if (x * x < radius * radius) {
                    const y = Math.sqrt(radius * radius - x * x);
                    const textureX = (Math.atan2(x, Math.sqrt(radius * radius - x * x - 1)) / (2 * Math.PI) + 0.5 + rotationRef.current.y / (2 * Math.PI)) * textureCanvas.width;
                    ctx.drawImage(textureCanvas, textureX, 0, 1, textureCanvas.height, i, centerY - y, 1, 2 * y);
                }
            }
            const gradient = ctx.createRadialGradient(centerX - radius * 0.3, centerY - radius * 0.3, radius * 0.1, centerX, centerY, radius);
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0.5)');
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            ctx.fill();
        }
    };
    
    generateTexture(selectedObject, textureCanvas);

    const resizeCanvases = () => {
      orbitWidth = orbitCanvas.width = orbitCanvas.clientWidth;
      orbitHeight = orbitCanvas.height = orbitCanvas.clientHeight;
      internalWidth = internalCanvas.width = internalCanvas.clientWidth;
      internalHeight = internalCanvas.height = internalCanvas.clientHeight;
      sphereWidth = sphereCanvas.width = sphereCanvas.clientWidth;
      sphereHeight = sphereCanvas.height = sphereCanvas.clientHeight;
      drawCrossSectionView(selectedObject, internalCtx, internalWidth, internalHeight);
    };

    window.addEventListener('resize', resizeCanvases);
    
    const timeScale = 0.0005;
    
    const minOrbitScale = Math.min(...planets.map(p => p.orbitScale));
    const maxOrbitScale = Math.max(...planets.map(p => p.orbitScale));
    const minAlpha = 0.65;
    const maxAlpha = 1.0;

    const project = (x: number, y: number, z: number = 0) => {
      let projX = x;
      let projY = y;
      let scaleFactor = 1;

      if (viewAngle === 'perspective') {
        const angle = 45 * Math.PI / 180;
        const fov = orbitWidth;
        const rotatedY = y * Math.cos(angle) - z * Math.sin(angle);
        const rotatedZ = y * Math.sin(angle) + z * Math.cos(angle);
        const perspective = fov / (fov + rotatedZ);
        projX = x * perspective;
        projY = rotatedY * perspective;
        scaleFactor = perspective;
      } else if (viewAngle === 'side') {
        projY = z;
      }
      return { x: projX, y: projY, scale: scaleFactor };
    };

    const handleOrbitMouseDown = (event: MouseEvent) => {
        isPanningRef.current = true;
        lastPanPosRef.current = { x: event.clientX, y: event.clientY };
        didPanRef.current = false;
    };

    const handleOrbitMouseUp = (event: MouseEvent) => {
        isPanningRef.current = false;
        if (!didPanRef.current) {
            const rect = orbitCanvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const canvasX = (x - orbitWidth / 2 - pan.x) / zoom;
            const canvasY = (y - orbitHeight / 2 - pan.y) / zoom;
            
            let clickedObject: CelestialBody | null = null;
            const time = Date.now() * timeScale;
            
            for (const p of planets) {
                const planetScale = p.orbitScale * Math.min(orbitWidth, orbitHeight) / 800;
                const planetT = (time * p.orbitSpeed) + (p.twinOffset || 0);
                const planetX = planetScale * Math.sin(planetT);
                const planetY = planetScale * Math.sin(planetT) * Math.cos(planetT);
                const moonOrbitRadius = 15;
                const moonClickRadius = 5;
                for (let i = 0; i < p.moons.length; i++) {
                    const moon = p.moons[i];
                    const moonAngle = (time * 2 + i * (Math.PI * 2 / p.moons.length));
                    const moonX = planetX + moonOrbitRadius * Math.cos(moonAngle);
                    const moonY = planetY + moonOrbitRadius * Math.sin(moonAngle);
                    
                    const { x: projMoonX, y: projMoonY, scale: projMoonScale } = project(moonX, moonY);
                    const distance = Math.sqrt(Math.pow(canvasX - projMoonX, 2) + Math.pow(canvasY - projMoonY, 2));
                    
                    if (distance < (moonClickRadius * projMoonScale) / zoom) {
                        clickedObject = { ...moon, type: 'moon' };
                        break;
                    }
                }
                if (clickedObject) break;
            }

            if (!clickedObject) {
                const planetClickRadius = 15;
                for (let i = planets.length - 1; i >= 0; i--) {
                    const p = planets[i];
                    const scale = p.orbitScale * Math.min(orbitWidth, orbitHeight) / 800;
                    const t = (time * p.orbitSpeed) + (p.twinOffset || 0);
                    const planetX = scale * Math.sin(t);
                    const planetY = scale * Math.sin(t) * Math.cos(t);

                    const { x: projPlanetX, y: projPlanetY, scale: projPlanetScale } = project(planetX, planetY);
                    const distance = Math.sqrt(Math.pow(canvasX - projPlanetX, 2) + Math.pow(canvasY - projPlanetY, 2));

                    if (distance < (planetClickRadius * projPlanetScale) / zoom) {
                        clickedObject = { ...p, type: 'planet' };
                        break;
                    }
                }
            }
            
            if (!clickedObject) {
                for (const star of stars) {
                    const { x: projStarX, y: projStarY, scale: projStarScale } = project(star.x, star.y);
                    const distance = Math.sqrt(Math.pow(canvasX - projStarX, 2) + Math.pow(canvasY - projStarY, 2));
                    if (distance < (star.radius * projStarScale) / zoom) {
                        clickedObject = { ...star, type: 'star' };
                        break;
                    }
                }
            }
            setSelectedObject(clickedObject);
        }
    };

    const handleOrbitMouseMove = (event: MouseEvent) => {
        if (!isPanningRef.current) return;
        
        const dx = event.clientX - lastPanPosRef.current.x;
        const dy = event.clientY - lastPanPosRef.current.y;

        if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
            didPanRef.current = true;
        }

        setPan(prevPan => ({ x: prevPan.x + dx, y: prevPan.y + dy }));
        lastPanPosRef.current = { x: event.clientX, y: event.clientY };
    };

    const handleOrbitMouseLeave = () => { isPanningRef.current = false; };

    const handleWheel = (event: WheelEvent) => {
        event.preventDefault();
        const delta = event.deltaY > 0 ? -0.1 : 0.1;
        setZoom(prevZoom => Math.max(0.5, Math.min(prevZoom + delta * prevZoom, 5)));
    };

    orbitCanvas.addEventListener('mousedown', handleOrbitMouseDown);
    orbitCanvas.addEventListener('mouseup', handleOrbitMouseUp);
    orbitCanvas.addEventListener('mousemove', handleOrbitMouseMove);
    orbitCanvas.addEventListener('mouseleave', handleOrbitMouseLeave);
    orbitCanvas.addEventListener('wheel', handleWheel);

    let isSphereDragging = false;
    let previousSphereMouseX = 0;
    
    const handleSphereMouseDown = (e: MouseEvent) => {
        if (selectedObject?.type === 'star') return;
        isSphereDragging = true;
        previousSphereMouseX = e.clientX;
    };
    const handleSphereMouseUp = () => { isSphereDragging = false; };
    const handleSphereMouseLeave = () => { isSphereDragging = false; };
    const handleSphereMouseMove = (e: MouseEvent) => {
        if (!isSphereDragging || !selectedObject || selectedObject.type === 'star') return;
        const deltaX = e.clientX - previousSphereMouseX;
        rotationRef.current.y += deltaX * 0.005;
        previousSphereMouseX = e.clientX;
    };
    
    sphereCanvas.addEventListener('mousedown', handleSphereMouseDown);
    sphereCanvas.addEventListener('mouseup', handleSphereMouseUp);
    sphereCanvas.addEventListener('mouseleave', handleSphereMouseLeave);
    sphereCanvas.addEventListener('mousemove', handleSphereMouseMove);

    const animate = () => {
      orbitCtx.fillStyle = '#000000';
      orbitCtx.fillRect(0, 0, orbitWidth, orbitHeight);

      orbitCtx.save();
      orbitCtx.translate(orbitWidth / 2, orbitHeight / 2);
      
      orbitCtx.translate(pan.x, pan.y);
      orbitCtx.scale(zoom, zoom);

      orbitCtx.lineWidth = 1 / zoom;

      planets.forEach(p => {
        const pathAlpha = 0.15 - ((p.orbitScale - minOrbitScale) / (maxOrbitScale - minOrbitScale)) * 0.1;
        orbitCtx.strokeStyle = `rgba(255, 255, 255, ${pathAlpha})`;
        orbitCtx.beginPath();
        const scale = p.orbitScale * Math.min(orbitWidth, orbitHeight) / 800;
        for (let t = 0; t < Math.PI * 2; t += 0.01) {
          const x = scale * Math.sin(t);
          const y = scale * Math.sin(t) * Math.cos(t);
          const { x: projX, y: projY } = project(x, y);
          if (t === 0) {
            orbitCtx.moveTo(projX, projY);
          } else {
            orbitCtx.lineTo(projX, projY);
          }
        }
        orbitCtx.closePath();
        orbitCtx.stroke();
      });

      const celestialObjects: {x:number, y:number, z: number, draw: ()=>void}[] = [];
      
      stars.forEach(star => {
          celestialObjects.push({ x: star.x, y: star.y, z: 0, draw: () => {
                const { x: projX, y: projY, scale: projScale } = project(star.x, star.y);
                const r = star.radius * projScale / zoom;
                orbitCtx.beginPath();
                orbitCtx.arc(projX, projY, r, 0, Math.PI * 2);
                orbitCtx.fillStyle = star.color;
                orbitCtx.shadowBlur = 20 * projScale;
                orbitCtx.shadowColor = star.color;
                orbitCtx.fill();
                orbitCtx.shadowBlur = 0;

                if (selectedObject?.type === 'star' && star.name === selectedObject.name) {
                    orbitCtx.beginPath();
                    orbitCtx.arc(projX, projY, r + 5 / zoom, 0, Math.PI * 2);
                    orbitCtx.strokeStyle = 'rgba(200, 200, 200, 0.8)';
                    orbitCtx.lineWidth = 2 / zoom;
                    orbitCtx.shadowBlur = 10;
                    orbitCtx.shadowColor = '#FFFFFF';
                    orbitCtx.stroke();
                    orbitCtx.shadowBlur = 0;
                }

                orbitCtx.fillStyle = 'white';
                orbitCtx.font = `${12 * projScale / zoom}px sans-serif`;
                orbitCtx.textAlign = 'center';
                orbitCtx.fillText(star.name, projX, projY + r + 15 / zoom);
            }
        });
      });

      const time = Date.now() * timeScale;
      planets.forEach(p => {
        const scale = p.orbitScale * Math.min(orbitWidth, orbitHeight) / 800;
        const t = (time * p.orbitSpeed) + (p.twinOffset || 0);
        const x = scale * Math.sin(t);
        const y = scale * Math.sin(t) * Math.cos(t);
        const alpha = maxAlpha - ((p.orbitScale - minOrbitScale) / (maxOrbitScale - minOrbitScale)) * (maxAlpha - minAlpha);
        
        celestialObjects.push({ x, y, z: 0, draw: () => {
            orbitCtx.save();
            orbitCtx.globalAlpha = alpha;

            const { x: projX, y: projY, scale: projScale } = project(x, y);
            const planetRadius = 8 * projScale / zoom;

            orbitCtx.beginPath();
            orbitCtx.arc(projX, projY, planetRadius, 0, Math.PI * 2);
            orbitCtx.fillStyle = p.color;
            orbitCtx.shadowBlur = 10 * projScale;
            orbitCtx.shadowColor = p.color;
            orbitCtx.fill();
            orbitCtx.shadowBlur = 0;

            if (selectedObject?.type === 'planet' && p.name === selectedObject.name) {
                orbitCtx.beginPath();
                orbitCtx.arc(projX, projY, planetRadius + 5 / zoom, 0, Math.PI * 2);
                orbitCtx.strokeStyle = 'rgba(200, 200, 200, 0.8)';
                orbitCtx.lineWidth = 2 / zoom;
                orbitCtx.shadowBlur = 10;
                orbitCtx.shadowColor = '#FFFFFF';
                orbitCtx.stroke();
                orbitCtx.shadowBlur = 0;
            }

            p.moons.forEach((moon, i) => {
              const moonRadius = 3;
              const moonOrbitRadius = 15;
              const moonAngle = (time * 2 + i * (Math.PI * 2 / p.moons.length));
              const moonX = x + moonOrbitRadius * Math.cos(moonAngle);
              const moonY = y + moonOrbitRadius * Math.sin(moonAngle);
              const { x: projMoonX, y: projMoonY, scale: projMoonScale } = project(moonX, moonY);
              const r = moonRadius * projMoonScale / zoom;

              orbitCtx.beginPath();
              orbitCtx.arc(projMoonX, projMoonY, r, 0, Math.PI * 2);
              orbitCtx.fillStyle = 'white';
              orbitCtx.fill();

              if (selectedObject?.type === 'moon' && moon.name === selectedObject.name) {
                  orbitCtx.beginPath();
                  orbitCtx.arc(projMoonX, projMoonY, r + 3 / zoom, 0, Math.PI * 2);
                  orbitCtx.strokeStyle = 'rgba(200, 200, 200, 0.7)';
                  orbitCtx.stroke();
              }
              
              orbitCtx.fillStyle = 'white';
              orbitCtx.font = `${10 * projMoonScale / zoom}px sans-serif`;
              orbitCtx.textAlign = 'center';
              orbitCtx.fillText(moon.name, projMoonX, projMoonY - (r + 5 / zoom));
            });

            orbitCtx.fillStyle = 'white';
            orbitCtx.font = `${12 * projScale / zoom}px sans-serif`;
            orbitCtx.textAlign = 'center';
            orbitCtx.fillText(p.name, projX, projY - (planetRadius + 10 / zoom));

            orbitCtx.restore();
          }
        });
      });

      celestialObjects.sort((a,b) => project(a.x, a.y).y - project(b.x, b.y).y).forEach(obj => obj.draw());

      orbitCtx.restore();
      drawSphereView(selectedObject, sphereCtx, sphereWidth, sphereHeight);
      animationFrameId.current = requestAnimationFrame(animate);
    };

    resizeCanvases();
    animate();
    setIsSimulating(true);

    return () => {
      window.removeEventListener('resize', resizeCanvases);
      orbitCanvas.removeEventListener('mousedown', handleOrbitMouseDown);
      orbitCanvas.removeEventListener('mouseup', handleOrbitMouseUp);
      orbitCanvas.removeEventListener('mousemove', handleOrbitMouseMove);
      orbitCanvas.removeEventListener('mouseleave', handleOrbitMouseLeave);
      orbitCanvas.removeEventListener('wheel', handleWheel);
      sphereCanvas.removeEventListener('mousedown', handleSphereMouseDown);
      sphereCanvas.removeEventListener('mouseup', handleSphereMouseUp);
      sphereCanvas.removeEventListener('mouseleave', handleSphereMouseLeave);
      sphereCanvas.removeEventListener('mousemove', handleSphereMouseMove);
      if(animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [selectedObject, pan, zoom, viewAngle]);

  const handleZoomIn = () => setZoom(prev => Math.min(prev * 1.2, 5));
  const handleZoomOut = () => setZoom(prev => Math.max(prev / 1.2, 0.5));
  const handleResetView = () => {
      setZoom(1);
      setPan({ x: 0, y: 0 });
      setViewAngle('top');
  };
  
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (!value) {
        setSelectedObject(null);
        return;
    }

    const [type, name] = value.split('-');
    
    let foundObject: CelestialBody | null = null;
    if (type === 'star') {
        const star = stars.find(s => s.name === name);
        if (star) foundObject = { ...star, type: 'star' };
    } else if (type === 'planet') {
        const planet = planets.find(p => p.name === name);
        if (planet) foundObject = { ...planet, type: 'planet' };
    } else if (type === 'moon') {
        for (const p of planets) {
            const moon = p.moons.find(m => m.name === name);
            if (moon) {
                foundObject = { ...moon, type: 'moon' };
                break;
            }
        }
    }
    setSelectedObject(foundObject);
  };

  const viewButtonClass = (view: ViewAngle) => 
    `bg-gray-800/50 hover:bg-gray-700/70 text-white font-bold w-8 h-8 rounded-full transition-colors backdrop-blur-sm flex items-center justify-center ${viewAngle === view ? 'bg-purple-600/80' : ''}`;

  const cardStyle = "bg-gray-900/40 backdrop-blur-md border border-gray-700/60 rounded-2xl shadow-xl p-6 sm:p-8 transition-all duration-300 hover:border-gray-600/80";
  const subCardStyle = "bg-gray-800/30 rounded-lg p-6 border border-gray-700/50";
  const titleStyle = "text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 mb-4 tracking-wide";
  const subTitleStyle = "text-xl font-semibold text-gray-300";

  return (
    <>
    <div className="min-h-screen text-gray-300 p-4 sm:p-6 md:p-8 font-sans">
      <div className="max-w-screen-2xl w-full mx-auto space-y-8">
        <header className="text-center p-8 bg-gray-900/40 backdrop-blur-md border border-gray-700/60 rounded-2xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400 tracking-tight">The Redo Universe</h1>
          <p className="mt-2 text-gray-500 text-lg italic">A new beginning, 34 light-years from Earth.</p>
        </header>
          
        <main className="grid grid-cols-1 lg:grid-cols-10 gap-8">
            <div className="lg:col-span-7 space-y-8">
              <section className={cardStyle}>
                <h2 className={titleStyle}>Orbital Simulation</h2>
                <p className="text-gray-400 mb-6">
                  Use your mouse to zoom and pan. Click on a sun, planet, or moon to learn more.
                </p>
                <div className="grid md:grid-cols-3 gap-8 items-start">
                  <div className="md:col-span-2 relative flex justify-center items-center bg-black rounded-lg overflow-hidden border border-gray-800">
                    {!isSimulating && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-10" aria-label="Loading simulation">
                            <div className="w-12 h-12 border-4 border-gray-700 border-t-gray-300 rounded-full animate-spin" role="status"></div>
                            <p className="mt-4 text-gray-400">Initializing Simulation...</p>
                        </div>
                    )}
                    <canvas ref={orbitCanvasRef} className={`w-full h-auto max-h-[500px] aspect-video cursor-grab active:cursor-grabbing transition-opacity duration-500 ${isSimulating ? 'opacity-100' : 'opacity-0'}`}></canvas>
                    <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-opacity duration-500 ${isSimulating ? 'opacity-100' : 'opacity-0'}`}>
                        <button onClick={handleZoomIn} className="bg-gray-800/50 hover:bg-gray-700/70 text-white font-bold w-8 h-8 rounded-full transition-colors backdrop-blur-sm" title="Zoom In" aria-label="Zoom In">+</button>
                        <button onClick={handleZoomOut} className="bg-gray-800/50 hover:bg-gray-700/70 text-white font-bold w-8 h-8 rounded-full transition-colors backdrop-blur-sm" title="Zoom Out" aria-label="Zoom Out">-</button>
                        <button onClick={() => setViewAngle('top')} className={viewButtonClass('top')} title="Top-Down View">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 01-2 2z" /></svg>
                        </button>
                        <button onClick={() => setViewAngle('perspective')} className={viewButtonClass('perspective')} title="Perspective View">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        </button>
                        <button onClick={() => setViewAngle('side')} className={viewButtonClass('side')} title="Side-On View">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                        </button>
                        <button onClick={handleResetView} className="bg-gray-800/50 hover:bg-gray-700/70 text-white font-bold w-8 h-8 rounded-full transition-colors backdrop-blur-sm flex items-center justify-center" title="Reset View" aria-label="Reset View">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 9a9 9 0 0114.13-6.36M20 15a9 9 0 01-14.13 6.36" />
                          </svg>
                        </button>
                    </div>
                  </div>
                  <div className={`${subCardStyle} min-h-[300px]`}>
                    {selectedObject ? (
                      <div>
                        <h3 className="text-2xl font-bold text-gray-200">{selectedObject.name}</h3>
                        <p className="mt-2 text-gray-400 italic">{selectedObject.description}</p>
                        <ul className="mt-4 space-y-2 border-t border-gray-700 pt-4">
                          {selectedObject.details.map(detail => (
                            <li key={detail.label} className="flex justify-between">
                              <span className="font-semibold text-gray-300">{detail.label}: </span>
                              <span className="text-gray-500 text-right">{detail.value}</span>
                            </li>
                          ))}
                          {selectedObject.type === 'moon' && (
                            <li className="flex justify-between">
                                <span className="font-semibold text-gray-300">Parent Planet: </span>
                                <span className="text-gray-500 text-right">{selectedObject.parentPlanet}</span>
                            </li>
                          )}
                        </ul>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-gray-600 italic text-center">Click a celestial body for details.</p>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              <section className={cardStyle}>
                <h2 className={titleStyle}>Celestial Body Viewer</h2>
                  <div className="mb-6">
                    <label htmlFor="celestial-select" className="block text-gray-400 mb-2 font-semibold">Select a body to inspect:</label>
                    <select 
                      id="celestial-select" 
                      className="w-full bg-gray-900/80 border border-gray-700 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      value={selectedObject ? `${selectedObject.type}-${selectedObject.name}` : ''}
                      onChange={handleSelectChange}
                    >
                      <option value="">-- Select a Celestial Body --</option>
                      <optgroup label="Stars">
                        {stars.map(star => <option key={star.name} value={`star-${star.name}`}>{star.name}</option>)}
                      </optgroup>
                      <optgroup label="Planets">
                        {planets.map(planet => <option key={planet.name} value={`planet-${planet.name}`}>{planet.name}</option>)}
                      </optgroup>
                      <optgroup label="Moons">
                        {planets.flatMap(p => p.moons).map(moon => <option key={moon.name} value={`moon-${moon.name}`}>{moon.name} ({moon.parentPlanet})</option>)}
                      </optgroup>
                    </select>
                  </div>
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 id="cross-section-title" className={`${subTitleStyle} text-center mb-2`}>Geographical Layout</h3>
                        <div className="flex justify-center items-center bg-black rounded-lg overflow-hidden border border-gray-800 aspect-square">
                            <canvas ref={internalCanvasRef} className="w-full h-full"></canvas>
                        </div>
                    </div>
                    <div>
                        <h3 className={`${subTitleStyle} text-center mb-2`}>3D Sphere View</h3>
                        <div className="flex justify-center items-center bg-black rounded-lg overflow-hidden border border-gray-800 aspect-square">
                            <canvas ref={sphereCanvasRef} className={`w-full h-full ${selectedObject?.type !== 'star' ? 'cursor-grab active:cursor-grabbing' : ''}`}></canvas>
                        </div>
                        {selectedObject?.type !== 'star' && <p className="text-center text-gray-500 text-sm mt-2">Click and drag to rotate.</p> }
                    </div>
                </div>
              </section>

              <section className={cardStyle}>
                <h2 className={titleStyle}>Economy & Currency</h2>
                <p className="text-gray-400 mb-6">The Zanian economy is a complex system of advanced digital transactions, resource bartering, and interstellar trade, all loosely tied together by the official currency: the <span className="font-bold text-white">Lumin (L)</span>. A unit of crystallized energy, Lumin is minted and controlled by the Zan Zanians, creating a major point of contention across the planet.</p>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className={subCardStyle}>
                        <h3 className={`${subTitleStyle} mb-2`}>The Zan Hegemony (Cloned)</h3>
                        <p className="text-gray-400">The Zan Zanians operate a sophisticated, fully digital economy. Lumin exists as encrypted data, used for everything from scientific funding to military contracts. Their control over the Lumin mint gives them immense economic leverage over the other factions.</p>
                    </div>
                    <div className={subCardStyle}>
                        <h3 className={`${subTitleStyle} mb-2`}>The Death Barter System</h3>
                        <p className="text-gray-400">The Death Zanians reject the "unnatural" digital currency of the clones. Their economy is based on raw materials, scavenged technology, and military might. They primarily rely on a robust bartering system, valuing tangible assets over digital credits.</p>
                    </div>
                    <div className={subCardStyle}>
                        <h3 className={`${subTitleStyle} mb-2`}>The Moon Coalition</h3>
                        <p className="text-gray-400">The moons are rich in unique minerals essential for Zanian technology. The tribes trade these resources for refined goods, tech, and Lumin. This economic dependence is a constant source of political tension and a key motivator for seeking greater autonomy.</p>
                    </div>
                </div>
              </section>
              
              <section className={cardStyle}>
                <h2 className={titleStyle}>Key Figures & Factions</h2>
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className={subCardStyle}>
                    <div className="flex items-center gap-4 mb-3">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-400">
                            <path d="M12 2L15.09 8.09L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.09L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 2V22" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2"/>
                            <path d="M2 12H22" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2"/>
                        </svg>
                        <h3 className="text-2xl font-bold text-gray-200">GOD - Leader of the Cloned</h3>
                    </div>
                    <p className="text-gray-400">The first experimental womb clone from 'Project Recreation.' Calm, trained, and erudite, God guides the cloned population of the Zan Region. He possesses a supernatural consciousness of past, present, and future, and believes in using knowledge to create a better world for all.</p>
                  </div>
                  <div className={subCardStyle}>
                    <div className="flex items-center gap-4 mb-3">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-red-400">
                            <path d="M12 2.69l5.66 5.66a8 8 0 11-11.32 0L12 2.69z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M13 15l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            <path d="M9 15l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        <h3 className="text-2xl font-bold text-gray-200">RAK - King of the Natural Born</h3>
                    </div>
                    <p className="text-gray-400">The first naturally born human on Zan. His genetics were altered by the planet's unique radiation. Stormy and driven by instinct, Rak leads the Death Zanians. He is a charismatic antagonist who formed a cult to destroy the Red Sun, believing it to be a threat.</p>
                  </div>
                </div>

                <div>
                    <h3 className="text-2xl font-bold text-gray-300 mb-6 border-t border-gray-700/60 pt-6">Factions & Military Structure</h3>
                    <div className="space-y-8">
                        {factions.map(faction => (
                            <div key={faction.name} className={subCardStyle}>
                                <h4 className="text-xl font-bold text-gray-200">{faction.name}</h4>
                                <p className="text-gray-400 mt-2 mb-4">{faction.description}</p>
                                <div className="border-t border-gray-700 pt-4 space-y-2">
                                    {faction.characters.map(char => (
                                        <div key={char.name}>
                                            <button onClick={() => handleCharacterClick(char.name)} className="w-full text-left">
                                                <div className="flex justify-between items-center p-2 rounded-md hover:bg-gray-700/40 transition-colors">
                                                    <div>
                                                        <p className="font-semibold text-gray-200">{char.name}</p>
                                                        <p className="text-sm text-gray-500">{char.role}</p>
                                                    </div>
                                                    <svg className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${expandedCharacter === char.name ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                            </button>
                                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedCharacter === char.name ? 'max-h-96' : 'max-h-0'}`}>
                                                <div className="p-4 mt-1 bg-black/30 rounded-b-md border-l-2 border-gray-700">
                                                    <p className="text-gray-400 text-sm italic">{char.backstory}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
              </section>
            </div>
            
            <aside className="lg:col-span-3 space-y-8">
              <section className={cardStyle}>
                <h2 className={titleStyle}>Zan News Feed</h2>
                <div className="space-y-8">
                    <div>
                        <h3 className={`${subTitleStyle} text-center mb-4`}>System Clock</h3>
                        <Clock time={zanianTime} />
                        <div className="mt-6 flex justify-center">
                            <button 
                                onClick={() => setCalendarOpen(true)}
                                className="bg-purple-600/50 hover:bg-purple-600/80 border border-purple-500/80 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg shadow-purple-900/40 hover:shadow-purple-700/60"
                            >
                                View Full Calendar
                            </button>
                        </div>
                    </div>
                    <div className={`${subCardStyle}`}>
                      <h3 className={`${subTitleStyle} text-center mb-4`}>Recent Events</h3>
                      <div className="space-y-4">
                          <div className="border-l-2 border-purple-500 pl-3">
                              <p className="font-semibold text-gray-200">Border Skirmish Reported</p>
                              <p className="text-sm text-gray-400">Commander Kael's Legionnaires exchanged fire with a Sun Eater patrol near the P2/P3 border. Casualties are unconfirmed. Tensions remain high.</p>
                          </div>
                          <div className="border-l-2 border-blue-500 pl-3">
                              <p className="font-semibold text-gray-200">Moon Coalition Summit</p>
                              <p className="text-sm text-gray-400">Chieftain Zorgan has called a meeting of the four moon tribes on Agape. Sources suggest Lyra's diplomatic efforts are gaining traction, pushing for a unified defense strategy.</p>
                          </div>
                          <div className="border-l-2 border-red-500 pl-3">
                              <p className="font-semibold text-gray-200">Hades Ocean Anomaly</p>
                              <p className="text-sm text-gray-400">Zanian sensors have detected unusual energy readings from the deep trenches. The Tide-Speaker has not responded to inquiries. The Trident Guard has increased patrols.</p>
                          </div>
                      </div>
                    </div>
                </div>
              </section>

              <section className={cardStyle}>
                <h2 className={titleStyle}>Zan's Societal Structure & Regions</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className={subTitleStyle}>Regions & Inhabitants</h3>
                    <ul className="mt-2 text-gray-400 list-disc list-inside space-y-2">
                      <li><span className="font-bold text-white">Zan Zanians (Cloned):</span> Inhabit the Zan Region. They are created via 'Project Recreation' and possess enhanced knowledge and immunity.</li>
                      <li><span className="font-bold text-white">Death Zanians (Natural Born):</span> Reside in the Death Region. As naturally born beings, they have deep genetic knowledge but lower immunity.</li>
                      <li><span className="font-bold text-white">Aqua & Hades Zanians:</span> The original bioforms dwell in the Hades Ocean, remaining neutral between God and Rak.</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className={subTitleStyle}>Moons & Hybrids</h3>
                    <ul className="mt-2 text-gray-400 list-disc list-inside space-y-1">
                      <li>The moons of Zan are home to mixed tribes: <span className="font-bold text-white">Agape, Ales, Alyx, and Andel</span>.</li>
                      <li>Hybrid Aqua beings live along the <span className="font-bold text-white">Zan region's coast</span>.</li>
                      <li>Pure Aqua breeds are found along the <span className="font-bold text-white">Death region's coast</span>.</li>
                    </ul>
                  </div>
                </div>
              </section>
              
              <section className={cardStyle}>
                <h2 className={titleStyle}>Universe Lore</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className={subTitleStyle}>Year Loop Structure</h3>
                    <p className="mt-2 text-gray-400">
                      The Zanian year is a cycle of <span className="text-white font-bold">{yearDuration}</span> days. Each day lasts
                      <span className="text-white font-bold">{dayDuration}</span> hours, with varying durations of daylight and darkness.
                    </p>
                  </div>
                  <div>
                    <h3 className={subTitleStyle}>Darknight Period</h3>
                    <p className="mt-2 text-gray-400">
                      A unique period called <span className="font-bold text-white">Darknight</span> marks the transition between years. It lasts for 6 days, consisting of the last 3 days of Phase 4 and the first 3 days of Phase 1.
                    </p>
                  </div>
                  <div>
                    <h3 className={subTitleStyle}>Other Planets</h3>
                    <p className="mt-2 text-gray-400">
                        Beyond Zan, the system contains the twin planets <span className="font-bold text-white">Casa</span> and <span className="font-bold text-white">Judo</span>, and the small, inhospitable rock, <span className="font-bold text-white">Flack</span>. Zanian explorers continue to investigate these worlds for resources and signs of life.
                    </p>
                  </div>
                </div>
              </section>
            </aside>
        </main>
      </div>
    </div>
    <Modal isOpen={isCalendarOpen} onClose={() => setCalendarOpen(false)}>
        <Calendar currentDay={zanianTime.day} />
    </Modal>
    </>
  );
};

export default App;
