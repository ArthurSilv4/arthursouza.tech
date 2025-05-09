document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch('https://raw.githubusercontent.com/ArthurSilv4/arthursouza.tech/refs/heads/master/README.md');

    const data = await response.text();
    const container = document.getElementById('content');

    if (container) {
      container.innerHTML = marked(data);
      Prism.highlightAllUnder(container);
    } else {
      console.error("Element with ID 'content' not found.");
    }
  } catch (error) {
    console.error(error);
  }
});

window.addEventListener("scroll", function () {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    const clickmeElement = document.getElementById("clickme");
    if (clickmeElement) {
      clickmeElement.style.display = "block";
      clickmeElement.classList.add("animate-clickme");
    } else {
      console.error("Element with ID 'clickme' not found.");
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const clickmeImage = document.getElementById("clickme");
  if (clickmeImage) {
    clickmeImage.addEventListener("click", () => window.open("https://www.linkedin.com/in/arthur-souza-dev/", "_blank"));
  } else {
    console.error("Element with ID 'clickme' not found.");
  }
});
