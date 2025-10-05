export async function onRequestGet(context) {
  // Access env vars at runtime (from Cloudflare dashboard)
  const { WEB3_PROVIDER_ETH, WEB3_PROVIDER_BSC, BSCSCAN_API_KEY } = context.env;

  return new Response(
    JSON.stringify({
      WEB3_PROVIDER_ETH,
      WEB3_PROVIDER_BSC,
      BSCSCAN_API_KEY
    }),
    {
      headers: { "Content-Type": "application/json" }
    }
  );
}
