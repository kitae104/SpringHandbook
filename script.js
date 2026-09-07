const root = document.documentElement;
const themeToggle = document.querySelector("#themeToggle");
const searchInput = document.querySelector("#topicSearch");
const readProgress = document.querySelector("#readProgress");
const partNav = document.querySelector("#partNav");
const topicGroups = document.querySelector("#topicGroups");
const categoryLegend = document.querySelector("#categoryLegend");
const topicCount = document.querySelector("#topicCount");
const termGrid = document.querySelector("#termGrid");
const searchResults = document.querySelector("#searchResults");

const savedTheme = localStorage.getItem("spring-handbook-theme");
if (savedTheme) {
  root.dataset.theme = savedTheme;
}

themeToggle?.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = nextTheme;
  localStorage.setItem("spring-handbook-theme", nextTheme);
});

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

function topicHref(topic) {
  return `topics/${topic.slug}.html`;
}

function termHref(term) {
  return `terms/${term.slug}.html`;
}

function applyPartColor(element, part) {
  element.style.setProperty("--part-color", part.color);
  element.style.setProperty("--part-tint", part.tint);
  element.style.setProperty("--part-deep", part.deep);
}

function renderHome() {
  if (!partNav || !topicGroups || !window.TOPIC_PARTS || !window.SPRING_TOPICS) return;

  if (topicCount) topicCount.textContent = window.SPRING_TOPICS.length;

  window.TOPIC_PARTS.forEach((part) => {
    const count = window.SPRING_TOPICS.filter((topic) => topic.part === part.id).length;
    const link = document.createElement("a");
    link.href = `#${part.id}`;
    link.innerHTML = `<span>${part.title}</span><small>${count}</small>`;
    applyPartColor(link, part);
    partNav.append(link);

    if (categoryLegend) {
      const item = createElement("span", "legend-item");
      applyPartColor(item, part);
      item.innerHTML = `<i aria-hidden="true"></i>${part.shortTitle}`;
      categoryLegend.append(item);
    }
  });

  window.TOPIC_PARTS.forEach((part) => {
    const partTopics = window.SPRING_TOPICS.filter((topic) => topic.part === part.id);
    const section = createElement("section", "topic-part");
    section.id = part.id;
    section.dataset.part = part.title;
    applyPartColor(section, part);

    const heading = createElement("div", "topic-part-heading");
    heading.innerHTML = `
      <div>
        <p class="eyebrow">${part.title}</p>
        <h3>${part.description}</h3>
      </div>
      <span>${partTopics.length}개 주제</span>`;
    section.append(heading);

    const grid = createElement("div", "topic-grid topic-link-grid");
    partTopics.forEach((topic) => {
      const tagNames = topic.keywords?.length
        ? topic.keywords.slice(0, 4)
        : topic.annotations.slice(0, 3).map(([name]) => name);
      const card = document.createElement("a");
      card.className = "topic-card topic-link-card";
      card.href = topicHref(topic);
      card.dataset.topic = [
        topic.title,
        topic.summary,
        topic.level,
        topic.keywords?.join(" "),
        topic.body?.join(" "),
        topic.annotations?.map(([name, description]) => `${name} ${description}`).join(" "),
        topic.related?.map(([name, description]) => `${name} ${description}`).join(" "),
      ].join(" ");
      applyPartColor(card, part);
      card.innerHTML = `
        <div class="topic-meta">
          <span>${topic.number}</span>
          <strong>${part.shortTitle}</strong>
          <small>${topic.level}</small>
        </div>
        <div class="topic-title">
          <h3>${topic.title} ${topic.badge ? `<em>${topic.badge}</em>` : ""}</h3>
        </div>
        <p>${topic.summary}</p>
        <div class="topic-tags">
          ${tagNames.map((name) => `<span>${name}</span>`).join("")}
        </div>
        <strong class="read-more">자세히 읽기</strong>
      `;
      grid.append(card);
    });

    section.append(grid);
    topicGroups.append(section);
  });
}

function renderTerms() {
  if (!termGrid || !window.SPRING_TERMS) return;

  window.SPRING_TERMS.forEach((term, index) => {
    const card = document.createElement("a");
    card.className = "topic-card topic-link-card term-link-card";
    card.href = termHref(term);
    card.dataset.topic = [
      term.name,
      term.summary,
      term.aliases?.join(" "),
      term.definition?.join(" "),
      term.distinctions?.flat().join(" "),
    ].join(" ");
    card.innerHTML = `
      <div class="topic-meta">
        <span>${String(index + 1).padStart(2, "0")}</span>
        <strong>용어</strong>
        <small>${term.level}</small>
      </div>
      <div class="topic-title"><h3>${term.name}</h3></div>
      <p>${term.summary}</p>
      <div class="topic-tags">
        ${term.aliases.slice(0, 3).map((name) => `<span>${name}</span>`).join("")}
      </div>
      <strong class="read-more">상세 설명 읽기</strong>`;
    termGrid.append(card);
  });
}

