async function fetchWithRetry(url, options = {}, retries = 3, delay = 2000) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.status === 429) {
        if (i < retries - 1) {
          await new Promise((res) => setTimeout(res, delay * (i + 1)));
          continue;
        } else {
          throw new Error(
            "Too Many Requests (429). Please try novamente mais tarde."
          );
        }
      }
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      return response;
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise((res) => setTimeout(res, delay * (i + 1)));
    }
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetchWithRetry(
      "https://raw.githubusercontent.com/ArthurSilv4/arthursouza.tech/refs/heads/master/README.md"
    );
    const data = await response.text();
    const container = document.getElementById("content");

    if (container) {
      container.innerHTML = marked(data);
      Prism.highlightAllUnder(container);
    } else {
      console.error("Element with ID 'content' not found.");
    }
  } catch (error) {
    console.error(error);
    const container = document.getElementById("content");
    if (container) {
      container.innerHTML = `<p style="color:red;">Erro ao carregar conteúdo: ${error.message}</p>`;
    }
  }
});

window.addEventListener("scroll", function () {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
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
    clickmeImage.addEventListener("click", () =>
      window.open("https://www.linkedin.com/in/arthur-souza-dev/", "_blank")
    );
  } else {
    console.error("Element with ID 'clickme' not found.");
  }
});
