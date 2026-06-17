// ═══════════════════════════════════════════════════
// intro.js — 볼따구 드래그 인터랙션 + 씬 전환 -> 이제 안쓰는데 예비용 백업임
// ═══════════════════════════════════════════════════

// ─── 요소 참조 ───────────────────────────────────────
const wrapper = document.getElementById('bolddagu-wrapper');
const bolddagu = document.getElementById('bolddagu');
const skipBtn = document.getElementById('skip-btn');
const intro = document.getElementById('intro');
const mainMap = document.getElementById('main-map');

// ─── 드래그 상태 ──────────────────────────────────────
const MAX_DRAG = 150;   // 최대 이동 거리 (px)
let isDragging = false;
let startX = 0, startY = 0;
let currentX = 0, currentY = 0;

// ─── 씬 전환 ──────────────────────────────────────────
function enterMainMap() {
  intro.style.opacity = '0';
  intro.style.pointerEvents = 'none';
  mainMap.setAttribute('aria-hidden', 'false');
  setTimeout(() => {
    intro.style.display = 'none';
    mainMap.classList.add('visible');
  }, 500);
}

// ─── 드래그 로직 ──────────────────────────────────────
function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

function applyDrag(dx, dy) {
  const cx = clamp(dx, -MAX_DRAG, MAX_DRAG);
  const cy = clamp(dy, -MAX_DRAG, MAX_DRAG);
  const dist = Math.sqrt(cx * cx + cy * cy);
  const ratio = dist / MAX_DRAG;

  // 드래그 방향 반대축 압축 (찰진 느낌)
  const angle = Math.atan2(cy, cx);
  const stretch = 1 + ratio * 0.25;
  const squish = 1 - ratio * 0.15;
  const sx = Math.abs(Math.cos(angle)) > 0.5 ? stretch : squish;
  const sy = Math.abs(Math.sin(angle)) > 0.5 ? stretch : squish;

  bolddagu.style.transition = 'none';
  bolddagu.style.transform = `translate(${cx}px, ${cy}px) scale(${sx}, ${sy})`;
  currentX = cx;
  currentY = cy;
}

function releaseAndBounce() {
  // 스프링 복귀
  bolddagu.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
  bolddagu.style.transform = 'translate(0, 0) scale(1, 1)';

  bolddagu.addEventListener('transitionend', function onEnd() {
    bolddagu.removeEventListener('transitionend', onEnd);
    enterMainMap();
  }, { once: true });
}

// ─── 마우스 이벤트 ────────────────────────────────────
wrapper.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX;
  startY = e.clientY;
  e.preventDefault();
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  applyDrag(e.clientX - startX, e.clientY - startY);
});

document.addEventListener('mouseup', () => {
  if (!isDragging) return;
  isDragging = false;
  releaseAndBounce();
});

// ─── 터치 이벤트 (모바일) ─────────────────────────────
wrapper.addEventListener('touchstart', (e) => {
  isDragging = true;
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
  e.preventDefault();
}, { passive: false });

document.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  applyDrag(e.touches[0].clientX - startX, e.touches[0].clientY - startY);
  e.preventDefault();
}, { passive: false });

document.addEventListener('touchend', () => {
  if (!isDragging) return;
  isDragging = false;
  releaseAndBounce();
});

// ─── 스킵 버튼 ────────────────────────────────────────
skipBtn.addEventListener('click', () => {
  bolddagu.style.transition = 'none';
  enterMainMap();
});