function normalizeSearchText(value) {
  return String(value ?? "").toLocaleLowerCase("ko-KR");
}

function topicSearchEntries(topic) {
  const base = topicHref(topic);
  return [
    ["개요", [topic.title, topic.summary, ...(topic.keywords || [])], "overview"],
    ["왜 배워야 할까", topic.body, "why"],
    ["개념과 동작 흐름", topic.flow?.flat(), "concept-flow"],
    ["관련 어노테이션과 기술", topic.annotations?.flat(), "annotations"],
    ["함께 확인할 파일과 설정", topic.related?.flat(), "related"],
    [topic.exampleTitle, [topic.exampleTitle, topic.code, topic.lambdaDescription, topic.lambdaExample], "example"],
    ["헷갈리기 쉬운 부분", topic.watch, "watch"],
  ].map(([location, text, hash]) => ({ title: topic.title, kind: "주제", location, text, href: `${base}?q={query}#${hash}` }));
}

function termSearchEntries(term) {
  const base = termHref(term);
  return [
    ["개요", [term.name, term.summary, ...(term.aliases || [])], "overview"],
    ["정확한 뜻", term.definition, "definition"],
    ["실제로 동작하는 순서", term.mechanics?.flat(), "mechanics"],
    ["비슷한 용어와 구분하기", term.distinctions?.flat(), "distinctions"],
    [term.exampleTitle, [term.exampleTitle, term.code], "example"],
    ["수업에서 확인할 포인트", term.checks, "checks"],
  ].map(([location, text, hash]) => ({ title: term.name, kind: "용어", location, text, href: `${base}?q={query}#${hash}` }));
}

function buildSearchIndex() {
  return [...(window.SPRING_TOPICS || []).flatMap(topicSearchEntries), ...(window.SPRING_TERMS || []).flatMap(termSearchEntries)];
}

function excerptFor(entry, query) {
  const source = (entry.text || []).filter(Boolean).join(" · ").replace(/\s+/g, " ");
  const index = normalizeSearchText(source).indexOf(normalizeSearchText(query));
  if (index < 0) return source.slice(0, 110);
  const start = Math.max(0, index - 35);
  const end = Math.min(source.length, index + query.length + 75);
  return `${start ? "…" : ""}${source.slice(start, end)}${end < source.length ? "…" : ""}`;
}

function renderSearchResults(query) {
  if (!searchResults || !searchInput) return;
  const trimmed = query.trim();
  const normalized = normalizeSearchText(trimmed);
  searchResults.replaceChildren();
  if (!normalized) {
    searchResults.hidden = true;
    searchInput.setAttribute("aria-expanded", "false");
    return;
  }

  const matches = buildSearchIndex().filter((entry) => normalizeSearchText((entry.text || []).filter(Boolean).join(" ")).includes(normalized));
  searchResults.append(createElement("div", "search-results-summary", `${matches.length}개 위치를 찾았습니다.`));
  matches.forEach((entry, index) => {
    const link = document.createElement("a");
    link.className = "search-result-item";
    link.href = entry.href.replace("{query}", encodeURIComponent(trimmed));
    link.setAttribute("role", "option");
    link.innerHTML = `<span><small>${entry.kind}</small><strong>${entry.title}</strong><em>${entry.location}</em></span><p>${excerptFor(entry, trimmed)}</p>`;
    if (index === 0) link.dataset.firstResult = "true";
    searchResults.append(link);
  });
  if (!matches.length) searchResults.append(createElement("p", "search-results-empty", "일치하는 본문 위치가 없습니다."));
  searchResults.hidden = false;
  searchInput.setAttribute("aria-expanded", "true");
}

