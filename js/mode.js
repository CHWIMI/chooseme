// ═══════════════════════════════════════════════════
// mode.js — 모드 전환 매니저 (맵 / 카드 / 문서)
// ═══════════════════════════════════════════════════

const ModeManager = (() => {
  let currentMode = 'map';

  const modes = ['map', 'card', 'document'];
  const sectionIds = {
    map: 'main-map',
    card: 'card-mode',
    document: 'document-mode',
  };

  function switchMode(newMode) {
    if (newMode === currentMode) return;
    if (!modes.includes(newMode)) return;

    // 이전 모드 비활성
    const prevSection = document.getElementById(sectionIds[currentMode]);
    if (prevSection) {
      prevSection.classList.remove('active');
    }

    // 버튼 상태 갱신
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === newMode);
    });

    // 새 모드 활성
    const nextSection = document.getElementById(sectionIds[newMode]);
    if (nextSection) {
      nextSection.classList.add('active');
    }

    // body overflow 제어
    if (newMode === 'map') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // 카드 모드 진입 시 초기화
    if (newMode === 'card' && typeof CardMode !== 'undefined') {
      CardMode.init();
    }

    // 문서 모드 진입 시 렌더링
    if (newMode === 'document' && typeof DocMode !== 'undefined') {
      DocMode.render();
    }

    currentMode = newMode;
  }

  function getCurrentMode() {
    return currentMode;
  }

  // 이벤트 바인딩
  function init() {
    // 버튼 클릭
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        switchMode(btn.dataset.mode);
      });
    });

    // 기본 모드: 맵 활성
    const mapSection = document.getElementById(sectionIds.map);
    if (mapSection) {
      mapSection.classList.add('active');
    }
    document.querySelector('.mode-btn[data-mode="map"]')?.classList.add('active');
  }

  return { init, switchMode, getCurrentMode };
})();

// DOM 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
  ModeManager.init();
});

// ── PDF 뷰어 전용 로직 ──
window.openPdfViewer = function(pdfUrl) {
  const modal = document.getElementById('pdf-viewer-modal');
  const iframe = document.getElementById('pdf-iframe');
  if (modal && iframe) {
    iframe.src = pdfUrl;
    modal.classList.add('active');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const pdfModal = document.getElementById('pdf-viewer-modal');
  const pdfCloseBtn = document.querySelector('.pdf-modal-close');
  
  if (pdfModal && pdfCloseBtn) {
    pdfCloseBtn.addEventListener('click', () => {
      pdfModal.classList.remove('active');
      document.getElementById('pdf-iframe').src = '';
    });
    
    pdfModal.addEventListener('click', (e) => {
      if (e.target === pdfModal) {
        pdfModal.classList.remove('active');
        document.getElementById('pdf-iframe').src = '';
      }
    });
  }
});
