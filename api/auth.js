// 고정 관리자 계정
const ADMIN = { username: 'admin', password: 'admin' };

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { username, password } = req.body || {};

  if (username === ADMIN.username && password === ADMIN.password) {
    return res.status(200).json({ ok: true, username: ADMIN.username });
  }

  return res.status(401).json({ error: '아이디 또는 비밀번호가 올바르지 않습니다.' });
}
