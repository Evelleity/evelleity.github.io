window.addEventListener("load", () => {
  setTimeout(() => {
    // Fade out intro
    document.getElementById("intro").style.opacity = 0;

    // After fade animation ends, show portfolio
    setTimeout(() => {
      document.getElementById("intro").style.display = "none";
      document.getElementById("portfolio").classList.remove("hidden");
    }, 1000);
  }, 2000); // wait 2 seconds before starting fade
});
