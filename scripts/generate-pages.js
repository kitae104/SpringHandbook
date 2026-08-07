const fs = require("fs");
const path = require("path");
const { TOPIC_PARTS, SPRING_TOPICS } = require("../topics-data");

const root = path.resolve(__dirname, "..");
const outputDir = path.join(root, "topics");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

const inlinePatterns = [
  {
    pattern: /(@[A-Za-z][A-Za-z0-9_]*(?:\([^)]+\))?)/g,
    render: (value) => `<strong class="inline-token">${escapeHtml(value)}</strong>`,
  },
  {
    pattern:
      /(같은 클래스 내부 호출|필드별 메시지|논리 삭제|branch 보호 규칙|테스트 피라미드|전역 예외 처리|보관 정책|오류 응답|감사 로그)/g,
    render: (value) => `<u class="inline-underline">${escapeHtml(value)}</u>`,
  },
  {
    pattern:
      /(안 됩니다|주의해야 합니다|위험|실패|깨질 수 있습니다|노출|민감|보안 문제|롤백|장애|느립니다)/g,
    render: (value) => `<mark class="inline-risk">${escapeHtml(value)}</mark>`,
  },
  {
    pattern:
      /\b(Spring Boot|Spring Security|Spring Data JPA|Bean Validation|MockMvc|JUnit 5|Mockito|AuditorAware|AOP|JPA|JWT|DTO|Entity|Controller|Service|Repository|Transaction|Validation|Testing|Audit|Exception|Swagger|Docker|Redis|CI\/CD|CORS|HTTP|REST API|MVC|Bean)\b/g,
    render: (value) => `<strong class="inline-term">${escapeHtml(value)}</strong>`,
  },
  {
    pattern: /(트랜잭션|검증|예외|테스트|보안|인증|권한|필드|응답|요청|변경 이력)/g,
    render: (value) => `<strong class="inline-korean">${escapeHtml(value)}</strong>`,
  },
  {
    pattern: /(권장합니다|좋습니다|중요합니다|명확히|일관된|구분해야 합니다|정해야 합니다|확인해야 합니다|유지하는 편이 좋습니다)/g,
    render: (value) => `<em class="inline-guidance">${escapeHtml(value)}</em>`,
  },
];

function renderInline(value) {
  const text = String(value);
  let cursor = 0;
  let html = "";

  while (cursor < text.length) {
    let next = null;

    inlinePatterns.forEach((entry, order) => {
      entry.pattern.lastIndex = cursor;
      const match = entry.pattern.exec(text);
      if (!match) return;
      if (
        !next ||
        match.index < next.index ||
        (match.index === next.index && order < next.order)
      ) {
        next = { entry, index: match.index, value: match[0], order };
      }
    });

    if (!next) {
      html += escapeHtml(text.slice(cursor));
      break;
    }

    if (next.index > cursor) {
      html += escapeHtml(text.slice(cursor, next.index));
    }

    html += next.entry.render(next.value);
    cursor = next.index + next.value.length;
  }

  return html;
}

function partOf(id) {
  return TOPIC_PARTS.find((part) => part.id === id);
}

function renderList(items, className = "article-list") {
  return `<ul class="${className}">${items.map((item) => `<li>${renderInline(item)}</li>`).join("")}</ul>`;
}

function renderPairs(items) {
  return `<div class="term-grid">${items
    .map(
      ([name, description]) => `
        <article>
          <strong>${escapeHtml(name)}</strong>
          <p>${renderInline(description)}</p>
        </article>`,
    )
    .join("")}</div>`;
}

function renderInsights(items) {
  return `<div class="insight-grid">${items
    .map(
      ([title, description]) => `
        <article>
          <strong>${escapeHtml(title)}</strong>
          <p>${renderInline(description)}</p>
        </article>`,
    )
    .join("")}</div>`;
}

function renderLambdaExample(topic) {
  if (!topic.lambdaExample) {
    return "";
  }

  return `
          <div class="lambda-example">
            <h3>람다 표현식으로도 작성 가능</h3>
            ${
              topic.lambdaDescription
                ? `<p>${renderInline(topic.lambdaDescription)}</p>`
                : ""
            }
            <pre><code class="language-${escapeHtml(topic.lambdaLanguage || topic.language)}">${escapeHtml(topic.lambdaExample)}</code></pre>
          </div>`;
}

