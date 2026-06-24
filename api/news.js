export default async function handler(req, res) {
  const apiKey = process.env.VITE_NEWS_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ status: 'error', message: 'API key not configured' });
  }

  const { q, language = 'ko', sortBy = 'publishedAt', pageSize = 10 } = req.query;
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&language=${language}&sortBy=${sortBy}&pageSize=${pageSize}&apiKey=${apiKey}`;

  const upstream = await fetch(url);
  const data = await upstream.json();

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(upstream.status).json(data);
}
