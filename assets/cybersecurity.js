document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("cyberList");

  try {
    const res = await fetch("data/cybersecurity.json");
    if (!res.ok) throw new Error("Failed to load cybersecurity.json");
    const tools = await res.json();

    container.innerHTML = tools
      .map(
        (tool) => `
        <div class="tool-card fade">
          <h3>${tool.name}</h3>
          <p>${tool.description}</p>
          <a href="${tool.link}" target="_blank" class="btn-primary">🔗 Open Tool</a>
        </div>
      `
      )
      .join("");
  } catch (err) {
    console.error(err);
    container.innerHTML = `<p class="error">❌ Could not load cybersecurity tools.</p>`;
  }
});
