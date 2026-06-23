import { useState, useEffect, useCallback } from 'react';

// NewsAPI 기본 URL
const BASE_URL = 'https://newsapi.org/v2';

// 카테고리 매핑 (한국어 → API 파라미터)
const CATEGORY_MAP = {
  '전체': '',
  '기술': 'technology',
  '경제': 'business',
  '사회': 'general',
};

export function useNews(initialCategory = '전체') {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState(initialCategory);

  const fetchNews = useCallback(async (selectedCategory) => {
    const apiKey = import.meta.env.VITE_NEWS_API_KEY;

    // API 키 미설정 시 목업 데이터 반환
    if (!apiKey || apiKey === 'your_key_here') {
      setNews(getMockNewsData());
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const categoryParam = CATEGORY_MAP[selectedCategory] || '';

      // top-headlines country=kr 이 빈 결과를 반환하는 경우가 많아 everything 엔드포인트 사용
      const query = categoryParam ? `한국 ${selectedCategory}` : '한국';
      const url = `${BASE_URL}/everything?q=${encodeURIComponent(query)}&language=ko&sortBy=publishedAt&pageSize=10&apiKey=${apiKey}`;

      const res = await fetch(url);

      if (!res.ok) {
        if (res.status === 401) throw new Error('뉴스 API 키가 유효하지 않습니다. .env 파일을 확인해주세요.');
        throw new Error('뉴스를 불러오는 데 실패했습니다.');
      }

      const data = await res.json();

      if (data.status === 'error') throw new Error(data.message || '뉴스를 불러오는 데 실패했습니다.');

      // 제목 없는 기사 필터링
      const filtered = (data.articles || []).filter(
        (a) => a.title && a.title !== '[Removed]'
      );
      setNews(filtered);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews(category);
  }, [category, fetchNews]);

  const changeCategory = (newCategory) => {
    setCategory(newCategory);
  };

  return { news, loading, error, category, changeCategory };
}

// API 키 없을 때 사용하는 목업 데이터
function getMockNewsData() {
  return [
    {
      title: '국내 AI 스타트업, 글로벌 투자 유치 성공',
      description: '국내 주요 AI 스타트업들이 해외 벤처캐피털로부터 대규모 투자를 유치하며 글로벌 시장 진출에 박차를 가하고 있다.',
      source: { name: '테크뉴스' },
      publishedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      urlToImage: 'https://picsum.photos/seed/news1/400/200',
      url: '#',
    },
    {
      title: '한국 경제, 수출 회복세로 2분기 성장률 개선 기대',
      description: '반도체·자동차 수출 호조에 힘입어 2분기 경제 성장률이 전 분기 대비 개선될 것으로 전망된다.',
      source: { name: '경제일보' },
      publishedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      urlToImage: 'https://picsum.photos/seed/news2/400/200',
      url: '#',
    },
    {
      title: '정부, 디지털 전환 지원 예산 2조원 확대 발표',
      description: '과학기술정보통신부가 중소기업 디지털 전환 지원을 위한 예산을 대폭 확대한다고 밝혔다.',
      source: { name: '정책뉴스' },
      publishedAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
      urlToImage: 'https://picsum.photos/seed/news3/400/200',
      url: '#',
    },
    {
      title: '전국 폭염 특보 발령, 최고 기온 38도 예상',
      description: '기상청은 이번 주말 전국 대부분 지역에 폭염 특보를 발령하며 야외 활동 자제를 당부했다.',
      source: { name: '날씨뉴스' },
      publishedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
      urlToImage: 'https://picsum.photos/seed/news4/400/200',
      url: '#',
    },
    {
      title: 'K-콘텐츠 열풍, OTT 플랫폼 한국 드라마 시청률 신기록',
      description: '넷플릭스·디즈니플러스 등 주요 OTT 플랫폼에서 한국 드라마의 글로벌 시청률이 역대 최고치를 경신했다.',
      source: { name: '엔터테인먼트' },
      publishedAt: new Date(Date.now() - 1000 * 60 * 150).toISOString(),
      urlToImage: 'https://picsum.photos/seed/news5/400/200',
      url: '#',
    },
    {
      title: '삼성전자, 차세대 반도체 공정 기술 개발 완료',
      description: '삼성전자가 2나노 이하 초미세 공정 기술 개발을 완료하고 내년 양산 체제에 돌입할 예정이라고 밝혔다.',
      source: { name: 'IT조선' },
      publishedAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
      urlToImage: 'https://picsum.photos/seed/news6/400/200',
      url: '#',
    },
    {
      title: '서울시, 대중교통 야간 운행 시간 연장 시행',
      description: '서울시가 다음 달부터 지하철과 버스의 야간 운행 시간을 기존보다 1시간 연장한다고 발표했다.',
      source: { name: '서울신문' },
      publishedAt: new Date(Date.now() - 1000 * 60 * 210).toISOString(),
      urlToImage: 'https://picsum.photos/seed/news7/400/200',
      url: '#',
    },
    {
      title: '국내 전기차 판매량, 전년 대비 45% 증가',
      description: '올해 상반기 국내 전기차 판매량이 전년 동기 대비 45% 증가하며 친환경차 대중화가 가속화되고 있다.',
      source: { name: '자동차신문' },
      publishedAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
      urlToImage: 'https://picsum.photos/seed/news8/400/200',
      url: '#',
    },
    {
      title: '국내 스타트업 생태계 활성화, 투자·창업 모두 증가세',
      description: '올해 상반기 국내 스타트업 생태계가 투자와 창업 모두 증가세를 보이며 회복 기조를 이어가고 있다.',
      source: { name: '스타트업뉴스' },
      publishedAt: new Date(Date.now() - 1000 * 60 * 270).toISOString(),
      urlToImage: 'https://picsum.photos/seed/news9/400/200',
      url: '#',
    },
    {
      title: '대학수학능력시험 원서접수 시작, 지원자 수 소폭 증가',
      description: '올해 수능 원서접수가 시작됐으며, 지원자 수가 전년 대비 소폭 증가한 것으로 나타났다.',
      source: { name: '교육신문' },
      publishedAt: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
      urlToImage: 'https://picsum.photos/seed/news10/400/200',
      url: '#',
    },
  ];
}
