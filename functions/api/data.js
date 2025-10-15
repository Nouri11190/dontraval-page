export async function onRequest(context) {
  const { request, env } = context;
  const method = request.method.toUpperCase();

  // Fetch local JSON files from the deployed project
  async function getJSON(filePath) {
    try {
      const url = new URL(filePath, request.url);
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Cannot read ${filePath}`);
      return await res.json();
    } catch (err) {
      return { error: `Failed to load ${filePath}`, details: err.message };
    }
  }

  switch (method) {
    case "GET": {
      const vpn = await getJSON("/data/vpn.json");
      const ebooks = await getJSON("/data/ebook.json");

      return new Response(
        JSON.stringify({
          success: true,
          source: "DunFamzzy Cloudflare API",
          vpn,
          ebooks,
        }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    case "POST": {
      try {
        const body = await request.json();
        return new Response(
          JSON.stringify({
            success: true,
            message: "Data received successfully",
            received: body,
          }),
          { headers: { "Content-Type": "application/json" } }
        );
      } catch (err) {
        return new Response(
          JSON.stringify({ success: false, error: "Invalid JSON data" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    default:
      return new Response(
        JSON.stringify({ success: false, error: "Method not allowed" }),
        { status: 405, headers: { "Content-Type": "application/json" } }
      );
  }
}
