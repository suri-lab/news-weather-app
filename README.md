# 🌐 한국 뉴스 & 날씨 대시보드

React + Vite + Tailwind CSS로 만든 한국어 뉴스 & 날씨 대시보드 앱입니다.

## 🚀 기능

- **날씨**: OpenWeatherMap API를 통한 실시간 날씨 정보 (기온, 체감온도, 습도, 풍속)
- **뉴스**: NewsAPI를 통한 한국 주요 뉴스 (전체 / 기술 / 경제 / 사회)
- **다크모드**: 시스템 설정 연동 + 수동 토글
- **반응형**: 모바일/태블릿/데스크탑 대응
- **목업 데이터**: API 키 없이도 UI 미리보기 가능

---

## ⚡ 빠른 시작

```bash
# 1. 의존성 설치
npm install

# 2. 환경변수 설정
cp .env.example .env
# .env 파일을 열어 API 키 입력

# 3. 개발 서버 실행
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

---

## 🔑 API 키 발급 방법

### OpenWeatherMap (날씨 API)
1. [openweathermap.org](https://openweathermap.org) 접속
2. 무료 회원가입
3. 상단 메뉴 → **API Keys** 탭
4. 기본 생성된 키 복사 (또는 새로 생성)
5. `.env` 파일에 붙여넣기

```
VITE_OPENWEATHER_API_KEY=발급받은키
```

> ⏰ 키 활성화까지 최대 2시간 소요될 수 있습니다.

### NewsAPI (뉴스 API)
1. [newsapi.org](https://newsapi.org) 접속
2. **Get API Key** 클릭 → 무료 회원가입
3. 대시보드에서 API 키 복사
4. `.env` 파일에 붙여넣기

```
VITE_NEWS_API_KEY=발급받은키
```

> ⚠️ 무료 플랜은 localhost 개발 환경에서만 사용 가능합니다.

---

## 📁 프로젝트 구조

```
src/
├── components/
│   ├── WeatherWidget.jsx   # 날씨 위젯
│   ├── NewsCard.jsx        # 뉴스 카드
│   ├── NewsGrid.jsx        # 뉴스 그리드 + 카테고리 탭
│   ├── SearchBar.jsx       # 도시 검색
│   └── DarkModeToggle.jsx  # 다크모드 토글
├── hooks/
│   ├── useWeather.js       # 날씨 데이터 훅
│   └── useNews.js          # 뉴스 데이터 훅
├── App.jsx                 # 루트 컴포넌트
├── main.jsx                # 진입점
└── index.css               # 전역 스타일
.env.example                # 환경변수 예시
```

---

## 🛠️ 기술 스택

| 기술 | 버전 | 용도 |
|------|------|------|
| React | 19 | UI 라이브러리 |
| Vite | 6 | 빌드 도구 |
| Tailwind CSS | 4 | 스타일링 |
| lucide-react | latest | 아이콘 |
| OpenWeatherMap API | free | 날씨 데이터 |
| NewsAPI | free | 뉴스 데이터 |

---

## 📦 빌드

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```
