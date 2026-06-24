// 인메모리 공지사항 저장소 (서버 재시작 시 초기화됨 - 데모용)
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
    const { content } = req.body;
    if (!content?.trim()) return res.status(400).json({ error: '내용을 입력해주세요.' });
    const item = {
      id: Date.now(),
      content: content.trim(),
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
