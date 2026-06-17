// ═══════════════════════════════════════════════════
// data.js — 이력서 콘텐츠 데이터 (모든 모드 공용)
// ═══════════════════════════════════════════════════

// 공통 슬라이더 렌더링 함수 모듈
window.createCarousel = function (images) {
  if (!images || images.length === 0) return '';
  const carouselId = 'carousel_' + Math.random().toString(36).substr(2, 9);

  let html = `<div class="insta-carousel" id="${carouselId}">`;
  if (images.length > 1) {
    html += `<button class="carousel-btn prev" onclick="moveCarousel('${carouselId}', -1)">&#10094;</button>`;
  }
  html += `<div class="carousel-inner" onscroll="updateCarouselDots('${carouselId}')">`;

  images.forEach(imgUrl => {
    html += `<div class="carousel-slide" onclick="openLightbox('${imgUrl}')">
               <div class="carousel-img" style="background-image: url('${imgUrl}');"></div>
             </div>`;
  });

  html += `</div>`;

  if (images.length > 1) {
    html += `<div class="carousel-indicators" id="dots_${carouselId}">`;
    images.forEach((_, idx) => {
      html += `<span class="carousel-dot ${idx === 0 ? 'active' : ''}"></span>`;
    });
    html += `</div>`;
    html += `<button class="carousel-btn next" onclick="moveCarousel('${carouselId}', 1)">&#10095;</button>`;
  }

  html += `</div>`;

  return html;
};

