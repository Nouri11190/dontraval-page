export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    if (request.method === "POST") {
      try {
        const contentType = request.headers.get("content-type") || "";
        if (!contentType.includes("multipart/form-data")) {
          return new Response("Expected multipart/form-data", { status: 400 });
        }

        // Parse incoming form
        const formData = await request.formData();
        const file = formData.get("file");
        const fileType = formData.get("type") || "unknown";

        if (!file) return new Response("No file found", { status: 400 });

        // Create storage key based on category and filename
        const key = `${fileType}/${file.name}`;

        // Upload file to R2
        await env.MY_R2_BUCKET.put(key, file.stream());

        const fileUrl = `https://${env.CF_ACCOUNT_ID}.r2.cloudflarestorage.com/${env.MY_R2_BUCKET_NAME}/${key}`;

        return new Response(JSON.stringify({ success: true, fileUrl }), {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    return new Response("Method not allowed", { status: 405 });
  },
};
