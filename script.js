const root = document.documentElement;
const themeToggle = document.querySelector("#themeToggle");
const searchInput = document.querySelector("#topicSearch");
const readProgress = document.querySelector("#readProgress");
const navLinks = Array.from(document.querySelectorAll(".sidebar a"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);
const topicCards = Array.from(document.querySelectorAll(".topic-card"));

const savedTheme = localStorage.getItem("spring-handbook-theme");
if (savedTheme) {
  root.dataset.theme = savedTheme;
}

themeToggle.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = nextTheme;
  localStorage.setItem("spring-handbook-theme", nextTheme);
});

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

function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable <= 0 ? 0 : (window.scrollY / scrollable) * 100;
  readProgress.style.width = `${Math.min(100, Math.max(0, progress))}%`;

  let currentSection = sections[0]?.id;
  sections.forEach((section) => {
    if (section.getBoundingClientRect().top < 170) {
      currentSection = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentSection}`);
  });
}

function filterTopics() {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  document.querySelectorAll(".no-results").forEach((message) => message.remove());

  topicCards.forEach((card) => {
    const haystack = `${card.dataset.topic} ${card.innerText}`.toLowerCase();
    const visible = !query || haystack.includes(query);
    card.classList.toggle("is-hidden", !visible);
    if (visible) visibleCount += 1;
  });

  document.querySelectorAll(".topic-part").forEach((part) => {
    const visibleCards = Array.from(part.querySelectorAll(".topic-card")).filter(
      (card) => !card.classList.contains("is-hidden"),
    );
    part.style.display = visibleCards.length || !query ? "" : "none";
  });

  if (query && visibleCount === 0) {
    const message = document.createElement("p");
    message.className = "no-results";
    message.textContent = "검색 결과가 없습니다. 다른 키워드로 다시 검색해 보세요.";
    document.querySelector("#quick-map").after(message);
  }
}

searchInput.addEventListener("input", filterTopics);
window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("resize", updateProgress);
updateProgress();
