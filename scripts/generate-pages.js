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

function partTitle(id) {
  return TOPIC_PARTS.find((part) => part.id === id)?.title ?? id;
}

function renderList(items, className = "article-list") {
  return `<ul class="${className}">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function renderPairs(items) {
  return `<div class="term-grid">${items
    .map(
      ([name, description]) => `
        <article>
          <strong>${escapeHtml(name)}</strong>
          <p>${escapeHtml(description)}</p>
        </article>`,
    )
    .join("")}</div>`;
}

function renderHeader(relativePrefix = "") {
  return `
    <a class="skip-link" href="#content">본문으로 건너뛰기</a>
    <header class="site-header">
      <a class="brand" href="${relativePrefix}index.html" aria-label="Spring Boot Handbook 홈">
        <span class="brand-mark" aria-hidden="true">S</span>
        <span>
          <strong>Spring Boot Handbook</strong>
          <small>주제별 블로그형 수업 자료</small>
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
    <meta name="theme-color" content="#2563eb" />
    <link
      rel="icon"
      href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMB/axp3FoAAAAASUVORK5CYII="
    />
    <link rel="stylesheet" href="../styles.css" />
  </head>
  <body class="article-page">
    ${renderHeader("../")}
    <main id="content" class="article-shell">
      <article class="article">
        <nav class="breadcrumb" aria-label="현재 위치">
          <a href="../index.html">홈</a>
          <span>${escapeHtml(partTitle(topic.part))}</span>
        </nav>

        <header class="article-hero">
          <p class="eyebrow">${escapeHtml(topic.number)} · ${escapeHtml(partTitle(topic.part))}</p>
          <h1>${escapeHtml(topic.title)} ${badge}</h1>
          <p>${escapeHtml(topic.summary)}</p>
        </header>

        <section class="article-section">
          <h2>왜 배워야 할까</h2>
          ${topic.body.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
        </section>

        <section class="article-section">
          <h2>관련 어노테이션과 기술</h2>
          ${renderPairs(topic.annotations)}
        </section>

        <section class="article-section">
          <h2>함께 확인하거나 수정할 부분</h2>
          ${renderPairs(topic.related)}
        </section>

        <section class="article-section">
          <h2>${escapeHtml(topic.exampleTitle)}</h2>
          <pre><code class="language-${escapeHtml(topic.language)}">${escapeHtml(topic.code)}</code></pre>
        </section>

        <section class="article-section">
          <h2>처리할 때 주의할 점</h2>
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
