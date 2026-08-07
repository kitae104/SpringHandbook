const root = document.documentElement;
const themeToggle = document.querySelector("#themeToggle");
const searchInput = document.querySelector("#topicSearch");
const readProgress = document.querySelector("#readProgress");
const partNav = document.querySelector("#partNav");
const topicGroups = document.querySelector("#topicGroups");
const categoryLegend = document.querySelector("#categoryLegend");
const topicCount = document.querySelector("#topicCount");

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

function filterTopics() {
  if (!searchInput || !topicGroups) return;
  const query = searchInput.value.trim().toLowerCase();
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

  if (query && visibleCount === 0) {
    const message = createElement("p", "no-results", "검색 결과가 없습니다. 어노테이션, 파일명, 기능 이름으로 다시 검색해 보세요.");
    topicGroups.after(message);
  }
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
filterTopics();
enableCodeCopy();

searchInput?.addEventListener("input", filterTopics);
window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("resize", updateProgress);
updateProgress();
