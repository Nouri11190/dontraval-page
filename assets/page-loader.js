document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("contentList");
  const searchBox = document.getElementById("searchBox");
  const pageName = document.body.dataset.page;

  let data = [];

  // Load JSON data dynamically based on page
  try {
    const res = await fetch(`data/${pageName}.json`);
    if (!res.ok) throw new Error(`Cannot load data/${pageName}.json`);
    data = await res.json();
    renderItems(data);
  } catch (err) {
    console.error(err);
    container.innerHTML = `<p class="error">❌ Unable to load ${pageName} data.</p>`;
  }

  // Live search filtering
  if (searchBox) {
    searchBox.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase();
      const filtered = data.filter((item) => {
        if (pageName === "ebooks") {
          return (
            item.title.toLowerCase().includes(query) ||
            item.author.toLowerCase().includes(query)
          );
        } else {
          return (
            item.name.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query)
          );
        }
      });
      renderItems(filtered);
    });
  }

  function renderItems(list) {
    container.innerHTML = list
      .map((item) => {
        if (pageName === "ebooks") {
          return `
            <div class="card fade">
              <h3>${item.title}</h3>
              <p>By ${item.author}</p>
              <a href="${item.link}" target="_blank" class="btn-primary">📘 Read / Download</a>
            </div>`;
        } else {
          return `
            <div class="card fade">
              <h3>${item.name}</h3>
              <p>${item.description}</p>
              <a href="${item.link}" target="_blank" class="btn-primary">🔗 Open</a>
            </div>`;
        }
      })
      .join("");

    if (!list.length) {
      container.innerHTML = `<p class="no-results">🔍 No results found.</p>`;
    }
  }
});
