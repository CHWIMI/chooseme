// ═══════════════════════════════════════════════════
// card.js — 카드 모드 (슬라이더 + 닷 네비 + 미니 목차)
// ═══════════════════════════════════════════════════

const CardMode = (() => {
  let currentIndex = 0;
  let initialized = false;
  const nodeIds = [1, 2, 3, 4, 5];

  function buildCards() {
    const slider = document.querySelector('.card-slider');
    if (!slider || slider.dataset.built) return;

    // 카드 생성
    nodeIds.forEach((id, i) => {
      const data = resumeData[id];
      if (!data) return;

      const card = document.createElement('div');
      card.className = 'card-item';
      card.dataset.index = i;
      let cardContent = data.content;
      if (id === 3) {
        cardContent = `
          <div style="text-align: center; padding: 40px 20px;">
            <p style="font-size: 1.1rem; line-height: 1.6; color: var(--navy); margin-bottom: 20px;">
              이벤트 기획, 웹사이트 개발, 이스터에그 디자인 등<br>
              다양한 역량을 쏟아부은 <strong>메인 프로젝트</strong>입니다.
            </p>
            <p style="font-size: 0.95rem; color: #666; margin-bottom: 30px;">
              ※ 내용이 방대하여 카드 모드에서는 요약만 제공됩니다.
            </p>
            <button onclick="document.querySelector('[data-mode=map]').click(); setTimeout(() => openModal(3), 100);" style="padding: 12px 24px; background: var(--pink); color: white; border: none; border-radius: 8px; font-weight: bold; font-size: 1rem; cursor: pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.15); transition: transform 0.2s;">
              전체 내용 열어보기 🗺️
            </button>
          </div>
        `;
      }

      card.innerHTML = `
        <div class="card-header">
          <span class="card-icon">${data.icon}</span>
          <h2>${data.title}</h2>
          <span class="card-stage-badge">${data.stageLabel}</span>
        </div>
        <div class="card-body">${cardContent}</div>
      `;
      slider.appendChild(card);
    });

    // 닷 인디케이터 생성
    const dotsContainer = document.querySelector('.card-dots');
    if (dotsContainer) {
      nodeIds.forEach((id, i) => {
        const dot = document.createElement('button');
        dot.className = 'card-dot';
        dot.dataset.index = i;
        dot.setAttribute('aria-label', resumeData[id]?.title || `카드 ${i + 1}`);
        dot.addEventListener('click', () => goToCard(i));
        dotsContainer.appendChild(dot);
      });
    }

    // 미니 목차 생성
    const tocContainer = document.querySelector('.card-toc');
    if (tocContainer) {
      nodeIds.forEach((id, i) => {
        const data = resumeData[id];
        if (!data) return;
        const tocItem = document.createElement('button');
        tocItem.className = 'card-toc-item';
        tocItem.dataset.index = i;
        tocItem.textContent = `${data.icon} ${data.title}`;
        tocItem.addEventListener('click', () => goToCard(i));
        tocContainer.appendChild(tocItem);
      });
    }

    slider.dataset.built = 'true';
  }

  function updateCards() {
    const cards = document.querySelectorAll('.card-item');
    cards.forEach((card, i) => {
      card.classList.remove('active', 'prev', 'next');
      if (i === currentIndex) {
        card.classList.add('active');
      } else if (i === currentIndex - 1) {
        card.classList.add('prev');
      } else if (i === currentIndex + 1) {
        card.classList.add('next');
      }
    });

    // 닷 갱신
    document.querySelectorAll('.card-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });

    // 미니 목차 갱신
    document.querySelectorAll('.card-toc-item').forEach((item, i) => {
      item.classList.toggle('active', i === currentIndex);
    });

    // 좌우 버튼 상태
    const prevBtn = document.querySelector('.card-nav-btn.prev-btn');
    const nextBtn = document.querySelector('.card-nav-btn.next-btn');
    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex === nodeIds.length - 1;
  }

  function goToCard(index) {
    if (index < 0 || index >= nodeIds.length) return;
    currentIndex = index;
    updateCards();
  }

  function prevCard() {
    goToCard(currentIndex - 1);
  }

  function nextCard() {
    goToCard(currentIndex + 1);
  }

  function init() {
    if (initialized) {
      updateCards();
      return;
    }

    buildCards();
    updateCards();

    // 좌우 버튼
    document.querySelector('.card-nav-btn.prev-btn')?.addEventListener('click', prevCard);
    document.querySelector('.card-nav-btn.next-btn')?.addEventListener('click', nextCard);

    // 키보드: 좌우 화살표
    document.addEventListener('keydown', (e) => {
      if (ModeManager.getCurrentMode() !== 'card') return;
      if (e.key === 'ArrowLeft') prevCard();
      if (e.key === 'ArrowRight') nextCard();
    });

    // 터치 스와이프
    let touchStartX = 0;
    let touchStartY = 0;
    const cardSection = document.getElementById('card-mode');
    if (cardSection) {
      cardSection.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }, { passive: true });

      cardSection.addEventListener('touchend', (e) => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        const dy = e.changedTouches[0].clientY - touchStartY;
        // 수평 스와이프만 반응 (수직 스크롤 방해 방지)
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
          if (dx < 0) nextCard();
          else prevCard();
        }
      }, { passive: true });
    }

    initialized = true;
  }

  return { init, goToCard, prevCard, nextCard };
})();
