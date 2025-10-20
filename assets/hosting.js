document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("hostingPlans");

  try {
    const res = await fetch("data/hosting.json");
    if (!res.ok) throw new Error("Failed to load hosting data.");
    const plans = await res.json();

    container.innerHTML = plans
      .map(
        (plan) => `
        <div class="plan-card fade">
          <h3>${plan.name}</h3>
          <p class="price">$${plan.price}/month</p>
          <ul>
            ${plan.features.map((f) => `<li>✅ ${f}</li>`).join("")}
          </ul>
          <a href="${plan.link}" target="_blank" class="btn-primary">Get Started</a>
        </div>
      `
      )
      .join("");
  } catch (err) {
    console.error(err);
    container.innerHTML = `<p class="error">❌ Failed to load hosting plans.</p>`;
  }
});