function styleVars(part) {
  return `--part-color: ${part.color}; --part-tint: ${part.tint}; --part-deep: ${part.deep};`;
}

function renderHeader(relativePrefix = "") {
  return `
    <a class="skip-link" href="#content">본문으로 건너뛰기</a>
    <header class="site-header">
      <a class="brand" href="${relativePrefix}index.html" aria-label="Spring Boot Handbook 홈">
        <span class="brand-mark" aria-hidden="true">S</span>
        <span>
          <strong>Spring Boot Handbook</strong>
          <small>주제별로 찾고 깊게 읽는 Spring Boot 자료실</small>
        </span>
      </a>
      <div class="header-actions article-actions">
        <a class="secondary-button" href="${relativePrefix}index.html#topics">전체 주제</a>
        <button id="themeToggle" class="icon-button" type="button" aria-label="테마 변경">◐</button>
      </div>
    </header>`;
}

function renderTopicPage(topic, index) {
  const previous = SPRING_TOPICS[index - 1];
  const next = SPRING_TOPICS[index + 1];
  const part = partOf(topic.part);
  const badge = topic.badge ? `<span class="topic-badge">${escapeHtml(topic.badge)}</span>` : "";

  return `<!doctype html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(topic.title)} | Spring Boot Handbook</title>
    <meta name="description" content="${escapeHtml(topic.summary)}" />
    <meta property="og:title" content="${escapeHtml(topic.title)} | Spring Boot Handbook" />
    <meta property="og:description" content="${escapeHtml(topic.summary)}" />
    <meta name="theme-color" content="${escapeHtml(part.color)}" />
    <link
      rel="icon"
      href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMB/axp3FoAAAAASUVORK5CYII="
    />
    <link rel="stylesheet" href="../styles.css" />
  </head>
  <body class="article-page" style="${styleVars(part)}">
    ${renderHeader("../")}
    <main id="content" class="article-shell">
      <article class="article">
        <nav class="breadcrumb" aria-label="현재 위치">
          <a href="../index.html">홈</a>
          <span>${escapeHtml(part.title)}</span>
        </nav>

        <header class="article-hero">
          <p class="eyebrow">${escapeHtml(topic.number)} · ${escapeHtml(part.title)}</p>
          <h1>${escapeHtml(topic.title)} ${badge}</h1>
          <p>${renderInline(topic.summary)}</p>
          <div class="article-meta">
            <span class="topic-badge">${escapeHtml(part.shortTitle)}</span>
            <span class="topic-badge">${escapeHtml(topic.level)}</span>
            <span class="topic-badge">${escapeHtml(topic.readingTime)}</span>
          </div>
        </header>

        <section class="article-section">
          <h2>왜 배워야 할까</h2>
          ${topic.body.map((paragraph) => `<p>${renderInline(paragraph)}</p>`).join("")}
        </section>

        <section class="article-section">
          <h2>동작 흐름</h2>
          ${renderInsights(topic.flow)}
        </section>

        <section class="article-section">
          <h2>관련 어노테이션과 기술</h2>
          ${renderPairs(topic.annotations)}
        </section>

        <section class="article-section">
          <h2>함께 확인할 파일과 설정</h2>
          ${renderPairs(topic.related)}
        </section>

        <section class="article-section">
          <h2>${escapeHtml(topic.exampleTitle)}</h2>
          <pre><code class="language-${escapeHtml(topic.language)}">${escapeHtml(topic.code)}</code></pre>
          ${renderLambdaExample(topic)}
        </section>

        <section class="article-section">
          <h2>기술적으로 헷갈리기 쉬운 부분</h2>
          ${renderList(topic.watch)}
        </section>

        <footer class="article-nav">
          ${previous ? `<a href="${previous.slug}.html">이전 · ${escapeHtml(previous.title)}</a>` : "<span></span>"}
          ${next ? `<a href="${next.slug}.html">다음 · ${escapeHtml(next.title)}</a>` : "<span></span>"}
        </footer>
      </article>
    </main>
    <script src="../script.js"></script>
  </body>
</html>`;
}

fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir, { recursive: true });

SPRING_TOPICS.forEach((topic, index) => {
  fs.writeFileSync(path.join(outputDir, `${topic.slug}.html`), renderTopicPage(topic, index), "utf8");
});

console.log(`Generated ${SPRING_TOPICS.length} topic pages.`);
