// Intro fade
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("intro").style.opacity = 0;
    setTimeout(() => {
      document.getElementById("intro").style.display = "none";
      document.getElementById("portfolio").classList.remove("hidden");
    }, 1000);
  }, 2000);
});

// Menu logic with fade transition
const menuItems = document.querySelectorAll(".middle li");
let activePanel = document.querySelector('.content-panel[data-content="works"]');

menuItems.forEach(item => {
  item.addEventListener("click", () => {
    const sectionName = item.getAttribute("data-section");
    const newPanel = document.querySelector(`.content-panel[data-content="${sectionName}"]`);

    if (newPanel === activePanel) return; // No change

    // Update menu styles
    menuItems.forEach(i => i.classList.remove("active", "big-menu"));
    item.classList.add("active", "big-menu");

    // Fade out current
    activePanel.classList.add("fade-out");
    activePanel.classList.remove("fade-in");

    setTimeout(() => {
      activePanel.classList.add("hidden");
      activePanel.classList.remove("fade-out");

      // Show new panel
      newPanel.classList.remove("hidden");
      newPanel.classList.add("fade-in");
      activePanel = newPanel;
    }, 500); // match fade-out duration
  });
});
