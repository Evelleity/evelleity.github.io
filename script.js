// Page navigation functionality
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-links a, .btn[data-page]");
  const pages = document.querySelectorAll(".page");

  // Set active page
  function setActivePage(pageId) {
    // Update navigation links
    navLinks.forEach((link) => {
      if (link.getAttribute("data-page") === pageId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    // Show active page
    pages.forEach((page) => {
      if (page.id === pageId) {
        page.classList.add("active");
        page.style.animation = "fadeIn 0.6s forwards";
      } else {
        page.classList.remove("active");
      }
    });

    // Scroll to top
    window.scrollTo(0, 0);
  }

  // Add click event listeners
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const pageId = this.getAttribute("data-page");
      setActivePage(pageId);
    });
  });

  // Sticky navigation background
  window.addEventListener("scroll", function () {
    const nav = document.querySelector("nav");
    if (window.scrollY > 100) {
      nav.style.padding = "1rem 0";
      nav.style.background = "rgba(10, 10, 10, 0.98)";
    } else {
      nav.style.padding = "1.5rem 0";
      nav.style.background = "rgba(10, 10, 10, 0.95)";
    }
  });
});
