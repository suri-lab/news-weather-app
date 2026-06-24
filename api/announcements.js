let announcements = [];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    return res.status(200).json(announcements);
  }

  if (req.method === 'POST') {
    const { action, content, id } = req.body || {};

    // 좋아요
    if (action === 'like') {
      const item = announcements.find((a) => a.id === Number(id));
      if (!item) return res.status(404).json({ error: '없는 공지입니다.' });
      item.likes = (item.likes || 0) + 1;
      return res.status(200).json({ likes: item.likes });
    }

    // 공지 등록
    if (!content?.trim()) return res.status(400).json({ error: '내용을 입력해주세요.' });
    const item = {
      id: Date.now(),
      content: content.trim(),
      likes: 0,
      createdAt: new Date().toISOString(),
    };
    announcements.unshift(item);
    return res.status(201).json(item);
  }

  if (req.method === 'DELETE') {
    const id = Number(req.query.id);
    announcements = announcements.filter((a) => a.id !== id);
    return res.status(200).json({ ok: true });
  }

  res.status(405).end();
}
