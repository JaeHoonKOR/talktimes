export interface NewsItem {
  id: string;
  category: string;
  title: string;
  summary: string;
  content: string;
  time: string;
  source: string;
  readTime: string;
  importance: 'high' | 'medium' | 'low';
  tags: string[];
  imagePlaceholder?: string;
}

export const sampleNewsData: NewsItem[] = [
  {
    id: "news-001",
    category: "정치",
    title: "국정감사 주요 쟁점, 한눈에 정리",
    summary: "올해 국정감사의 핵심 이슈들과 각 정당의 입장을 간략하게 정리했습니다.",
    content: "2024년 국정감사가 시작되면서 여야 간 주요 쟁점들이 부각되고 있습니다. 경제정책, 부동산 대책, 외교안보 등 다양한 분야에서 치열한 공방이 예상됩니다.",
    time: "2시간 전",
    source: "연합뉴스",
    readTime: "1분",
    importance: "high",
    tags: ["국정감사", "정치", "국회"],
    imagePlaceholder: "news-politics-assembly.jpg - 국회 본회의장 전경 (국정감사 현장, 정치적 중요성을 나타내는 의사당 이미지)"
  },
  {
    id: "news-002",
    category: "경제",
    title: "반도체 수출 5개월 연속 증가세",
    summary: "한국의 반도체 수출이 5개월째 플러스 성장을 기록하며 경기 회복 신호를 보이고 있습니다.",
    content: "산업통상자원부에 따르면 9월 반도체 수출액은 전년 동월 대비 28.5% 증가한 132억 달러를 기록했습니다. 메모리 반도체를 중심으로 한 수요 회복이 주요 원인으로 분석됩니다.",
    time: "4시간 전",
    source: "한국경제",
    readTime: "2분",
    importance: "high",
    tags: ["반도체", "수출", "경제"],
    imagePlaceholder: "news-semiconductor-chip.jpg - 반도체 칩 클로즈업 (첨단 기술, 경제 성장의 상징, 미래산업 이미지)"
  },
  {
    id: "news-003",
    category: "IT",
    title: "ChatGPT-4 업데이트, 한국어 성능 대폭 개선",
    summary: "OpenAI가 GPT-4의 새로운 업데이트를 통해 한국어 처리 능력을 크게 향상시켰다고 발표했습니다.",
    content: "이번 업데이트로 한국어 문맥 이해와 자연스러운 대화 능력이 개선되었으며, 한국 문화와 관련된 질문에 대한 답변 정확도도 높아졌습니다.",
    time: "6시간 전",
    source: "테크크런치",
    readTime: "1분",
    importance: "medium",
    tags: ["AI", "ChatGPT", "기술"],
    imagePlaceholder: "news-ai-chatgpt.jpg - AI 로봇과 인간의 대화 (인공지능 기술, 미래 커뮤니케이션, 디지털 혁신)"
  },
  {
    id: "news-004",
    category: "사회",
    title: "수도권 전철 파업 타결, 정상 운행 재개",
    summary: "3일간 계속된 수도권 전철 파업이 노사 합의로 마무리되며 오늘 오후부터 정상 운행됩니다.",
    content: "철도노조와 코레일이 임금 인상과 근무 환경 개선에 대해 합의점을 찾으면서 시민들의 교통 불편이 해소될 예정입니다.",
    time: "1시간 전",
    source: "YTN",
    readTime: "1분",
    importance: "high",
    tags: ["교통", "파업", "수도권전철"],
    imagePlaceholder: "news-subway-station.jpg - 지하철역 승강장 (대중교통, 시민 일상, 도시 인프라)"
  },
  {
    id: "news-005",
    category: "건강",
    title: "독감 백신 접종 시기, 전문가 권고사항",
    summary: "올해 독감 유행에 대비해 언제, 누가 백신을 맞아야 하는지 전문가들의 조언을 정리했습니다.",
    content: "질병관리청은 10월부터 12월까지를 독감 백신 접종 권장 시기로 발표했으며, 특히 고위험군의 조기 접종을 당부했습니다.",
    time: "8시간 전",
    source: "메디컬투데이",
    readTime: "2분",
    importance: "medium",
    tags: ["건강", "백신", "독감"],
    imagePlaceholder: "news-vaccine-injection.jpg - 백신 접종 장면 (의료진이 환자에게 백신 접종, 예방의학, 공중보건)"
  },
  {
    id: "news-006",
    category: "국제",
    title: "미국 대선 여론조사, 접전 양상 지속",
    summary: "2024년 미국 대통령 선거를 한 달여 앞두고 주요 후보들 간 치열한 경쟁이 계속되고 있습니다.",
    content: "최신 여론조사에 따르면 주요 경합주에서 오차범위 내 접전이 이어지고 있으며, 투표율이 선거 결과의 핵심 변수가 될 것으로 예상됩니다.",
    time: "3시간 전",
    source: "CNN",
    readTime: "2분",
    importance: "high",
    tags: ["미국", "대선", "정치"],
    imagePlaceholder: "news-us-election.jpg - 미국 국기와 투표함 (민주주의, 선거 과정, 국제 정치)"
  },
  {
    id: "news-007",
    category: "스포츠",
    title: "손흥민, EPL 이번 시즌 10골 달성",
    summary: "토트넘의 손흥민이 이번 시즌 10번째 골을 기록하며 개인 통산 EPL 100골에 한 걸음 다가섰습니다.",
    content: "맨체스터 유나이티드와의 경기에서 결승골을 넣은 손흥민은 현재 EPL 통산 98골로 아시아 선수 최다 득점 기록을 경신하고 있습니다.",
    time: "12시간 전",
    source: "스포츠조선",
    readTime: "1분",
    importance: "medium",
    tags: ["축구", "손흥민", "EPL"],
    imagePlaceholder: "news-sonheungmin-goal.jpg - 손흥민 골 세레모니 (축구장에서 골을 넣고 기뻐하는 모습, 한국 스포츠 자긍심)"
  },
  {
    id: "news-008",
    category: "문화",
    title: "BTS 정국 솔로 앨범, 빌보드 차트 1위",
    summary: "BTS 멤버 정국의 첫 정규 솔로 앨범이 빌보드 200 차트에서 1위를 차지했습니다.",
    content: "이번 앨범은 발매 첫 주에 전 세계적으로 200만 장 이상의 판매고를 올렸으며, 한국 솔로 아티스트로는 최고 기록을 세웠습니다.",
    time: "5시간 전",
    source: "빌보드",
    readTime: "1분",
    importance: "medium",
    tags: ["K-pop", "BTS", "음악"],
    imagePlaceholder: "news-bts-jungkook.jpg - 정국 공연 무대 (화려한 조명 아래 공연하는 모습, K-pop 글로벌 성공)"
  },
  {
    id: "news-009",
    category: "환경",
    title: "서울시 미세먼지 농도, 3일째 '좋음' 단계",
    summary: "최근 북서풍의 영향으로 서울 지역 미세먼지 농도가 크게 개선되어 좋음 단계를 유지하고 있습니다.",
    content: "환경부에 따르면 향후 일주일간 대기 질이 양호할 것으로 예상되며, 시민들의 야외활동에 무리가 없을 것으로 전망됩니다.",
    time: "7시간 전",
    source: "환경일보",
    readTime: "1분",
    importance: "low",
    tags: ["환경", "미세먼지", "서울"],
    imagePlaceholder: "news-clean-air-seoul.jpg - 맑은 하늘의 서울 전경 (푸른 하늘과 도시 스카이라인, 깨끗한 공기)"
  },
  {
    id: "news-010",
    category: "과학",
    title: "한국 연구진, 알츠하이머 치료 단서 발견",
    summary: "국내 연구팀이 알츠하이머병의 새로운 치료 가능성을 제시하는 연구 결과를 발표했습니다.",
    content: "서울대학교 의과대학 연구팀은 뇌 속 특정 단백질의 작용 메커니즘을 규명하여 알츠하이머병 치료법 개발에 새로운 전환점을 마련했다고 발표했습니다.",
    time: "1일 전",
    source: "사이언스",
    readTime: "3분",
    importance: "high",
    tags: ["의학", "연구", "알츠하이머"],
    imagePlaceholder: "news-brain-research.jpg - 뇌 연구 실험실 (현미경과 뇌 모형, 의학 연구, 과학 발전)"
  },
  {
    id: "news-011",
    category: "부동산",
    title: "전국 아파트 매매가격 0.1% 상승",
    summary: "한국부동산원 발표에 따르면 이번 주 전국 아파트 매매가격이 소폭 상승했습니다.",
    content: "수도권은 0.08% 오른 반면 지방은 0.12% 상승하여 지역별 차이를 보였습니다. 전문가들은 금리 동향에 따른 시장 변화를 주시해야 한다고 분석했습니다.",
    time: "9시간 전",
    source: "부동산114",
    readTime: "2분",
    importance: "medium",
    tags: ["부동산", "아파트", "매매가격"],
    imagePlaceholder: "news-apartment-complex.jpg - 신축 아파트 단지 (현대적인 주거 복합단지, 부동산 시장, 주택 정책)"
  },
  {
    id: "news-012",
    category: "교육",
    title: "2025년 대입 수시 결과 발표 시작",
    summary: "전국 대학들이 2025학년도 수시모집 합격자 발표를 순차적으로 진행하고 있습니다.",
    content: "주요 대학들의 수시 경쟁률이 전년 대비 소폭 상승했으며, 학생부종합전형에서 특히 높은 경쟁률을 보였습니다.",
    time: "6시간 전",
    source: "한국교육신문",
    readTime: "2분",
    importance: "medium",
    tags: ["교육", "대입", "수시"],
    imagePlaceholder: "news-university-campus.jpg - 대학교 캠퍼스 전경 (가을 단풍과 함께한 캠퍼스, 학문의 전당, 교육)"
  },
  {
    id: "news-013",
    category: "기술",
    title: "삼성전자, 3나노 공정 양산 본격화",
    summary: "삼성전자가 차세대 3나노 반도체 공정의 양산을 본격 시작한다고 발표했습니다.",
    content: "이번 3나노 공정은 기존 5나노 대비 성능은 35% 향상되고 전력 소모는 50% 줄어든 것으로 알려졌습니다. 주요 글로벌 고객사들의 주문이 이미 확정된 상태입니다.",
    time: "4시간 전",
    source: "전자신문",
    readTime: "2분",
    importance: "high",
    tags: ["삼성전자", "반도체", "3나노"],
    imagePlaceholder: "news-semiconductor-factory.jpg - 반도체 생산 공장 (클린룸에서 작업하는 엔지니어, 첨단 제조업)"
  },
  {
    id: "news-014",
    category: "생활",
    title: "추석 연휴 고속도로 통행료 면제",
    summary: "정부가 추석 연휴 기간 고속도로 통행료를 면제한다고 발표했습니다.",
    content: "9월 28일부터 10월 1일까지 4일간 전국 고속도로 통행료가 면제되며, 민족 대이동에 따른 교통비 부담을 덜어줄 것으로 예상됩니다.",
    time: "10시간 전",
    source: "국토교통부",
    readTime: "1분",
    importance: "medium",
    tags: ["추석", "고속도로", "통행료"],
    imagePlaceholder: "news-highway-traffic.jpg - 고속도로 교통 상황 (귀성길 차량 행렬, 명절 풍경, 교통 인프라)"
  },
  {
    id: "news-015",
    category: "날씨",
    title: "내일 전국 가을비, 기온 5도 하락",
    summary: "내일부터 전국에 가을비가 내리며 기온이 크게 떨어질 것으로 예상됩니다.",
    content: "기상청은 내일 오후부터 이틀간 전국에 20~60mm의 비가 내리고, 기온이 평년보다 5도 낮아질 것이라고 예보했습니다. 우산과 따뜻한 옷을 준비하시기 바랍니다.",
    time: "30분 전",
    source: "기상청",
    readTime: "1분",
    importance: "medium",
    tags: ["날씨", "가을비", "기온"],
    imagePlaceholder: "news-autumn-rain.jpg - 가을비 풍경 (우산을 든 사람들, 젖은 거리, 계절 변화)"
  }
];

// 카테고리별 필터링 함수
export const getNewsByCategory = (category: string): NewsItem[] => {
  return sampleNewsData.filter(news => news.category === category);
};

// 중요도별 필터링 함수
export const getNewsByImportance = (importance: 'high' | 'medium' | 'low'): NewsItem[] => {
  return sampleNewsData.filter(news => news.importance === importance);
};

// 최신 뉴스 가져오기 함수
export const getLatestNews = (count: number = 10): NewsItem[] => {
  return sampleNewsData.slice(0, count);
};

// 태그별 뉴스 검색 함수
export const getNewsByTag = (tag: string): NewsItem[] => {
  return sampleNewsData.filter(news => 
    news.tags.some(newsTag => 
      newsTag.toLowerCase().includes(tag.toLowerCase())
    )
  );
};