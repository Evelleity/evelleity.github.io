import "./styles.css";
import gsap from "gsap";

window.addEventListener("load", () => {
  setTimeout(() => {
    gsap.to("#intro", {
      opacity: 0,
      duration: 1,
      onComplete: () => {
        document.getElementById("intro").style.display = "none";
        document.getElementById("portfolio").classList.remove("hidden");
        gsap.from("#portfolio", { opacity: 0, duration: 1 });
      }
    });
  }, 2000); // fade after 2 seconds
});
