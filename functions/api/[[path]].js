
export async function onRequest(context) {
  const { request, env } = context;

  if (!env.API_ORIGIN) {
    return new Response("API_ORIGIN is not configured", {
      status: 503
    });
  }

  const incoming = new URL(request.url);
  const target = new URL(
    incoming.pathname + incoming.search,
    env.API_ORIGIN
  );

  return fetch(new Request(target, request));
}
