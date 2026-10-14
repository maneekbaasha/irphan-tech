import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './tv-intro.css';

const SESSION_KEY = 'irphan-tv-entered-v1';
const DURATION = 1300;

function shouldShow() {
  if (!['/', '/en', '/en/'].includes(window.location.pathname)) return false;
  if (new URLSearchParams(window.location.search).get('intro') === '1') return true;
  try { return sessionStorage.getItem(SESSION_KEY) !== 'yes'; } catch { return true; }
}

/** Client-only portal: the existing layout and prerendered pages stay untouched. */
export default function TvIntro() {
  const [visible, setVisible] = useState(shouldShow);
  const [phase, setPhase] = useState<'boot' | 'ready' | 'entering'>('boot');
  const screen = useRef<HTMLButtonElement>(null);
  const terminal = useRef<HTMLCanvasElement>(null);
  const tunnel = useRef<HTMLCanvasElement>(null);
  const entering = useRef(false);
  const finishRef = useRef<() => void>(() => {});
  const audio = useRef<AudioContext | null>(null);
  const english = window.location.pathname.startsWith('/en');

  useEffect(() => {
    if (!visible) return;
    const root = document.getElementById('root')!;
    const oldInert = root.inert;
    const oldFocus = document.activeElement;
    const overflow = [document.documentElement, document.body].map(element => ({
      element, value: element.style.getPropertyValue('overflow'),
      priority: element.style.getPropertyPriority('overflow'),
    }));
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let warpFrame = 0;
    let exitTimer = 0;
    let disposed = false;
    let complete = false;
    const timers: number[] = [];

    const release = () => {
      root.inert = oldInert;
      overflow.forEach(({ element, value, priority }) => {
        if (value) element.style.setProperty('overflow', value, priority);
        else element.style.removeProperty('overflow');
      });
      cancelAnimationFrame(frame);
      cancelAnimationFrame(warpFrame);
      clearTimeout(exitTimer);
      timers.forEach(clearTimeout);
      if (audio.current) {
        void audio.current.close().catch(() => {});
        audio.current = null;
      }
    };

    const finish = () => {
      if (complete || disposed) return;
      complete = true;
      try { sessionStorage.setItem(SESSION_KEY, 'yes'); } catch { /* optional */ }
      release();
      setVisible(false);
      const target = root.querySelector<HTMLElement>('main') ||
        (oldFocus instanceof HTMLElement && oldFocus !== document.body ? oldFocus : null);
      if (target && !target.closest('[inert]')) {
        const tabindex = target.getAttribute('tabindex');
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
        if (tabindex === null) target.removeAttribute('tabindex');
        else target.setAttribute('tabindex', tabindex);
      }
    };
    finishRef.current = finish;

    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); finish(); }
      if (event.key === 'Tab') {
        const first = screen.current;
        const last = document.querySelector<HTMLButtonElement>('.ir-tv-skip');
        if (entering.current) {
          event.preventDefault(); first?.focus();
        } else if (event.shiftKey && document.activeElement === first) {
          event.preventDefault(); last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault(); first?.focus();
        }
      }
    };
    document.addEventListener('keydown', escape);
    root.inert = true;
    overflow.forEach(({ element }) => element.style.setProperty('overflow', 'hidden', 'important'));
    screen.current?.focus({ preventScroll: true });

    const canvas = terminal.current;
    const context = canvas?.getContext('2d');
    const started = performance.now();
    let lastDraw = 0;
    if (canvas && context) {
      canvas.width = 640;
      canvas.height = 480;
      const lines = english
        ? ['> LOADING PORTFOLIO', '> INTERFACE READY', '> CONNECTION ESTABLISHED']
        : ['> CHARGEMENT DU PORTFOLIO', '> INTERFACE PRÊTE', '> CONNEXION ÉTABLIE'];
      const grain = document.createElement('canvas');
      grain.width = 160; grain.height = 120;
      const draw = (now: number) => {
        if (disposed || complete) return;
        if (now - lastDraw > 80) {
          context.fillStyle = '#06100d';
          context.fillRect(0, 0, 640, 480);
          const elapsed = now - started;
          if (elapsed < 650 && !reduced.matches) {
            const pixels = context.createImageData(160, 120);
            for (let i = 0; i < pixels.data.length; i += 4) {
              const shade = Math.random() * 160;
              pixels.data[i] = pixels.data[i + 1] = pixels.data[i + 2] = shade;
              pixels.data[i + 3] = 255;
            }
            // Small offscreen canvas keeps noise cheap at any device pixel ratio.
            grain.getContext('2d')?.putImageData(pixels, 0, 0);
            context.drawImage(grain, 0, 0, 640, 480);
          } else {
            context.font = '20px monospace';
            context.fillStyle = '#77c99b';
            const booting = elapsed < 2700 && !reduced.matches;
            if (booting) {
              const count = Math.min(lines.length, Math.floor((elapsed - 650) / 400) + 1);
              context.globalAlpha = 0.7;
              lines.slice(0, count).forEach((line, index) => context.fillText(line, 64, 66 + index * 30));
            } else {
              context.globalAlpha = 0.55;
              context.fillText(english ? 'SYSTEM ONLINE' : 'SYSTÈME EN LIGNE', 64, 66);
              if (reduced.matches || Math.floor(elapsed / 650) % 2 === 0) context.fillRect(550, 50, 12, 16);
            }
            context.globalAlpha = 1;
            if (!reduced.matches) {
              context.fillStyle = 'rgba(160,255,195,0.025)';
              context.fillRect(0, ((elapsed / 30) % 520) - 40, 640, 35);
            }
          }
          lastDraw = now;
        }
        if (!reduced.matches) frame = requestAnimationFrame(draw);
      };
      draw(performance.now());
    }
    timers.push(window.setTimeout(() => setPhase(current => current === 'boot' ? 'ready' : current), 700));

    const startWarp = () => {
      const warp = tunnel.current;
      const ctx = warp?.getContext('2d');
      const rect = screen.current?.getBoundingClientRect();
      if (!warp || !ctx || !rect) return;
      const w = window.innerWidth, h = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      warp.width = w * ratio; warp.height = h * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      const x = rect.left + rect.width / 2, y = rect.top + rect.height / 2;
      const radius = Math.hypot(w, h);
      const rays = Array.from({ length: 90 }, () => ({ a: Math.random() * Math.PI * 2, r: Math.random() }));
      const start = performance.now();
      const draw = (now: number) => {
        if (disposed || complete) return;
        const progress = Math.min((now - start) / DURATION, 1);
        ctx.clearRect(0, 0, w, h);
        ctx.strokeStyle = `rgba(20,60,38,${progress * 0.45})`;
        ctx.lineWidth = 1 + progress;
        for (const ray of rays) {
          const distance = ((ray.r + progress ** 3 * 2) % 1) * radius;
          const tail = Math.max(0, distance - 5 - progress ** 3 * radius * 0.2);
          ctx.beginPath();
          ctx.moveTo(x + Math.cos(ray.a) * tail, y + Math.sin(ray.a) * tail);
          ctx.lineTo(x + Math.cos(ray.a) * distance, y + Math.sin(ray.a) * distance);
          ctx.stroke();
        }
        if (progress < 1) warpFrame = requestAnimationFrame(draw);
      };
      warpFrame = requestAnimationFrame(draw);
    };

    const onEnter = () => {
      if (entering.current || disposed || complete) return;
      entering.current = true;
      if (reduced.matches) { finish(); return; }
      exitTimer = window.setTimeout(finish, DURATION + 100);
      setPhase('entering');
      try { startWarp(); } catch { /* CSS transition still works */ }
      try {
        const Context = window.AudioContext;
        if (!Context) return;
        const sound = new Context();
        audio.current = sound;
        // Resume happens inside the user's click; no sound before consent.
        void sound.resume().then(() => {
          if (disposed || complete || sound.state !== 'running') return;
          const t = sound.currentTime;
          const buffer = sound.createBuffer(1, Math.ceil(sound.sampleRate * 1.3), sound.sampleRate);
          const data = buffer.getChannelData(0);
          for (let i = 0; i < data.length; i++) {
            const modulation = 0.55 + 0.45 * Math.sin(i / sound.sampleRate * Math.PI * 2 * 45);
            data[i] = (Math.random() * 2 - 1) * modulation;
          }
          const source = sound.createBufferSource();
          const filter = sound.createBiquadFilter();
          const gain = sound.createGain();
          source.buffer = buffer;
          filter.type = 'bandpass'; filter.Q.value = 0.65;
          filter.frequency.setValueAtTime(700, t);
          filter.frequency.exponentialRampToValueAtTime(6000, t + 1.2);
          gain.gain.setValueAtTime(0.0001, t);
          gain.gain.exponentialRampToValueAtTime(0.06, t + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.13, t + 1.05);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.3);
          source.connect(filter).connect(gain).connect(sound.destination);
          source.start(t); source.stop(t + 1.3);
        }).catch(() => {});
      } catch { /* Audio failure never blocks entry */ }
    };
    const button = screen.current;
    button?.addEventListener('click', onEnter);
    const hide = () => { if (entering.current && document.hidden) finish(); };
    document.addEventListener('visibilitychange', hide);

    return () => {
      disposed = true;
      release();
      entering.current = false;
      button?.removeEventListener('click', onEnter);
      document.removeEventListener('keydown', escape);
      document.removeEventListener('visibilitychange', hide);
      finishRef.current = () => {};
    };
  }, [visible]);

  if (!visible) return null;
  return createPortal(
    <div className={`ir-tv-intro ir-tv-${phase}`} role="dialog" aria-modal="true" aria-label={english ? 'Enter Irphan’s portfolio' : 'Entrer dans le portfolio d’Irphan'}>
      <div className="ir-tv-stage">
        <div className="ir-tv-device" onAnimationEnd={event => {
          if (event.animationName === 'ir-tv-hyperdrive') finishRef.current();
        }}>
          <img className="ir-tv-image" src="/tv-vintage.png" alt="" onError={() => finishRef.current()} />
          <button ref={screen} className="ir-tv-screen" type="button" aria-label={english ? 'Enter the portfolio' : 'Entrer dans le portfolio'}>
            <canvas ref={terminal} className="ir-tv-terminal" aria-hidden="true" />
            <span className="ir-tv-scanlines" aria-hidden="true" />
            <span className="ir-tv-copy">
              <span className="ir-tv-title">IRPHAN</span>
              <span className="ir-tv-subtitle"><span>SUPPORT IT</span><span>{english ? 'CYBERSECURITY' : 'CYBERSÉCURITÉ'}</span></span>
              <span className="ir-tv-prompt">{english ? 'CLICK TO ENTER' : 'CLIQUER POUR ENTRER'}</span>
            </span>
          </button>
        </div>
      </div>
      <canvas ref={tunnel} className="ir-tv-tunnel" aria-hidden="true" />
      <button className="ir-tv-skip" type="button" onClick={() => finishRef.current()}>{english ? 'Skip intro' : 'Passer l’intro'}</button>
      <p className="ir-tv-caption">{english ? 'A click. A connection.' : 'Un clic. Une connexion.'}</p>
    </div>, document.body
  );
}
