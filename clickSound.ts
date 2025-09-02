// Simple click sound using Web Audio API
let ctx: AudioContext | null = null;
let masterGain: GainNode | null = null;

function ensureContext() {
  if (ctx) return;
  const C = (window as any).AudioContext || (window as any).webkitAudioContext;
  if (!C) return;
  ctx = new C();
  masterGain = ctx.createGain();
  masterGain.gain.value = 0.12;
  masterGain.connect(ctx.destination);
}

export function playClick() {
  try {
    ensureContext();
    if (!ctx || !masterGain) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.value = 880; // A5-ish
    g.gain.value = 0.0001;
    osc.connect(g);
    g.connect(masterGain);

    // tiny percussive envelope
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(1.0, now + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

    osc.start(now);
    osc.stop(now + 0.13);
  } catch (e) {
    // fail silently
    // console.error('click sound error', e);
  }
}

function isClickable(el: Element | null): boolean {
  if (!el) return false;
  const tag = el.tagName?.toLowerCase();
  if (tag === 'button') return true;
  if (tag === 'a' && (el as HTMLAnchorElement).getAttribute('href')) return true;
  if (tag === 'input') {
    const t = (el as HTMLInputElement).type || '';
    return ['button', 'submit', 'image'].includes(t.toLowerCase());
  }
  if (el.getAttribute && el.getAttribute('role') === 'button') return true;
  if ((el as HTMLElement).onclick) return true;
  // data attribute opt-in
  if (el.getAttribute && el.getAttribute('data-click-sound') === 'true') return true;
  return false;
}

export function initClickSound() {
  // Listen capture-phase to catch clicks before they are stopped
  document.addEventListener('click', (ev) => {
    let el: Element | null = null;
    // Walk composedPath if available for shadow DOM friendliness
    const path = (ev as any).composedPath?.() || (ev as any).path || [];
    if (Array.isArray(path) && path.length) {
      for (const node of path) {
        if (node instanceof Element && isClickable(node)) { el = node; break; }
      }
    }
    if (!el) {
      let node = ev.target as Element | null;
      while (node) {
        if (isClickable(node)) { el = node; break; }
        node = node.parentElement;
      }
    }
    if (el) {
      // Create/resume AudioContext on first user gesture
      if (ctx && ctx.state === 'suspended') ctx.resume().catch(() => {});
      playClick();
    }
  }, true);
}

export default {
  initClickSound,
  playClick
};
