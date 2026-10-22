export default async function handler(req: any, res: any) {
  const { q } = req.query;
  try {
    const googleUrl = `https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(q)}`;
    const googleRes = await fetch(googleUrl);
    const data = await googleRes.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch suggestions' });
  }
}