function filterTopics() {
  if (!searchInput || !topicGroups) return;
  const query = searchInput.value.trim().toLowerCase();
  renderSearchResults(searchInput.value);
  const cards = Array.from(document.querySelectorAll(".topic-link-card"));
  let visibleCount = 0;

  document.querySelectorAll(".no-results").forEach((message) => message.remove());

  cards.forEach((card) => {
    const visible = !query || card.dataset.topic.toLowerCase().includes(query) || card.innerText.toLowerCase().includes(query);
    card.classList.toggle("is-hidden", !visible);
    if (visible) visibleCount += 1;
  });

  document.querySelectorAll(".topic-part").forEach((part) => {
    const visibleCards = Array.from(part.querySelectorAll(".topic-link-card")).filter(
      (card) => !card.classList.contains("is-hidden"),
    );
    part.style.display = visibleCards.length || !query ? "" : "none";
  });

  const glossary = document.querySelector(".glossary-browser");
  if (glossary) {
    const visibleTerms = Array.from(glossary.querySelectorAll(".term-link-card")).filter(
      (card) => !card.classList.contains("is-hidden"),
    );
    glossary.style.display = visibleTerms.length || !query ? "" : "none";
  }

  if (query && visibleCount === 0) {
    const message = createElement("p", "no-results", "검색 결과가 없습니다. 어노테이션, 파일명, 기능 이름으로 다시 검색해 보세요.");
    topicGroups.after(message);
  }
}

function highlightArticleSearch() {
  const article = document.querySelector(".article");
  if (!article) return;
  const query = new URLSearchParams(window.location.search).get("q")?.trim();
  if (!query) return;
  const normalized = normalizeSearchText(query);
  const walker = document.createTreeWalker(article, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue || !normalizeSearchText(node.nodeValue).includes(normalized)) return NodeFilter.FILTER_REJECT;
      return node.parentElement?.closest("pre, script, style") ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
    },
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  nodes.forEach((node) => {
    const fragment = document.createDocumentFragment();
    const pattern = new RegExp(escaped, "gi");
    let cursor = 0;
    node.nodeValue.replace(pattern, (match, offset) => {
      fragment.append(node.nodeValue.slice(cursor, offset));
      fragment.append(createElement("mark", "search-hit", match));
      cursor = offset + match.length;
      return match;
    });
    fragment.append(node.nodeValue.slice(cursor));
    node.replaceWith(fragment);
  });

  const hits = Array.from(article.querySelectorAll(".search-hit"));
  if (!hits.length) return;
  let current = 0;
  const navigator = createElement("div", "search-hit-navigator");
  navigator.innerHTML = `<strong>“${query}”</strong><span></span><button type="button" data-direction="previous">이전</button><button type="button" data-direction="next">다음</button><a href="../index.html">새 검색</a>`;
  const counter = navigator.querySelector("span");
  const moveTo = (index) => {
    hits[current].classList.remove("is-current");
    current = (index + hits.length) % hits.length;
    hits[current].classList.add("is-current");
    counter.textContent = `${current + 1} / ${hits.length}`;
    hits[current].scrollIntoView({ behavior: "smooth", block: "center" });
  };
  navigator.addEventListener("click", (event) => {
    if (event.target.dataset.direction === "previous") moveTo(current - 1);
    if (event.target.dataset.direction === "next") moveTo(current + 1);
  });
  document.body.append(navigator);
  hits[0].classList.add("is-current");
  counter.textContent = `1 / ${hits.length}`;
}

function updateProgress() {
  if (!readProgress) return;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable <= 0 ? 0 : (window.scrollY / scrollable) * 100;
  readProgress.style.width = `${Math.min(100, Math.max(0, progress))}%`;

  const navLinks = Array.from(document.querySelectorAll(".sidebar a"));
  const sections = navLinks.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
  let currentSection = sections[0]?.id;
  sections.forEach((section) => {
    if (section.getBoundingClientRect().top < 170) currentSection = section.id;
  });
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentSection}`);
  });
}

function enableCodeCopy() {
  document.querySelectorAll("pre").forEach((block) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "copy-button";
    button.textContent = "복사";
    button.addEventListener("click", async () => {
      const code = block.querySelector("code").innerText;
      await navigator.clipboard.writeText(code);
      button.textContent = "완료";
      window.setTimeout(() => {
        button.textContent = "복사";
      }, 1200);
    });
    block.append(button);
  });
}

renderHome();
renderTerms();
filterTopics();
enableCodeCopy();

searchInput?.addEventListener("input", filterTopics);
searchInput?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const first = searchResults?.querySelector("[data-first-result]");
    if (first) { event.preventDefault(); first.click(); }
  }
  if (event.key === "Escape") { searchInput.value = ""; filterTopics(); }
});
document.addEventListener("click", (event) => {
  if (searchResults && !event.target.closest(".search-shell")) {
    searchResults.hidden = true;
    searchInput?.setAttribute("aria-expanded", "false");
  }
});
window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("resize", updateProgress);
updateProgress();
highlightArticleSearch();
