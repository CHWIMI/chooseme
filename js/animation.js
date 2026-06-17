// ═══════════════════════════════════════════════════
// animation.js — 60fps 고정 타임스텝 루프 유틸리티
// ═══════════════════════════════════════════════════
// 볼따구 드래그는 CSS transition으로 처리하므로 이 루프 불필요.
// 추후 파티클/게임 요소 추가 시 사용.

const TARGET_FPS = 60;
const FRAME_DURATION = 1000 / TARGET_FPS; // ~16.67ms

let _lastTime = null;
let _loopId = null;

function startLoop(callback) {
  function loop(timestamp) {
    if (_lastTime === null) _lastTime = timestamp;
    const elapsed = timestamp - _lastTime;

    // 프레임 건너뜀 방지: 탭 비활성화 후 복귀 시 큰 delta 클램핑
    const delta = Math.min(elapsed, FRAME_DURATION * 5) / FRAME_DURATION;

    callback(delta);
    _lastTime = timestamp;
    _loopId = requestAnimationFrame(loop);
  }
  _loopId = requestAnimationFrame(loop);
}

function stopLoop() {
  if (_loopId !== null) {
    cancelAnimationFrame(_loopId);
    _loopId = null;
    _lastTime = null;
  }
}
