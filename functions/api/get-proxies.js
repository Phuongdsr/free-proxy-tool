export async function onRequest(context) {
  const url = new URL(context.request.url);
  const queryString = url.search;

  // Đường dẫn gốc bị ẩn đi, người dùng bấm F12 tuyệt đối không thấy link này
  const targetUrl = `https://proxmint.com/api/free-proxies${queryString}`;

  try {
    const response = await fetch(targetUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
