document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch('https://raw.githubusercontent.com/ArthurSilv4/arthurdesouza.com/refs/heads/master/README.md');

    const data = await response.text();
    const container = document.getElementById('content');

    container.innerHTML = marked(data);
    Prism.highlightAllUnder(container);
  } catch (error) {
    console.error(error);
  }
});

window.addEventListener("scroll", function () {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    document.getElementById("clickme").style.display = "block";
    document.getElementById("clickme").classList.add("animate-clickme");
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const clickmeImage = document.getElementById("clickme");
  clickmeImage.addEventListener("click", () => window.open("https://www.linkedin.com/in/arthur-souza-dev/", "_blank"));
});