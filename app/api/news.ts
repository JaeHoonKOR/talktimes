export interface NewsItem {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  publishedAt: string;
}

export interface AISummary {
  id: string;
  source: string;
  time: string;
  title: string;
  summary: string;
}

// 뉴스 데이터 가져오기 (실제 구현에서는 외부 API 호출)
export async function getLatestNews(): Promise<NewsItem[]> {
  // 여기서는 정적 데이터 반환, 실제로는 API 호출
  return [
    {
      id: '1',
      category: '테크',
      title: '인공지능의 새로운 흐름, 모델 경량화 기술 발전',
      excerpt: '최근 AI 모델의 크기가 작아지면서도 성능은 향상되는 추세. 개인용 기기에서도 고성능 AI를 사용할 수 있는 시대가 도래했습니다.',
      image: '/news_sample/news_sample_1.png',
      publishedAt: '2024-08-15',
    },
    {
      id: '2',
      category: '비즈니스',
      title: '글로벌 스타트업 투자 동향, 한국 기업의 활약 두드러져',
      excerpt: '올해 상반기 글로벌 투자 시장에서 한국 스타트업들이 주목받고 있습니다. 특히 AI와 클린테크 분야에서 강세를 보입니다.',
      image: '/news_sample/news_sample_2.png',
      publishedAt: '2024-08-15',
    },
    {
      id: '3',
      category: '푸드테크',
      title: '과학자들이 밝혀낸 완벽한 스테이크 굽기의 비밀',
      excerpt: '식품과학 연구진의 실험 결과, 고기는 강한 열로 굽는 것보다 중간 불에서 자주 뒤집어가며 굽는 것이 육즙을 45% 더 보존하는 것으로 나타났습니다. 이는 단백질 변성 과정과 관련이 있습니다.',
      image: '/news_sample/news_sample_3.png',
      publishedAt: '2024-08-14',
    },
  ];
}

// AI 요약 데이터 가져오기
export async function getAISummaries(): Promise<AISummary[]> {
  // 여기서는 정적 데이터 반환, 실제로는 API 호출
  return [
    {
      id: '1',
      source: '테크 뉴스',
      time: '오늘',
      title: '구글, 새로운 AI 모델 발표',
      summary: "구글이 새로운 생성형 AI 모델 '젬마 2'를 공개했습니다. 이전 모델보다 45% 개선된 성능을 보이며, 특히 복잡한 추론 작업에서 뛰어난 결과를 보여줍니다. 오픈소스로 제공되어 다양한 응용이 가능합니다.",
    },
    {
      id: '2',
      source: '경제 인사이트',
      time: '어제',
      title: '미 연준, 기준금리 동결 결정',
      summary: '미국 연방준비제도(Fed)가 기준금리를 현 수준에서 동결하기로 결정했습니다. 인플레이션이 목표치에 근접했으나 아직 추가 관찰이 필요하다는 이유입니다. 올해 안에 1-2회 금리 인하 가능성을 시사했습니다.',
    },
    {
      id: '3',
      source: '헬스케어 투데이',
      time: '2일 전',
      title: '새로운 당뇨병 치료법 임상시험 성공',
      summary: '새로운 당뇨병 치료법이 3상 임상시험에서 높은 효과를 보였습니다. 주 1회 주사로 혈당 조절이 가능하며, 기존 약물 대비 부작용이 적다는 장점이 있습니다. 내년 초 시장 출시가 예상됩니다.',
    },
  ];
} 