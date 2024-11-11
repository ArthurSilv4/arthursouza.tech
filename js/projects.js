document.addEventListener("DOMContentLoaded", function () {
  if (typeof marked === "function") {
    fetch('https://raw.githubusercontent.com/ArthurSilv4/arthurdesouza.com/refs/heads/master/README.md')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.text();
      })
      .then(data => {
        const readmeHtml = marked(data);
        const container = document.getElementById('content');
        if (container) {
          container.innerHTML = readmeHtml;
          Prism.highlightAllUnder(container);
        } else {
          console.error("Element with ID 'content' not found");
        }
      })
      .catch(error => console.error("Oops:", error));
  } else {
    console.error("Marked is not available");
  }
});