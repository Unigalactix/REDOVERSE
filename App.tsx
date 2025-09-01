
import React, { useEffect, useRef } from 'react';
import type { Phase } from './types';

// FIX: The constants yearDuration, dayDuration, and phases do not change, so they do not need to be state variables. They have been moved outside the component as constants. This resolves the reported error and improves performance.
const yearDuration = 782;
const dayDuration = 36;
const phases: Phase[] = [
  { name: 'Phase 1 (P1)', color: 'Purple', days: 118 },
  { name: 'Blue Phase (B)', color: 'Blue', days: 150 },
  { name: 'Phase 2 (P2)', color: 'Purple', days: 116 },
  { name: 'Phase 3 (P3)', color: 'Purple', days: 118 },
  { name: 'Red Phase (R)', color: 'Red', days: 162 },
  { name: 'Phase 4 (P4)', color: 'Purple', days: 116 },
];

const App: React.FC = () => {
  const orbitCanvasRef = useRef<HTMLCanvasElement>(null);
  const internalCanvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>();

  const phaseClasses: Record<Phase['color'], string> = {
    Purple: 'bg-purple-900/50 text-purple-200',
    Blue: 'bg-blue-900/50 text-blue-200',
    Red: 'bg-red-900/50 text-red-200',
  };

  const dotClasses: Record<Phase['color'], string> = {
    Purple: 'bg-purple-400',
    Blue: 'bg-blue-400',
    Red: 'bg-red-400',
  };

  useEffect(() => {
    const orbitCanvas = orbitCanvasRef.current;
    const internalCanvas = internalCanvasRef.current;

    if (!orbitCanvas || !internalCanvas) return;

    const orbitCtx = orbitCanvas.getContext('2d');
    const internalCtx = internalCanvas.getContext('2d');

    if (!orbitCtx || !internalCtx) return;
    
    let orbitWidth: number, orbitHeight: number;
    let internalWidth: number, internalHeight: number;

    const resizeCanvases = () => {
      orbitWidth = orbitCanvas.width = orbitCanvas.clientWidth;
      orbitHeight = orbitCanvas.height = orbitCanvas.clientHeight;
      internalWidth = internalCanvas.width = internalCanvas.clientWidth;
      internalHeight = internalCanvas.height = internalCanvas.clientHeight;
      drawZanCrossSection();
    };

    window.addEventListener('resize', resizeCanvases);
    
    const timeScale = 0.0005;

    const stars = [
      { name: 'Spica', color: '#87CEFA', x: -50, y: 0, radius: 20 },
      { name: 'Antares', color: '#FF4500', x: 50, y: 0, radius: 20 },
    ];

    const planets = [
      { name: 'Zan', color: '#6A0DAD', orbitScale: 150, orbitSpeed: 1, moons: ['Agape', 'Ales', 'Alyx', 'Andel'], moonScale: 20 },
      { name: 'Casa', color: '#3A86FF', orbitScale: 200, orbitSpeed: 0.8, moons: ['Moon 1', 'Moon 2', 'Moon 3'], moonScale: 25, twinOffset: 0 },
      { name: 'Judo', color: '#FFC107', orbitScale: 200, orbitSpeed: 0.8, moons: [], moonScale: 0, twinOffset: 1.5 },
      { name: 'Flack', color: '#A0A0A0', orbitScale: 300, orbitSpeed: 0.6, moons: [], moonScale: 0 },
    ];

    const drawOrbit = () => {
      orbitCtx.fillStyle = '#0f172a';
      orbitCtx.fillRect(0, 0, orbitWidth, orbitHeight);

      orbitCtx.save();
      orbitCtx.translate(orbitWidth / 2, orbitHeight / 2);

      orbitCtx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      orbitCtx.lineWidth = 1;

      planets.forEach(p => {
        orbitCtx.beginPath();
        const scale = p.orbitScale * Math.min(orbitWidth, orbitHeight) / 800;
        for (let t = 0; t < Math.PI * 2; t += 0.01) {
          const x = scale * Math.sin(t);
          const y = scale * Math.sin(t) * Math.cos(t);
          if (t === 0) {
            orbitCtx.moveTo(x, y);
          } else {
            orbitCtx.lineTo(x, y);
          }
        }
        orbitCtx.closePath();
        orbitCtx.stroke();
      });

      stars.forEach(star => {
        orbitCtx.beginPath();
        orbitCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        orbitCtx.fillStyle = star.color;
        orbitCtx.shadowBlur = 20;
        orbitCtx.shadowColor = star.color;
        orbitCtx.fill();
        orbitCtx.shadowBlur = 0;
        orbitCtx.fillStyle = 'white';
        orbitCtx.font = '12px sans-serif';
        orbitCtx.textAlign = 'center';
        orbitCtx.fillText(star.name, star.x, star.y + star.radius + 15);
      });

      const time = Date.now() * timeScale;
      planets.forEach(p => {
        const scale = p.orbitScale * Math.min(orbitWidth, orbitHeight) / 800;
        const t = (time * p.orbitSpeed) + (p.twinOffset || 0);
        const x = scale * Math.sin(t);
        const y = scale * Math.sin(t) * Math.cos(t);

        const planetRadius = 8;
        orbitCtx.beginPath();
        orbitCtx.arc(x, y, planetRadius, 0, Math.PI * 2);
        orbitCtx.fillStyle = p.color;
        orbitCtx.shadowBlur = 10;
        orbitCtx.shadowColor = p.color;
        orbitCtx.fill();
        orbitCtx.shadowBlur = 0;

        const moonRadius = 3;
        const moonOrbitRadius = 15;
        p.moons.forEach((moonName, i) => {
          const moonAngle = (time * 2 + i * (Math.PI * 2 / p.moons.length));
          const moonX = x + moonOrbitRadius * Math.cos(moonAngle);
          const moonY = y + moonOrbitRadius * Math.sin(moonAngle);
          orbitCtx.beginPath();
          orbitCtx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
          orbitCtx.fillStyle = 'white';
          orbitCtx.fill();
          
          orbitCtx.fillStyle = 'white';
          orbitCtx.font = '10px sans-serif';
          orbitCtx.textAlign = 'center';
          orbitCtx.fillText(moonName, moonX, moonY - moonRadius - 5);
        });

        orbitCtx.fillStyle = 'white';
        orbitCtx.font = '12px sans-serif';
        orbitCtx.textAlign = 'center';
        orbitCtx.fillText(p.name, x, y - planetRadius - 5);
      });

      orbitCtx.restore();
      animationFrameId.current = requestAnimationFrame(drawOrbit);
    };

    const drawZanCrossSection = () => {
      internalCtx.fillStyle = '#0f172a';
      internalCtx.fillRect(0, 0, internalWidth, internalHeight);

      const centerX = internalWidth / 2;
      const centerY = internalHeight / 2;
      const planetRadius = Math.min(internalWidth, internalHeight) / 2 - 20;

      internalCtx.beginPath();
      internalCtx.arc(centerX, centerY, planetRadius, 0, Math.PI * 2);
      internalCtx.fillStyle = '#1A5F7A';
      internalCtx.fill();
      internalCtx.fillStyle = 'white';
      internalCtx.font = '14px sans-serif';
      internalCtx.textAlign = 'center';
      internalCtx.fillText('Hades Ocean', centerX, centerY + planetRadius / 2);

      const deathRadius = planetRadius * 0.9;
      internalCtx.beginPath();
      internalCtx.arc(centerX, centerY, deathRadius, 0, Math.PI * 2);
      internalCtx.fillStyle = '#333333';
      internalCtx.fill();
      internalCtx.fillStyle = 'white';
      internalCtx.fillText('Death Region', centerX, centerY + deathRadius / 2.5);

      const zanRadius = planetRadius * 0.6;
      internalCtx.beginPath();
      internalCtx.arc(centerX, centerY, zanRadius, 0, Math.PI * 2);
      internalCtx.fillStyle = '#6A0DAD';
      internalCtx.fill();
      internalCtx.fillStyle = 'white';
      internalCtx.fillText('Zan Region', centerX, centerY);

      internalCtx.strokeStyle = '#fff';
      internalCtx.lineWidth = 1;
      internalCtx.beginPath();
      internalCtx.arc(centerX, centerY, planetRadius, 0, Math.PI * 2);
      internalCtx.stroke();
    };

    resizeCanvases();
    drawOrbit();

    return () => {
      window.removeEventListener('resize', resizeCanvases);
      if(animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-4 sm:p-8 font-sans flex flex-col items-center">
      <div className="max-w-4xl w-full rounded-2xl shadow-2xl bg-gray-800 border border-gray-700 overflow-hidden">
        <header className="text-center p-8 bg-gray-900 border-b border-gray-700">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-cyan-400 tracking-tight">The Redo Universe</h1>
          <p className="mt-2 text-gray-400 text-lg italic">A new beginning, 34 light-years from Earth.</p>
        </header>

        <main className="p-4 sm:p-8 space-y-12">
          
          <section className="border-b border-gray-700 pb-8">
            <h2 className="text-3xl font-bold text-gray-50 mb-4">Orbital Simulation</h2>
            <p className="text-gray-300 mb-4">
              Watch as Zan and its twin planets, Casa and Judo, follow their unique lemniscate orbits around the dual stars, Spica and Antares.
            </p>
            <div className="flex justify-center items-center bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
              <canvas ref={orbitCanvasRef} className="w-full h-auto max-h-[500px] aspect-video"></canvas>
            </div>
          </section>

          <section className="border-b border-gray-700 pb-8">
            <h2 className="text-3xl font-bold text-gray-50 mb-4">Zan's Internal Structure</h2>
            <p className="text-gray-300 mb-4">A cross-section view of Zan, showing its distinct regions and oceans.</p>
            <div className="flex justify-center items-center bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
              <canvas ref={internalCanvasRef} className="w-full h-auto max-h-[300px] aspect-[16/9]"></canvas>
            </div>
          </section>

          <section className="border-b border-gray-700 pb-8">
            <h2 className="text-3xl font-bold text-gray-50 mb-4">Zan's Celestial & Temporal Structure</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-cyan-300">Year Loop Structure</h3>
                <p className="mt-2 text-gray-300">
                  The Zanian year is a cycle of <span className="text-white font-bold">{yearDuration}</span> days. Each day lasts
                  <span className="text-white font-bold">{dayDuration}</span> hours, with varying durations of daylight and darkness.
                </p>
                <div className="mt-4 space-y-2">
                  {phases.map((phase) => (
                    <div key={phase.name} className={`flex items-center space-x-3 p-3 rounded-lg ${phaseClasses[phase.color]}`}>
                      <div className={`w-3 h-3 rounded-full ${dotClasses[phase.color]}`}></div>
                      <span className="font-semibold">{phase.name} ({phase.color}):</span>
                      <span>{phase.days} days</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-cyan-300">Unique Periods</h3>
                <p className="mt-2 text-gray-300">
                  A unique period called <span className="font-bold text-white">Darknight</span> marks the transition between years. It lasts for 6 days, consisting of the last 3 days of Phase 4 and the first 3 days of Phase 1.
                </p>
              </div>
            </div>
          </section>
          
          <section className="border-b border-gray-700 pb-8">
            <h2 className="text-3xl font-bold text-gray-50 mb-4">Zan's Societal Structure & Regions</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-cyan-300">Inhabitant Regions</h3>
                <ul className="mt-2 text-gray-300 list-disc list-inside space-y-1">
                  <li><span className="font-bold text-white">Zan Zanians</span> (clones) inhabit the Zan Region.</li>
                  <li><span className="font-bold text-white">Death Zanians</span> (naturally born beings) reside in the Death Region.</li>
                  <li><span className="font-bold text-white">Aqua Zanians</span> (original bioforms) dwell underwater in the Hades Ocean.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-cyan-300">Moons & Hybrids</h3>
                <ul className="mt-2 text-gray-300 list-disc list-inside space-y-1">
                  <li>The moons of Zan are home to mixed tribes: <span className="font-bold text-white">Agape, Ales, Alyx, and Andel</span>.</li>
                  <li>Hybrid Aqua beings live along the <span className="font-bold text-white">Zan region's coast</span>.</li>
                  <li>Pure Aqua breeds are found along the <span className="font-bold text-white">Death region's coast</span>.</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-50 mb-4">Other Planets in the Redo Universe</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-cyan-300">Casa</h3>
                <ul className="mt-2 text-gray-300 list-disc list-inside space-y-1">
                  <li>Features three moons.</li>
                  <li>Bioforms yet to be discovered.</li>
                  <li>Explored by Zanians.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-cyan-300">Judo & Flack</h3>
                <ul className="mt-2 text-gray-300 list-disc list-inside space-y-1">
                  <li><span className="font-bold text-white">Judo</span>: Lacks moons, with no known life forms.</li>
                  <li><span className="font-bold text-white">Flack</span>: The smallest and last planet, with no moons and inhospitable for life.</li>
                </ul>
              </div>
            </div>
            <p className="mt-4 text-gray-300">
              Casa and Judo are considered "twin planets," similar in size and appearance.
            </p>
          </section>

        </main>
      </div>
    </div>
  );
};

export default App;