const resumeData = {
  // ── 노드1: 교주의 스테이터스 (About Me) ──
  1: {
    title: '교주의 스테이터스',
    docTitle: '기본 정보',
    icon: '🪪',
    stageLabel: '[Stage 1] 스테이터스',
    // 맵 모달 + 카드 모드용 HTML 콘텐츠
    content: `
      <div style="display:flex; justify-content:center;">
        <div class="tc-profile-container">
          <div class="tc-profile-inner">
            <div class="tc-profile-title">지원자 프로필</div>
            <div class="tc-profile-name">좌민우</div>
            <div class="tc-profile-roman">Jwa Minu | 에피드 게임즈 조직문화 지원자</div>
          </div>
          <div class="tc-profile-body">
            <div class="tc-profile-avatar-placeholder" style="background-image: url('img/profile.jpg'); background-size: cover; background-position: center 20%;"></div>
            <table class="tc-profile-table">
              <tbody>
                <tr>
                  <th>연락처</th>
                  <td>010-9264-3635 / 96whkalsn@naver.com</td>
                </tr>
                <tr>
                  <th>주소(사는 곳)</th>
                  <td>대구광역시 달성군 다사읍</td>
                </tr>
                <tr>
                  <th>학력</th>
                  <td>
                    [여주대학교]<br>
                    <span class="small">(실용음악학과 / 학사 / 2018 - 2019)</span><br>
                    [영진전문대학교]<br>
                    <span class="small">(간호학 / 학사 / 2022 - 2025)</span>
                  </td>
                </tr>
                <tr>
                  <th>경력 사항</th>
                  <td>
                    [대구보훈병원]<br>
                    <span class="small">(25.08.01 - 25.10.01 / 계약직 / 수술실 간호사)</span><br>
                    [한국재정정보원]<br>
                    <span class="small">(25.10.01 - 25.12.27 / 청년인턴 / 인재경영부 사무보조)</span><br>
                    [신용보증기금]<br>
                    <span class="small">(25.12.29 - / 육아휴직대체 계약직 / 빅데이터부 사무보조)</span><br>
                  </td>
                </tr>
                <tr>
                  <th>특이사항</th>
                  <td>2.5 타쿠 <span class="small"> - 케이온 보고 음악 전공 선택</span><br>
                  보건관리 가능 <span class="small"> - 간호사 면허 보유</span></td>
                </tr>
                <tr>
                  <th>좋아하는 것</th>
                  <td>기획, 발표, 강의, 탐구, 귀여운 존재</td>
                </tr>
                <tr>
                  <th>단점</th>
                  <td>일 너무 좋아 청년</td>
                </tr>
                <tr>
                  <th>소원</th>
                  <td>최고의 게임을 만드는 '성덕' 동료들의 건강과 멘탈을 책임지는 전담 힐러</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `,
    // 문서 모드용 순수 텍스트 구조. document.js에서 사용. 인쇄용임. 진지하게 만들어야 함.
    docSections: [
      { heading: '기본 정보', body: '이름: 좌민우 | Jwa Minu\n연락처: 010-9264-3635 | 96whkalsn@naver.com\n주소: 대구광역시 달성군 다사읍' },
      { heading: '학력', body: '· [여주대학교] (실용음악학과 / 학사 / 2018 - 2019)\n· [영진전문대학교] (간호학 / 학사 / 2022 - 2025)' },
      { heading: '경력 사항', body: '· [대구보훈병원] (25.08.01 - 25.10.01 / 계약직 / 수술실 간호사)\n· [한국재정정보원] (25.10.01 - 25.12.27 / 인재경영부 청년인턴 / 사무보조)\n· [신용보증기금] (25.12.29 - / 육아휴직대체 계약직 / 빅데이터부 사무보조)' },
      { heading: '특이사항', body: '2.5 타쿠 — 케이온 보고 음악 전공 선택\n보건관리 가능 — 간호사 면허 보유' },
      { heading: '좋아하는 것', body: '기획, 발표, 강의, 탐구, 귀여운 존재' },
      { heading: '단점', body: '몸 보다 일을 우선하는 태도' },
      { heading: '소원', body: '최고의 서브컬처 게임을 만드는 동료들이 \'덕업일치\'를 건강하게 이룰 수 있는 환경 만들기' },
    ]
  },

  // ── 노드2: 퀘스트 보드 (Work Experience) ──
  2: {
    title: '퀘스트 보드',
    docTitle: '주요 성과 및 개선 경험',
    icon: '📋',
    stageLabel: '[Stage 2] 퀘스트 보드',
    content: `
      <span class="quest-tag">메인 퀘스트</span>
      <strong>복리후생 제도 기획 및 사내 홍보물 제작</strong>

      <div class="meme-container">
        <!-- 나쁜 예시 (Before) -->
        <div class="meme-row bad">
          <div class="meme-header bad-text">지루하고 현학적인 기획 보고서 (Before)</div>
          <div class="meme-content">
            <div class="meme-speech-bubble">"글이 너무 빽빽해서 눈에 안 들어와..."</div>
            <div class="meme-points bad-points">
              <span>- 줄글과 표로 가득 찬 도입 계획(안)</span>
              <span>- 지루하고 현학적이고 숨이 턱 막힘</span>
              <span>- 임직원들이 끝까지 읽을 리 만무함</span>
              <span>- 바쁘다 바빠 현대 사회,<br>인트라넷에 올렸다가 묻힐 확률 100%</span>
            </div>
          </div>
          <button class="pdf-thumb-btn" onclick="openPdfViewer('pdf/before.pdf')">📄 Before (보고서) 보기</button>
        </div>

        <!-- 좋은 예시 (After) -->
        <div class="meme-row good">
          <div class="meme-header good-text">임직원을 위한 세련된 사내 홍보물 (After)</div>
          <div class="meme-content">
            <div class="meme-speech-bubble">"아!"</div>
            <div class="meme-points good-points">
              <span>- 포토샵으로 한눈에 쏙 들어오게 가공</span>
              <span>- 핵심 혜택만 명확하게 강조</span>
              <span>- 보기 좋음(팩트임)</span>
              <span>- 기획력과 콘텐츠 제작 역량의 적절한 융합</span>
            </div>
          </div>
          <button class="pdf-thumb-btn" onclick="openPdfViewer('pdf/after.pdf')">📄 After (카드뉴스) 보기</button>
        </div>
      </div>
      
      <br>
      <span class="quest-tag">서브 퀘스트</span>
      <strong>지식 공유 및 협업 인프라 구축</strong>

      <p class="desc-text" style="margin-top:0.5rem;">
        <strong>· Notion 기반 협업 환경 세팅</strong><br>
        밴드 및 학과 활동에서 파편화된 정보를 모으기 위해 Notion 기반 회의록 및 일정 관리 시스템 도입 → 멤버들이 직관적이고 편하게 활용하는 인프라 구축.<br><br>
        <strong>· 사내 강사급 교육 역량</strong><br>
        학부 재학 중 교수님을 대신해 한 학기 보충 수업 진행, 학원 강사 경험 등 지식 전달과 멘토링에 능숙함.
      </p>

      <br>
      <span class="miniquest-tag">미니 퀘스트</span>
      <strong>사내 문화 아이디어 공모전</strong>

      <p class="desc-text" style="margin-top:0.5rem;">
        <strong>· 신용보증기금 사내 공모전 아이디어 채택</strong><br>
        사내 소통 활성화를 위한 공모전 참가, <strong>기획안 2건 최종 채택 및 회의 안건 상정</strong> (부상 수령)<br><br>
        <strong>1. 순환 근무자를 위한 '버디버디 프로그램'</strong><br>
        주기적 순환 근무로 타지/타부서에 홀로 발령받는 직원들의 조기 적응을 위한 버디 매칭 및 인센티브 연계 미션 활동 제안<br><br>
        <strong>2. 자발적 일상 소통을 위한 'FIKA' 도입</strong><br>
        업무 중심 대화에서 벗어나 캐주얼하게 일상을 공유하는 스웨덴식 티타임 문화 제안
      </p>
    `,
    // 문서 모드용 순수 텍스트 구조. document.js에서 사용. 인쇄용임. 진지하게 만들어야 함.
    docSections: [
      { heading: '복리후생 제도 기획 및 사내 홍보물 제작', body: '· 사내 임직원 복지 향상을 위한 비금전적 복리후생 제도 도입 계획(안) 수립 및 타 기관 사례 분석 보고서 작성\n· 복잡하고 빽빽한 보고서 형식을 탈피하고, 실무진과 결재권자가 직관적으로 이해할 수 있도록 AI와 포토샵을 활용한 카드뉴스 형식의 사내 홍보 설명 자료 직접 제작' },
      { heading: '지식 공유 및 협업 인프라 구축', body: '· 파편화된 정보를 모으기 위해 Notion 기반 회의록, 일정 관리 시스템을 도입하여 팀 생산성 향상.\n· 학부 재학 중 교수님을 대신해 한 학기 보충 수업 진행, 학원 강사 경험 등 지식 전달과 멘토링에 능숙함.' },
      { heading: '사내 문화 아이디어 공모전 채택', body: '· 신용보증기금 사내 공모전에서 조직 소통 활성화를 위한 아이디어 2건 채택 및 공식 회의 안건 상정\n· [버디버디 프로그램]: 주기적 순환 근무로 인한 타지·타부서 신규 발령자의 적응을 돕기 위해, 부서 내 버디 매칭 및 인센티브 연계 미션 기획\n· [FIKA 프로그램]: 자발적 참여 기반의 캐주얼 티타임 문화를 제안하여 일상적 소통 활성화 도모' }
    ]
  },

  // ── 노드3: 대규모 레이드 (Event Masterpiece) ──
  3: {
    title: '대규모 레이드',
    docTitle: '프로젝트 기획 및 운영 경험',
    icon: '🎪',
    stageLabel: '[Stage 3] 대규모 레이드',
    content: `
      <!-- Page 1: 개요 -->
      <div class="stage3-page active" id="s3_page_1">
        <div class="carousel-section">
          <p class="section-title" style="margin-top: 0;">개요</p>
          ${createCarousel(['img/event/1.jpg'])}
          <div class="highlight-box" style="margin-top: 15px;">
            · 스트리머 생일 팬 이벤트 기획/운영 참여.<br>
            · 홍대입구 지하철역 광고판에 QR코드 게재 → 사이트 연결.
          </div>
        </div>
        <div class="s3-nav-container" style="justify-content: flex-end;">
          <button class="s3-nav-btn next-btn" onclick="switchStage3Page(2)">티저 사이트 ▶</button>
        </div>
      </div>

      <!-- Page 2: 티저 사이트 -->
      <div class="stage3-page" id="s3_page_2">
        <div class="carousel-section">
          <p class="section-title" style="margin-top: 0;">
            티저 사이트
            <a href="https://chwimi.github.io/teaser/" target="_blank" class="link-chip">🔗 보러가기</a>
          </p>
          ${createCarousel(['img/event/1.webp', 'img/event/2.webp', 'img/event/1.png', 'img/event/2.png'])}
          <div class="highlight-box" style="margin-top: 15px; font-size: 0.95rem; line-height: 1.6;">
            · <strong>게이미피케이션(Gamification) 도입:</strong> 'Papers, Please' 패러디와 미니 방탈출 콘셉트로 강렬한 첫인상 부여<br>
            · <strong>팬덤 밈(Meme) 스토리텔링:</strong> 팬들만 아는 내부 밈(지하실 등)을 콘텐츠화하여 유저들의 깊은 공감대 형성<br>
            · <strong>목적지 도달률 상승:</strong> 생일 암호를 풀어야 본사이트로 넘어가는 미션을 주어, 진입 자체를 '놀이'로 전환해 기대감 증폭
          </div>
        </div>
        <div class="s3-nav-container">
          <button class="s3-nav-btn prev-btn" onclick="switchStage3Page(1)">◀ 개요</button>
          <button class="s3-nav-btn next-btn" onclick="switchStage3Page(3)">본사이트 ▶</button>
        </div>
      </div>

      <!-- Page 3: 본사이트 -->
      <div class="stage3-page" id="s3_page_3">
        <div class="carousel-section">
          <p class="section-title" style="margin-top: 0;">
            본사이트
            <a href="https://chwimi.github.io/0409-memories/" target="_blank" class="link-chip">🔗 보러가기</a>
          </p>
          ${createCarousel(['img/event/3.png', 'img/event/4.png', 'img/event/5.png'])}
          <div class="highlight-box" style="margin-top: 15px; font-size: 0.95rem; line-height: 1.6;">
            · <strong>대규모 협업 아카이빙:</strong> 20명 이상의 일러스트·영상·음악 크리에이터가 참여한 팬 프로젝트의 온라인 허브 구축<br>
            · <strong>온·오프라인 팬덤 연결:</strong> 지하철 전광판 이벤트와 연계하여 갤러리, 후원자 명단 등을 종합적으로 큐레이션<br>
            · <strong>유저 인터랙션 극대화:</strong> 정적인 갤러리를 넘어, 방명록 및 이스터에그(미니게임 등)를 배치하여 유저 체류 시간 연장
          </div>
        </div>
        <div class="s3-nav-container">
          <button class="s3-nav-btn prev-btn" onclick="switchStage3Page(2)">◀ 티저 사이트</button>
          <button class="s3-nav-btn next-btn" onclick="switchStage3Page(4)">방명록 ▶</button>
        </div>
      </div>

      <!-- Page 4: Firebase 방명록 -->
      <div class="stage3-page" id="s3_page_4">
        <div class="carousel-section">
          <p class="section-title" style="margin-top: 0;">Firebase 방명록</p>
          ${createCarousel(['img/event/6.png', 'img/event/7.png', 'img/event/8.png'])}
          <div class="highlight-box" style="margin-top: 15px; font-size: 0.95rem; line-height: 1.6;">
            · <strong>Backend/DB 직접 구현:</strong> Firebase를 활용해 소셜 로그인(Google)·익명 인증 및 게시글 CRUD, 관리자 블라인드 시스템 구축<br>
            · <strong>리스크 관리 및 보안:</strong> 불특정 다수가 참여하는 이벤트 특성을 고려, XSS 취약점 등 사전 보안 테스트 및 규칙 공고를 통해 무사고 이벤트 운영 달성<br>
            · <strong>운영 자동화:</strong> Firebase Security Rules를 설정하여 지정된 이벤트 종료 시각에 DB 쓰기 권한이 자동 차단되도록 설계
          </div>
        </div>
        <div class="s3-nav-container">
          <button class="s3-nav-btn prev-btn" onclick="switchStage3Page(3)">◀ 본사이트</button>
          <button class="s3-nav-btn next-btn" onclick="switchStage3Page(5)">이스터에그 ▶</button>
        </div>
      </div>

      <!-- Page 5: 이스터에그 -->
      <div class="stage3-page" id="s3_page_5">
        <div class="carousel-section">
          <p class="section-title" style="margin-top: 0;">이스터에그 4종</p>
          ${createCarousel(['img/event/3.webp', 'img/event/4.webp', 'img/event/5.webp'])}
          <div class="highlight-box" style="margin-top: 15px; font-size: 0.95rem; line-height: 1.6;">
            · <strong>게이미피케이션 기반 미니게임:</strong> 화면을 배회하는 캐릭터를 잡으면 시작되는 미니게임 구현 (Firebase 실시간 랭킹 연동 및 409점 달성 시 히든 보상)<br>
            · <strong>팬덤 맞춤형 디테일 설계:</strong> '방구석 스트리머' 밈을 살려 야외(전광판) 페이지 등장 확률은 1%로 낮추고, 생일 시각(4:09)에만 등장하는 시간 한정 이벤트 기획<br>
            · <strong>숨겨진 인터랙션(이스터에그):</strong> 텍스트 5회 연속 클릭 시 히든 화면 전환, 크레딧 복사 시 비밀 메시지 출력 등 탐험 요소를 배치하여 긍정적 반응 및 유저 체류 시간 연장
            <div style="margin-top: 12px; padding: 12px 14px; background: #fdf8e4; border: 1px dashed #e5c07b; border-radius: 8px; font-size: 0.9rem; color: #555;">
              💡 <strong>Tip: 직접 체험하기!</strong><br>
              - <a href="https://chwimi.github.io/0409-memories/" target="_blank" style="color:var(--navy); font-weight:bold; text-decoration:underline;">본사이트</a>에서 <em>'모아는 청초가 맞다'</em> 텍스트를 빠르게 5번 연속 클릭해 보세요.<br>
              - PC 시간을 <strong>오후 4시 7분</strong>으로 변경 후 본사이트에 접속해 보세요. 4시 9분이 되면 캐릭터가 랜덤하게 나타납니다.<br>
              - 본사이트 접속 후 1분 동안 멍때리면 돌아다니는 도트 캐릭터를 구경할 수 있고, 도망다니는 도트 캐릭터를 잡으면 티라노 게임이 시작됩니다.
            </div>
          </div>
        </div>
        <div class="s3-nav-container">
          <button class="s3-nav-btn prev-btn" onclick="switchStage3Page(4)">◀ 방명록</button>
          <button class="s3-nav-btn next-btn" onclick="switchStage3Page(6)">사운드/영상 ▶</button>
        </div>
      </div>

      <!-- Page 6: 사운드/영상 -->
      <div class="stage3-page" id="s3_page_6">
        <div class="carousel-section">
          <p class="section-title" style="margin-top: 0;">사운드/영상</p>
          <a href="https://youtube.com/playlist?list=PLdLT3WoibsPLNgiuHAdVwslhfJ88ZxwPM&si=u6qAbUoNxhudwd-F" target="_blank" class="link-chip">🎶 전체 감상하기</a>
          <div style="display: flex; flex-direction: column; gap: 15px; margin-top: 15px;">
            <!-- 영상 1: 단일 유튜브 영상 -->
            <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
              <iframe class="resume-media" src="https://www.youtube.com/embed/USxB25AfwSw?enablejsapi=1" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
          <div class="highlight-box" style="margin-top: 15px; font-size: 0.95rem; line-height: 1.6;">
            · <strong>오리지널 사운드트랙:</strong> 생일 이벤트 분위기에 맞춘 전용 BGM 및 음악 작곡 기획<br>
            · <strong>뮤직비디오 총괄:</strong> 일러스트레이터 및 영상 편집자와 협업하여 뮤직비디오 기획 및 디렉팅 수행
          </div>
        </div>
        <div class="s3-nav-container" style="justify-content: flex-start;">
          <!-- ◀ 버튼 누를 때 미디어 정지 함수 호출 -->
          <button class="s3-nav-btn prev-btn" onclick="stopAllMedia(); switchStage3Page(5)">◀ 이스터에그</button>
        </div>
      </div>
    `,
    // 문서 모드용 순수 텍스트 구조. document.js에서 사용. 인쇄용임. 진지하게 만들어야 함.
    docSections: [
      { heading: '개요', body: '· 스트리머 생일 팬 이벤트 기획/운영 참여.\n· 홍대입구 지하철역 전광판에 QR코드 게재 → 사이트 연결 이벤트 진행' },
      { heading: '티저 사이트', body: '· [게이미피케이션 도입] 미니 방탈출 콘셉트와 인디 게임 패러디를 통해 접속자에게 강렬한 첫인상 부여\n· [스토리텔링] 팬덤 내부의 밈(Meme)을 적극 활용한 기획으로 유저들의 기대감 증폭 및 본사이트 진입률 극대화' },
      { heading: '본사이트', body: '· [대규모 아카이빙 허브] 20명 이상의 크리에이터가 참여한 팬아트 및 팬영상을 종합적으로 큐레이션\n· [유저 인터랙션 극대화] 정적인 갤러리를 넘어, 방명록 및 이스터에그 미니게임 등을 배치하여 유저 체류 시간 연장' },
      { heading: '방명록 시스템 직접 구현', body: '· [풀스택 역량] Firebase 기반 인증(Google·익명) 및 실시간 DB를 활용하여 방명록 CRUD 및 관리자 블라인드 시스템 구축\n· [리스크 관리] 불특정 다수 참여를 고려한 XSS 등 웹 보안 취약점 사전 대응으로 무사고 이벤트 운영 달성\n· [운영 자동화] Firebase Rules 설정을 통해 이벤트 종료 시 방명록 작성이 자동 차단되도록 설계하여 관리 리소스 최소화' },
      { heading: '이스터에그 기획 및 유저 인게이지먼트', body: '· [게이미피케이션] 화면을 배회하는 캐릭터 포획 시 시작되는 웹 미니게임 및 실시간 랭킹(Firebase)을 구현하여 유저 간 경쟁과 몰입 유도\n· [디테일 설계] 스트리머의 밈을 반영하여 페이지별 캐릭터 등장 확률을 차등 설정(야외 1% vs 실내 33%)하고, 생일 시각(4:09) 한정 이벤트를 기획\n· [숨겨진 인터랙션] 텍스트 5회 클릭 시 히든 화면 전환, 크레딧 복사 시 시크릿 메시지 출력 등 탐험 요소를 곳곳에 배치하여 사이트 체류 시간 극대화' },
      { heading: '사운드/영상', body: '· 아트, 비디오 인력과 협업하여 제작\n· BGM 작곡 · 생일 축하곡 제작 · 뮤직비디오 기획 총괄' },
    ]
  },

  // ── 노드4: 연금술 공방 (Automation & Data) ──
  4: {
    title: '연금술 공방',
    docTitle: '업무 프로세스 효율화 및 자동화',
    icon: '⚗️',
    stageLabel: '[Stage 4] 연금술 공방',
    content: `
      <p class="desc-text" style="font-style:italic;color:var(--color-purple-light);">
        "자동 전투 모듈 탑재. 실행합니다."
      </p>

      <p class="section-title">법원 공고 데이터 자동화</p>
      <p class="desc-text">
        법원 공개 공고 약 5,500건을 수작업 처리해야 하는 업무 발생<br>
        → Python + Selenium 기반 자동화 툴을 바이브코딩으로 직접 설계·구현.<br>
        자동 스크래핑 → 자동 정리, 저장 → 수동 검증 → 최종 저장되는 구조
      </p>

      <div class="highlight-box">
        <strong>스크래핑 프로그램의 주요 구조</strong><br>
        · Tkinter GUI — GUI 환경에서 직접 조작 가능<br>
        · 페이지/날짜/법원/법인구분 필터 설정<br>
        · 공고 데이터 자동 추출 + PDF 자동 다운로드<br>
        · PDF 파일명 자동 정리 (공고순번_사건번호_채무자_공고일_공고내용)<br>
        · pdfplumber로 대표이사·관리인·주소 자동 파싱<br>
        · 파싱 실패 시 수동 입력 팝업(Fallback) 자동 호출<br>
        · 세션 간 누적 데이터 지원
      </div>

      <div class="highlight-box">
        <strong>수동 검증 프로그램의 주요 구조</strong><br>
        · 자동 추출 결과물 수동 검증용 GUI 프로그램<br>
        · PDF 자동 열기 → 데이터 확인/수정<br>
        · Enter(확인) / Esc(건너뛰기) 키보드 단축키 기능 구현<br>
        · 타이머 · 자동 백업 · 이어하기 기능 구현<br>
        · ctypes로 PDF 뷰어 창 자동 닫기 (Windows) 기능 구현
      </div>
      <p class="section-title">포부</p>
      <p class="desc-text" style="margin-top:0.8rem;color:var(--color-purple-light);">
        조직문화 담당자로서 마주할 데이터 취합/반복 업무를 자동화하고,<br>
        남는 리소스를 온전히 문화 기획에 투입하겠습니다.
      </p>
    `,
    // 문서 모드용 순수 텍스트 구조. document.js에서 사용. 인쇄용임. 진지하게 만들어야 함.
    docSections: [
      { heading: '법원 공고 데이터 처리 자동화', body: '· 약 5,500건의 법원 공개 공고를 수작업으로 처리해야 하는 비효율적인 업무 프로세스 발견\n· Python과 Selenium을 활용하여 데이터 추출부터 검증, 저장까지 이어지는 자동화 솔루션 직접 설계 및 구현\n· 단순 반복 업무를 최소화하고 데이터 처리의 정확도와 속도 대폭 향상' },
      { heading: '데이터 스크래핑 및 파싱 시스템 구축', body: '· Tkinter 기반 GUI를 도입하여 실무자가 직관적으로 필터를 설정하고 조작할 수 있는 환경 제공\n· 공고 데이터 자동 추출 및 관련 PDF 파일 자동 다운로드, 체계적인 파일명(순번_사건번호_채무자 등) 일괄 변경 기능 구현\n· pdfplumber를 활용해 문서 내 핵심 정보(대표이사, 관리인, 주소 등)를 자동으로 파싱하고, 파싱 실패 시 수동 입력(Fallback) 팝업을 띄워 예외 상황 대응' },
      { heading: '수동 검증 및 사용자 편의 시스템 도입', body: '· 스크래핑된 결과물을 효율적으로 확인하고 수정할 수 있는 수동 검증용 전용 GUI 프로그램 개발\n· 단축키(Enter/Esc) 지원, 자동 백업, 이어하기, PDF 뷰어 자동 제어(ctypes 활용) 등 실무자의 업무 피로도를 낮추고 작업 효율을 극대화하는 편의 기능 다수 구현' },
      { heading: '향후 포부', body: '· 조직문화 담당자로서 직면할 수 있는 다양한 데이터 취합 및 반복 업무를 선제적으로 자동화할 수 있는 역량 보유\n· 자동화를 통해 절약된 시간과 리소스를 핵심적인 조직문화 기획 및 개선 활동에 온전히 투입하여 부서의 부가가치 창출에 기여' }
    ]
  },
  //docsections -> 이거 문서 모드임 (document.js에서 사용)
  // ── 노드5: 스킬 트리 & 인벤토리 (Skills) ──
  5: {
    title: '스킬 트리 & 인벤토리',
    docTitle: '보유 역량 및 특기 사항',
    icon: '📖',
    stageLabel: '[Stage 5] 스킬 트리',
    content: `
      <div class="tc-skill-container">
        <div class="tc-skill-header">보유 스킬</div>

        <!-- 일반 공격 -->
        <div class="tc-skill-block">
          <div class="tc-skill-top">
            <div class="tc-skill-icon" style="background: linear-gradient(135deg, #dafd87 10%, #b8e160);">
              <div class="tc-icon-placeholder">💊</div>
            </div>
            <div class="tc-skill-title-area">
              <div class="tc-skill-type">일반 공격</div>
              <div class="tc-skill-name">
                <span class="tc-name-text">보건관리</span>
                <div class="tc-name-bg"></div>
              </div>
            </div>
          </div>
          <p class="tc-skill-desc">
            법정 보건관리자 요건을 충족하는 <strong>간호사 면허</strong> 보유. 잦은 크런치로 깎인 동료들의 체력/멘탈 HP를 관리하여 번아웃을 방지하는 <strong>사내 전담 힐러</strong>로 활약한다.
          </p>
          <div class="tc-skill-stats">
            <div class="tc-stat-label">Lv.MAX</div>
            <div class="tc-stat-val">
              <span class="tc-highlight">"간호사가 왔답니다~"</span><br>
              추가 효과: 스트레스 징후 조기 캐치, 건강검진 결과 해석, <strong>임직원 건강 증진 사내 교육 직접 기획 및 강연</strong>
            </div>
          </div>
        </div>

        <!-- 저학년 스킬 -->
        <div class="tc-skill-block">
          <div class="tc-skill-top">
            <div class="tc-skill-icon" style="background: linear-gradient(135deg, #8cfe88 10%, #66c36d);">
              <div class="tc-icon-placeholder">📊</div>
            </div>
            <div class="tc-skill-title-area">
              <div class="tc-skill-type">저학년 스킬</div>
              <div class="tc-skill-name">
                <span class="tc-name-text">사내 교육 & 콘텐츠 기획</span>
                <div class="tc-name-bg"></div>
              </div>
            </div>
          </div>
          <p class="tc-skill-desc">
            <strong>"이해가 쏙쏙 되시죠?"</strong> 탁월한 지식 전달력과 <strong>콘텐츠 제작 툴</strong>을 활용해 시각화한 교육 자료를 배포하여 교육의 이해도를 높인다.
          </p>
          <div class="tc-skill-stats">
            <div class="tc-stat-label">Lv.MAX</div>
            <div class="tc-stat-val">
              전달력: <span class="tc-highlight">보충수업 및 학원 강사 출신의 탁월한 진행력</span><br>
              콘텐츠 툴: <span class="tc-highlight">Premiere Pro, Photoshop, Notion</span><br>
              적중 시: 외부 섭외 없이 사내 교육 프로그램 자체 진행, 지루한 공문서의 시각화
            </div>
          </div>
        </div>

        <!-- 고학년 스킬 -->
        <div class="tc-skill-block">
          <div class="tc-skill-top">
            <div class="tc-skill-icon" style="background: linear-gradient(135deg, #64d282 10%, #2ca286);">
              <div class="tc-icon-placeholder">💻</div>
            </div>
            <div class="tc-skill-title-area">
              <div class="tc-skill-type">고학년 스킬</div>
              <div class="tc-skill-name">
                <span class="tc-name-text">자동화</span>
                <div class="tc-name-bg"></div>
              </div>
            </div>
          </div>
          <p class="tc-skill-desc">
            조직문화 담당자로서 마주할 <strong>데이터 취합/반복 업무를 자동화</strong>하고 남는 체력과 정신을 온전히 문화 기획에 투입한다!
          </p>
          <div class="tc-skill-stats">
            <div class="tc-stat-label">Lv.MAX</div>
            <div class="tc-stat-val">
              무기: <span class="tc-highlight">Python</span><br>
              프론트엔드: <span class="tc-highlight">HTML/CSS/JS</span><br>
              기반 기술: <span class="tc-highlight">바이브코딩, Firebase, GitHub Pages</span>
            </div>
          </div>
        </div>

      </div>
    `,
    // 문서 모드용 순수 텍스트 구조. document.js에서 사용. 인쇄용임. 진지하게 만들어야 함.
    docSections: [
      { heading: '사내 보건관리 및 전담 힐러 역량', body: '· 법정 보건관리자 요건을 충족하는 간호사 면허 보유: 고도화된 업무와 크런치 환경에 노출되기 쉬운 게임 개발자들의 신체적·정신적 번아웃 예방에 기여\n· 임직원 건강검진 결과 분석 및 맞춤형 건강 관리 가이드 제공, 대규모 오프라인 이벤트 시 응급 의료 지원 가능\n· 탁월한 지식 전달력을 바탕으로, VDT 등 근골격계 질환 예방·스트레스 관리 등 건강 증진 사내 교육 프로그램을 외부 섭외 없이 직접 기획 및 강연 가능' },
      { heading: '사내 교육 운영 및 콘텐츠 기획', body: '· 과거 대학 보충수업 및 강사 경험을 바탕으로 사내 교육 프로그램 및 세미나를 원활하게 진행할 수 있는 탁월한 소통 및 발표 역량 보유\n· Premiere Pro, Photoshop, Notion 등 다양한 툴을 활용하여 사내 홍보물, 교육 영상, 가이드 문서 등을 시각화 및 고도화\n· ADsP 자격 취득 및 빅데이터부 재직 경험을 통해 함양한 데이터 리터러시를 바탕으로, 사내 프로그램 운영 결과를 객관적인 지표(설문, 참여율 등)로 돌아보고 개선하려는 마인드셋 보유' },
      { heading: '업무 자동화 및 IT 기술 활용', body: '· Python, HTML/CSS/JS 등 바이브 코딩 기반 프로그래밍 역량을 활용하여 사내 데이터 취합 및 반복적인 단순 업무를 효과적으로 자동화\n· Firebase, GitHub Pages 등 IT 인프라와 AI 툴을 적극 활용하여 실무에 필요한 사내 시스템을 신속하게 기획·구현\n· 디지털 전환 수용성을 바탕으로 업무 효율을 극대화하고, 절감된 리소스를 핵심적인 문화 기획에 집중' }
    ]
  },
};

// --- 미디어 백그라운드 재생 방지 스크립트 ---
window.stopAllMedia = function () {
  const medias = document.querySelectorAll('.resume-media');
  medias.forEach(media => {
    if (media.tagName === 'IFRAME') {
      const currentSrc = media.src;
      media.src = '';
      media.src = currentSrc; // src를 초기화하여 재생을 강제 종료
    } else if (media.tagName === 'VIDEO' || media.tagName === 'AUDIO') {
      media.pause();
    }
  });
};

// 모달이 닫히거나 다른 곳 클릭 시 자동 정지
document.addEventListener('click', function (e) {
  // x버튼(close-btn), 모달 바깥 배경(modal-overlay), 혹은 다른 노드 탭 버튼 클릭 시
  if (e.target.closest('.close-btn') || e.target.classList.contains('modal-overlay') || e.target.closest('.tc-node')) {
    window.stopAllMedia();
  }
});