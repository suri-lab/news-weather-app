// 인메모리 관리자 계정 저장소 (데모용 - 서버 재시작 시 초기화)
let admins = [];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { action, username, password } = req.body || {};

  if (action === 'register') {
    if (!username?.trim() || !password)
      return res.status(400).json({ error: '아이디와 비밀번호를 입력해주세요.' });
    if (admins.find((a) => a.username === username.trim()))
      return res.status(400).json({ error: '이미 사용 중인 아이디입니다.' });
    admins.push({ username: username.trim(), password });
    return res.status(201).json({ ok: true, username: username.trim() });
  }

  if (action === 'login') {
    const found = admins.find(
      (a) => a.username === username?.trim() && a.password === password
    );
    if (!found)
      return res.status(401).json({ error: '아이디 또는 비밀번호가 올바르지 않습니다.' });
    return res.status(200).json({ ok: true, username: found.username });
  }

  res.status(400).json({ error: '잘못된 요청입니다.' });
}
