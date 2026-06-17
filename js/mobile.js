// ═══════════════════════════════════════════════════
// mobile.js — 모바일 전용 아코디언 뷰 렌더러 및 컨트롤러
// ═══════════════════════════════════════════════════

const MobileManager = (() => {
  let isMobile = false;
  let accordionCreated = false;

  // 1) 아코디언 요소 생성 및 이벤트 바인딩
  function createAccordion() {
    const container = document.getElementById('mobile-accordion');
    if (!container || accordionCreated) return;

    // resumeData가 정상 로드되었는지 확인
    if (typeof resumeData === 'undefined') {
      console.error('resumeData is not defined. Make sure data.js is loaded first.');
      return;
    }

    // 데이터 기반 아코디언 아이템 렌더링
    for (let key in resumeData) {
      const data = resumeData[key];
      const item = document.createElement('div');
      item.className = 'accordion-item';
      item.dataset.node = key;

      item.innerHTML = `
        <button class="accordion-header" aria-expanded="false" aria-controls="accordion-content-${key}">
          <span class="accordion-icon">${data.icon || '📍'}</span>
          <span class="accordion-title">${data.stageLabel || data.title}</span>
          <span class="accordion-arrow">▼</span>
        </button>
        <div class="accordion-content" id="accordion-content-${key}">
          <div class="accordion-content-inner">
            ${data.content}
          </div>
        </div>
      `;

      container.appendChild(item);
    }

    // 아코디언 클릭 핸들러
    const headers = container.querySelectorAll('.accordion-header');
    headers.forEach(header => {
      header.addEventListener('click', () => {
        const item = header.closest('.accordion-item');
        const content = item.querySelector('.accordion-content');
        const isOpen = item.classList.contains('active');

        if (isOpen) {
          // 접기
          content.style.maxHeight = '0px';
          item.classList.remove('active');
          header.setAttribute('aria-expanded', 'false');
        } else {
          // 펼치기
          content.style.maxHeight = content.scrollHeight + 'px';
          item.classList.add('active');
          header.setAttribute('aria-expanded', 'true');
        }
      });
    });

    // 최초 렌더 시 1스테이지(교주의 스테이터스 창) 기본 펼치기
    const firstItem = container.querySelector('.accordion-item[data-node="1"]');
    if (firstItem) {
      const header = firstItem.querySelector('.accordion-header');
      const content = firstItem.querySelector('.accordion-content');
      firstItem.classList.add('active');
      header.setAttribute('aria-expanded', 'true');

      // DOM 렌더 타임 딜레이 대응을 위해 두 번 설정
      content.style.maxHeight = content.scrollHeight + 'px';
      setTimeout(() => {
        content.style.maxHeight = content.scrollHeight + 'px';
      }, 150);
    }

    accordionCreated = true;
  }

  // 2) 리사이즈 등으로 해상도 변경 시 활성화된 아코디언 높이 재계산
  function updateActiveHeights() {
    const container = document.getElementById('mobile-accordion');
    if (!container) return;
    const activeItems = container.querySelectorAll('.accordion-item.active');
    activeItems.forEach(item => {
      const content = item.querySelector('.accordion-content');
      if (content) {
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  }

  // 3) 뷰포트 체크 및 분기 처리
  function checkViewport() {
    const width = window.innerWidth;
    const wasMobile = isMobile;
    isMobile = width <= 768;

    if (isMobile) {
      // 모바일 모드 진입
      if (!wasMobile) {
        document.body.style.overflow = 'auto';
      }
      createAccordion();
      updateActiveHeights();
    } else {
      // 데스크톱 모드 복원
      if (wasMobile) {
        if (typeof ModeManager !== 'undefined') {
          const current = ModeManager.getCurrentMode();
          if (current === 'map') {
            document.body.style.overflow = 'hidden';
          } else {
            document.body.style.overflow = '';
          }
        }
      }
    }
  }

  function init() {
    checkViewport();
    // 모바일 기기 회전 및 창 리사이즈 대응
    window.addEventListener('resize', checkViewport);
  }

  return { init };
})();

// DOM 완료 시 실행
document.addEventListener('DOMContentLoaded', () => {
  MobileManager.init();
});
