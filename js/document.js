// ═══════════════════════════════════════════════════
// document.js — 문서(지루하고 현학적인) 모드
// ═══════════════════════════════════════════════════

const DocMode = (() => {
  let rendered = false;

  function render() {
    if (rendered) return;

    const container = document.querySelector('.doc-page');
    if (!container) return;

    let html = `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 20px; margin-bottom: 40px; padding-bottom: 30px; border-bottom: 3px double #aaa; text-align: center;">
        <img src="img/profile.jpg" style="width: 120px; height: 120px; border-radius: 10px; border: 2px solid #555; object-fit: cover; object-position: center 20%; flex-shrink: 0; background-color: #fff;" alt="지원자 프로필 사진">
        <div>
          <h1 class="doc-title" style="margin-top: 0; margin-bottom: 10px;">조직문화 담당자 지원서</h1>
          <p class="doc-subtitle" style="margin: 0;">지원자 좌민우</p>
        </div>
      </div>
    `;

    const nodeIds = [1, 2, 3, 4, 5];
    nodeIds.forEach((id, i) => {
      const data = resumeData[id];
      if (!data) return;

      html += `
        <div class="doc-section">
          <h2 class="doc-section-title">
            <span class="doc-section-num">${i + 1}</span>
            ${data.docTitle ? '' : `<span class="doc-section-icon">${data.icon}</span>`}
            ${data.docTitle || data.title}
          </h2>
      `;

      if (data.docSections) {
        data.docSections.forEach(sub => {
          html += `
            <div class="doc-subsection">
              <h3 class="doc-subsection-title">${sub.heading}</h3>
              <p class="doc-subsection-body">${sub.body}</p>
            </div>
          `;
        });
      }

      html += `</div>`;
    });

    container.innerHTML = html;
    rendered = true;
  }

  // 인쇄 버튼 바인딩
  document.addEventListener('DOMContentLoaded', () => {
    const printBtn = document.querySelector('.doc-print-btn');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        // 인쇄 전에 문서 모드를 활성화하고 렌더링
        if (!rendered) render();
        window.print();
      });
    }
  });

  return { render };
})();
