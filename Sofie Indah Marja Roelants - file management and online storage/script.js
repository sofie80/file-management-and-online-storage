// ── ASCII Art (big block letters) ──────────────────────────────────────
const art = `
 ██████╗ ██████╗ ███╗   ██╗ ██████╗ ██████╗  █████╗ ████████╗██╗   ██╗
██╔════╝██╔═══██╗████╗  ██║██╔════╝ ██╔══██╗██╔══██╗╚══██╔══╝██║   ██║
██║     ██║   ██║██╔██╗ ██║██║  ███╗██████╔╝███████║   ██║   ██║   ██║
██║     ██║   ██║██║╚██╗██║██║   ██║██╔══██╗██╔══██║   ██║   ██║   ██║
╚██████╗╚██████╔╝██║ ╚████║╚██████╔╝██║  ██║██║  ██║   ██║   ╚██████╔╝
 ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝    ╚═════╝

██╗      █████╗ ████████╗██╗ ██████╗ ███╗   ██╗███████╗
██║     ██╔══██╗╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
██║     ███████║   ██║   ██║██║   ██║██╔██╗ ██║███████╗
██║     ██╔══██║   ██║   ██║██║   ██║██║╚██╗██║╚════██║
███████╗██║  ██║   ██║   ██║╚██████╔╝██║ ╚████║███████║
╚══════╝╚═╝  ╚═╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝
`.trim();

const el = document.getElementById('asciiArt');
el.textContent = art;

// ── Timestamp ──────────────────────────────────────────────────────────
function updateTS() {
  document.getElementById('ts').textContent =
    new Date().toISOString().replace('T', ' ').split('.')[0];
}
updateTS();
setInterval(updateTS, 1000);

// ── Matrix rain canvas ─────────────────────────────────────────────────
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let W, H, cols, drops;
const FONT_SZ = 14;
const CHARS = '01アイウエオカキクケコサシスセソタチツテトナニヌネノABCDEFGHIJKLMNOPQRSTUVWXYZ#@$%&*';

function init() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
  cols  = Math.floor(W / FONT_SZ);
  drops = Array(cols).fill(0).map(() => Math.random() * -H / FONT_SZ);
}
init();
window.addEventListener('resize', init);

function drawMatrix() {
  ctx.fillStyle = 'rgba(0,10,0,0.05)';
  ctx.fillRect(0, 0, W, H);
  ctx.font = FONT_SZ + 'px "Share Tech Mono", monospace';

  for (let i = 0; i < cols; i++) {
    const char = CHARS[Math.floor(Math.random() * CHARS.length)];
    const x = i * FONT_SZ;
    const y = drops[i] * FONT_SZ;

    ctx.fillStyle  = drops[i] > 2 ? '#00ff41' : '#aaffbb';
    ctx.globalAlpha = Math.random() * 0.5 + 0.3;
    ctx.fillText(char, x, y);

    if (y > H && Math.random() > 0.975) drops[i] = 0;
    drops[i] += 0.5 + Math.random() * 0.5;
  }
  ctx.globalAlpha = 1;
}
setInterval(drawMatrix, 50);

// ── Random full-screen flicker ─────────────────────────────────────────
function randomFlicker() {
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position:fixed;inset:0;z-index:200;
    background:rgba(0,255,65,0.03);
    pointer-events:none;
  `;
  document.body.appendChild(overlay);
  setTimeout(() => overlay.remove(), 60 + Math.random() * 80);
  setTimeout(randomFlicker, 1500 + Math.random() * 5000);
}
randomFlicker();

// ── Glitch horizontal shift ────────────────────────────────────────────
const artEl = document.getElementById('asciiArt');
function glitchShift() {
  const shift = (Math.random() - 0.5) * 6;
  artEl.style.transform  = `translateX(${shift}px)`;
  artEl.style.textShadow = `
    ${shift * 2}px 0 #ff003c,
    ${-shift * 2}px 0 #00f0ff,
    0 0 10px var(--green),
    0 0 20px var(--green)
  `;
  setTimeout(() => {
    artEl.style.transform  = '';
    artEl.style.textShadow = '';
  }, 80 + Math.random() * 80);
  setTimeout(glitchShift, 800 + Math.random() * 4000);
}
glitchShift();
