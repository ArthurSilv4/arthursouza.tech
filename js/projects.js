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
            "Muitas requisições (429). Tente novamente mais tarde."
          );
        }
      }
      if (!response.ok)
        throw new Error(`Erro HTTP! status: ${response.status}`);
      return response;
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise((res) => setTimeout(res, delay * (i + 1)));
    }
  }
}

async function fetchWithCache(url, cacheKey, cacheTTL = 1800) {
  // 1800s = 30 min
  const now = Date.now();

  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    const parsed = JSON.parse(cached);
    const isExpired = now - parsed.timestamp > cacheTTL * 1000;
    if (!isExpired) {
      return parsed.data;
    }
  }

  const response = await fetchWithRetry(url);
  const data = await response.text();

  localStorage.setItem(
    cacheKey,
    JSON.stringify({
      timestamp: now,
      data,
    })
  );

  return data;
}

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("content");

  try {
    const data = await fetchWithCache(
      "https://raw.githubusercontent.com/ArthurSilv4/arthursouza.tech/master/README.md",
      "cachedReadme",
      1800 // tempo em segundos (30 minutos)
    );

    if (container) {
      container.innerHTML = marked(data);
      Prism.highlightAllUnder(container);
    } else {
      console.error("Elemento com ID 'content' não encontrado.");
    }
  } catch (error) {
    console.error(error);
    if (container) {
      container.innerHTML = `<p style="color:red;">Erro ao carregar conteúdo: ${error.message}</p>`;
    }
  }

  const clickmeImage = document.getElementById("clickme");
  if (clickmeImage) {
    clickmeImage.addEventListener("click", () =>
      window.open("https://www.linkedin.com/in/arthur-souza-dev/", "_blank")
    );
  } else {
    console.error("Elemento com ID 'clickme' não encontrado.");
  }
});

window.addEventListener("scroll", function () {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    const clickmeElement = document.getElementById("clickme");
    if (clickmeElement) {
      clickmeElement.style.display = "block";
      clickmeElement.classList.add("animate-clickme");
    } else {
      console.error("Elemento com ID 'clickme' não encontrado.");
    }
  }
});
