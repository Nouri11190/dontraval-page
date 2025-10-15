export async function onRequestGet() {
  const serverInfo = {
    project: "DunFamzzy",
    version: "1.0.0",
    deployed: new Date().toISOString(),
    status: "running on Cloudflare Pages Functions",
  };

  return new Response(JSON.stringify(serverInfo), {
    headers: { "Content-Type": "application/json" },
  });
}
