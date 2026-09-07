const fs = require("fs");
const path = require("path");
const { TOPIC_PARTS, SPRING_TOPICS } = require("../topics-data");
const { SPRING_TERMS } = require("../terms-data");

const root = path.resolve(__dirname, "..");
const outputDir = path.join(root, "topics");
const termOutputDir = path.join(root, "terms");

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

function renderFlowDiagram(items) {
  return `<div class="concept-diagram" aria-label="개념 흐름 다이어그램">${items
    .map(
      ([title, description], index) => `
        <div class="diagram-node">
          <span>${String(index + 1).padStart(2, "0")}</span>
          <strong>${escapeHtml(title)}</strong>
          <p>${renderInline(description)}</p>
        </div>`,
    )
    .join('<i class="diagram-arrow" aria-hidden="true"></i>')}</div>`;
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
          <h2>개념 그림</h2>
          ${renderFlowDiagram(topic.flow)}
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

function renderTermPage(term) {
  const relatedTopics = term.relatedTopics
    .map((slug) => SPRING_TOPICS.find((topic) => topic.slug === slug))
    .filter(Boolean);

  return `<!doctype html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(term.name)} | Spring Boot Handbook 용어 사전</title>
    <meta name="description" content="${escapeHtml(term.summary)}" />
    <link rel="icon" href="../logo.svg" type="image/svg+xml" />
    <link rel="stylesheet" href="../styles.css" />
  </head>
  <body class="article-page">
    ${renderHeader("../")}
    <main id="content" class="article-shell">
      <article class="article">
        <nav class="breadcrumb" aria-label="현재 위치">
          <a href="../index.html">홈</a>
          <a href="../index.html#glossary">수업 핵심 용어</a>
          <span>${escapeHtml(term.name)}</span>
        </nav>
        <header class="article-hero">
          <p class="eyebrow">${escapeHtml(term.category)}</p>
          <h1>${escapeHtml(term.name)}</h1>
          <p>${renderInline(term.summary)}</p>
          <div class="article-meta">
            <span class="topic-badge">용어</span>
            <span class="topic-badge">${escapeHtml(term.level)}</span>
            <span class="topic-badge">${escapeHtml(term.readingTime)}</span>
          </div>
        </header>
        <section class="article-section">
          <h2>정확한 뜻</h2>
          ${term.definition.map((paragraph) => `<p>${renderInline(paragraph)}</p>`).join("")}
        </section>
        <section class="article-section">
          <h2>실제로 동작하는 순서</h2>
          ${renderFlowDiagram(term.mechanics)}
        </section>
        <section class="article-section">
          <h2>비슷한 용어와 구분하기</h2>
          ${renderPairs(term.distinctions)}
        </section>
        <section class="article-section">
          <h2>${escapeHtml(term.exampleTitle)}</h2>
          <pre><code class="language-${escapeHtml(term.language)}">${escapeHtml(term.code)}</code></pre>
        </section>
        <section class="article-section">
          <h2>수업에서 확인할 포인트</h2>
          ${renderList(term.checks)}
        </section>
        <section class="article-section">
          <h2>함께 읽을 주제</h2>
          <div class="linked-topic-grid">
            ${relatedTopics.map((topic) => `<a href="../topics/${topic.slug}.html"><strong>${escapeHtml(topic.title)}</strong><span>${escapeHtml(topic.summary)}</span></a>`).join("")}
          </div>
        </section>
        <footer class="article-nav">
          <a href="../index.html#glossary">용어 목록으로</a>
        </footer>
      </article>
    </main>
    <script src="../script.js"></script>
  </body>
</html>`;
}

function addSearchAnchors(html, anchors) {
  let result = html.replace('<header class="article-hero">', '<header id="overview" class="article-hero">');
  anchors.forEach(([heading, id]) => {
    result = result.replace(
      `<section class="article-section">\n          <h2>${heading}</h2>`,
      `<section id="${id}" class="article-section">\n          <h2>${heading}</h2>`,
    );
  });
  return result;
}

const topicSearchAnchors = [
  ["왜 배워야 할까", "why"],
  ["개념 그림", "concept-flow"],
  ["동작 흐름", "operation-flow"],
  ["관련 어노테이션과 기술", "annotations"],
  ["함께 확인할 파일과 설정", "related"],
  ["기술적으로 헷갈리기 쉬운 부분", "watch"],
];

const termSearchAnchors = [
  ["정확한 뜻", "definition"],
  ["실제로 동작하는 순서", "mechanics"],
  ["비슷한 용어와 구분하기", "distinctions"],
  ["수업에서 확인할 포인트", "checks"],
  ["함께 읽을 주제", "related"],
];

fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir, { recursive: true });

fs.rmSync(termOutputDir, { recursive: true, force: true });
fs.mkdirSync(termOutputDir, { recursive: true });

SPRING_TOPICS.forEach((topic, index) => {
  let html = addSearchAnchors(renderTopicPage(topic, index), topicSearchAnchors);
  html = html.replace(
    `<section class="article-section">\n          <h2>${escapeHtml(topic.exampleTitle)}</h2>`,
    `<section id="example" class="article-section">\n          <h2>${escapeHtml(topic.exampleTitle)}</h2>`,
  );
  fs.writeFileSync(path.join(outputDir, `${topic.slug}.html`), html, "utf8");
});

SPRING_TERMS.forEach((term) => {
  let html = addSearchAnchors(renderTermPage(term), termSearchAnchors);
  html = html.replace(
    `<section class="article-section">\n          <h2>${escapeHtml(term.exampleTitle)}</h2>`,
    `<section id="example" class="article-section">\n          <h2>${escapeHtml(term.exampleTitle)}</h2>`,
  );
  fs.writeFileSync(path.join(termOutputDir, `${term.slug}.html`), html, "utf8");
});

console.log(`Generated ${SPRING_TOPICS.length} topic pages and ${SPRING_TERMS.length} term pages.`);
