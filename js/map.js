// ═══════════════════════════════════════════════════
// map.js — 노드 클릭 → 모달 오픈/클로즈 (data.js 연동)
// ═══════════════════════════════════════════════════

// ─── 모달 열기/닫기 ───────────────────────────────────
function openModal(nodeId) {
  const overlay = document.getElementById(`modal-${nodeId}`);
  const bodyEl = document.getElementById(`modal-body-${nodeId}`);
  if (!overlay) return;

  // 콘텐츠가 비어있으면 주입 (한 번만)
  if (bodyEl && !bodyEl.dataset.loaded) {
    bodyEl.innerHTML = resumeData[nodeId] ? resumeData[nodeId].content : '';
    bodyEl.dataset.loaded = 'true';
  }

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';

  // 포커스를 닫기 버튼으로 이동 (접근성)
  overlay.querySelector('.modal-close')?.focus();
}

function closeModal(overlay) {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function closeAllModals() {
  document.querySelectorAll('.modal-overlay.open').forEach(closeModal);
}

// ─── 이벤트 바인딩 ────────────────────────────────────
// 노드 클릭
document.querySelectorAll('.map-node').forEach(node => {
  node.addEventListener('click', () => openModal(node.dataset.node));
  // 키보드 접근성 (Enter / Space)
  node.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal(node.dataset.node);
    }
  });
});

// 오버레이 클릭으로 닫기
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal(overlay);
  });
});

// 닫기 버튼
document.querySelectorAll('.modal-close').forEach(btn => {
  btn.addEventListener('click', () => {
    closeModal(btn.closest('.modal-overlay'));
  });
});

// ESC 키로 닫기
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeAllModals();
});
