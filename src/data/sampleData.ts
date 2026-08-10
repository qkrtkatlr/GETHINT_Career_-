import { ResumeProfile, TargetJob, AnalysisResult } from '../types';

export const SAMPLE_RESUME_PROFILE: ResumeProfile = {
  resumeText: `[경력 요약]
5년 차 시니어 테크니컬 프로덕트 매니저(TPM / PM)로서 IT/핀테크 플랫폼의 서비스 기획, 사용자 경험 개선, 데이터 기반 A/B 테스트 및 아키텍처 개선 프로젝트를 주도했습니다.

[주요 역량]
- 데이터 기반 의도적 사용자 여정 설계 및 전환율 개선
- SQL, Amplitude, Python을 활용한 사용자 행동 패턴 분석
- 개발진 및 인프라 팀과의 원활한 소통 (API 규격 설계 참여 경험)
- OKR 설정 및 애자일/스크럼 스프린트 운영`,
  fileName: "이력서_홍길동_2024.pdf",
  experiences: [
    {
      id: "exp-1",
      company: "토스페이먼츠 (Toss Payments)",
      role: "Senior Product Manager",
      period: "2022.03 - 재직 중",
      responsibilities: "가맹점 결제 연동 SDK 및 결제 이탈율 개선 PM. 결제 프로세스 UX 개편 및 응답 속도 최적화.",
      results: "결제 완료율(Conversion Rate) 14.2% 향상, 가맹점 연동 이탈률 28% 감소. 월 거래액 1,200억 달성 기여.",
      tools: "SQL, Figma, Amplitude, Jira, Datadog",
      evidenceScore: 4
    },
    {
      id: "exp-2",
      company: "카카오엔터프라이즈",
      role: "Product Manager",
      period: "2020.01 - 2022.02",
      responsibilities: "기업용 B2B 협업 플랫폼 API 콘솔 및 대시보드 기획. 글로벌 엔터프라이즈 고객 요구사항 분석.",
      results: "월간 활성 가입 기업 수 350% 증가. API 에러율 0.05% 이하로 낮추기 위한 서킷 브레이커 도입 기획.",
      tools: "Postman, Swagger, Confluence, Google Analytics",
      evidenceScore: 3
    }
  ],
  projects: [
    {
      id: "proj-1",
      name: "원클릭 빠른 결제 UX & 결제 실패 복구 프로젝트",
      role: "Lead PM (100% 기획)",
      period: "2023.05 - 2023.11",
      achievements: "네트워크 오류 발생 시 자동 재시도 및 대안 결제수단 추천 로직 구현. 결제 성공률 +4.8%p 상승.",
      tools: "Mixpanel, Figma, REST API",
      evidenceScore: 5
    },
    {
      id: "proj-2",
      name: "B2B 결제 데이터 분석 대시보드 구축",
      role: "PM & Data Specialist",
      period: "2022.08 - 2022.12",
      achievements: "가맹점 정산 내역 및 수수료 실시간 시각화 리포트 제작. 정산 관련 CS 문의 건수 45% 절감.",
      tools: "Tableau, BigQuery, SQL",
      evidenceScore: 4
    }
  ]
};

export const SAMPLE_TARGET_JOB: TargetJob = {
  company: "네이버 (NAVER)",
  title: "Principal / Lead Product Manager (핀테크 & 결제)",
  description: `[담당 업무]
- 네이버페이 및 결제 플랫폼의 핵심 사용자 경험 및 백엔드 파이프라인 기획
- 대규모 트래픽 환경에서의 결제 안정성 확보 및 글로벌 결제 확장 전략 수립
- 데이터 분석 기반의 핵심 지표(MAU, TPU, Retention) 설정 및 데이터 기반 가설 검증
- 엔지니어링, 디자인, 사업, 데이터 분석가 등 다학제적 조직 이끌기

[자격 요건]
- IT/핀테크 분야 PM 경력 5년 이상 필수
- 데이터 분석 도구(SQL, Amplitude 등) 능숙 및 퀀트적 의사결정 능력
- 복잡한 도메인 시스템(결제, 정산, 금융 API)에 대한 깊은 이해도
- 대규모 서비스 장애 대응 및 리스크 관리 경험

[우대 사항]
- 글로벌 결제 PG 및 해외 결제망 연동 프로젝트 리드 경험
- 개발자 출신이거나 기술적 아키텍처에 대한 높은 이해도를 갖춘 분`,
  talentValues: "Customer First, Radical Transparency, Data-driven Decision Making, High Ownership"
};

export const SAMPLE_ANALYSIS_RESULT: AnalysisResult = {
  overallMatchScore: 84,
  experienceLevel: "Senior (5~7년 차)",
  keyReadiness: "High Readiness (즉시 전력감)",
  analyzedAt: "2024-08-10 10:30",
  radarData: [
    { subject: "직무 전문성", current: 88, target: 90, fullMark: 100, description: "핀테크/결제 도메인 경험과 B2B 연동 이해도가 매우 우수함" },
    { subject: "실무 증거력", current: 82, target: 85, fullMark: 100, description: "정량적 성과 지표가 명확하나 일부 프로젝트의 정밀 수치 보완 필요" },
    { subject: "프로젝트 임팩트", current: 86, target: 90, fullMark: 100, description: "거래액 달성 및 이탈률 감소 등 사업적 성과 기여가 큼" },
    { subject: "JD 적합도", current: 85, target: 95, fullMark: 100, description: "네이버페이 핵심 자격 요건과 85% 이상 일치" },
    { subject: "리더십 & 협업", current: 78, target: 85, fullMark: 100, description: "다학제 팀 리딩 경험 및 커뮤니케이션 근거 명시 필요" },
    { subject: "문제 해결력", current: 84, target: 90, fullMark: 100, description: "결제 실패 복구 로직 등 기술적 문제 정의 및 해결 탁월" }
  ],
  strengths: [
    {
      title: "명확하고 정량화된 결제 도메인 실무 성과",
      category: "도메인 임팩트",
      description: "토스페이먼츠에서 결제 완료율 14.2% 향상, 가맹점 연동 이탈률 28% 감소 등 구체적인 KPI 수치를 입증했습니다.",
      evidencePoints: [
        "월 거래액 1,200억 달성 기여",
        "결제 실패 복구 로직 기획으로 성공률 +4.8%p 개선"
      ]
    },
    {
      title: "데이터 기반의 문제 정의 및 검증 역량",
      category: "데이터 분석",
      description: "SQL, Amplitude, Mixpanel, BigQuery를 직접 다루며 데이터에 기반한 의사결정을 실천하고 있습니다.",
      evidencePoints: [
        "B2B 데이터 대시보드 구축으로 CS 문의 45% 절감",
        "사용자 행동 패턴 분석을 통한 원클릭 결제 UX 개편"
      ]
    },
    {
      title: "기술적 이해도 기반의 개발진 협업력",
      category: "테크니컬 PM",
      description: "서킷 브레이커, API 규격, 네트워크 자동 재시도 로직 등 백엔드 엔지니어링 개념을 적재적소에 활용하고 있습니다.",
      evidencePoints: [
        "API 에러율 0.05% 이하 관리 기획",
        "SDK 연동 프로세스 효율화"
      ]
    }
  ],
  gaps: [
    {
      title: "글로벌 결제 PG 및 해외 결제망 경험 부재",
      category: "우대사항 갭",
      description: "JD 우대사항에 포함된 해외 결제망(Visa, Mastercard 글로벌 API 등) 연동 관련 실무 경험이 구체적으로 나타나지 않습니다.",
      impactLevel: "Moderate",
      actionItem: "국내 B2B/PG 연동 시 적용했던 표준 규격 및 해외 시스템 확장성 고려 설계를 강조하여 커버 전략을 세우세요."
    },
    {
      title: "대규모 트래픽 장애 발생 시 리스크 관리 사례 명시 부족",
      category: "안정성 관리",
      description: "네이버 수준의 초고대규모 트래픽 환경에서 장애 대응 또는 서버 부하 분산 관련 PM 경험 소명이 다소 부족합니다.",
      impactLevel: "Moderate",
      actionItem: "토스페이먼츠 트래픽 피크 타임(블랙 프라이데이 등)에서의 시스템 안정성 기획 사례를 경험에 추가하세요."
    },
    {
      title: "조직 리더십 및 피플 매니지먼트 근거 강화 필요",
      category: "리더십",
      description: "Lead PM으로서 다학제 조직간 갈등 조율이나 junior PM 멘토링 관련 기술이 부족합니다.",
      impactLevel: "Minor",
      actionItem: "스프린트 회고 및 교차 부서(Cross-functional) 커뮤니케이션 방식을 구체적으로 기술하세요."
    }
  ],
  redFlags: [
    {
      title: "프로젝트 2(B2B 대시보드) 기여율 및 역할 모호성",
      category: "검증 리스크",
      description: "대시보드 구축 프로젝트에서 데이터 분석가/디자이너와의 역할 분담 비율 및 본인의 고유 기여분이 다소 모호하게 비춰집니다.",
      riskLevel: "Medium",
      mitigation: "'내가 직접 작성한 지표 정의서 및 SQL 쿼리 목록'을 면접 시 구체적인 답변으로 제시해야 합니다."
    },
    {
      title: "성과 수치의 측정 기준에 대한 질문 예상 (ALERT)",
      category: "증거력 검증",
      description: "'결제 완료율 14.2% 향상'의 Baseline 기간 및 외부 요인 통제 방법(A/B 테스트 코호트 조건)에 대해 면접관의 압박 검증이 들어올 수 있습니다.",
      riskLevel: "High",
      mitigation: "A/B 테스트의 대조군/실험군 비율, 샘플 사이즈, 통계적 유의성(p-value)을 명확히 정리해두세요."
    }
  ],
  evidenceAnalysis: [
    {
      experienceTitle: "토스페이먼츠 - Senior Product Manager",
      evidenceScore: 4,
      strongClaims: ["결제 완료율 14.2% 향상", "월 거래액 1,200억 달성 기여"],
      missingProof: ["완료율 향상에 영향을 준 정확한 UX 변경 지점별 전후 데이터", "가맹점 수 증가율"],
      suggestion: "결제 단계별 이탈률(Funnel analysis) 데이터 포인트를 1-2개 더 서술하면 5점 만점으로 상승합니다."
    },
    {
      experienceTitle: "원클릭 빠른 결제 UX 프로젝트",
      evidenceScore: 5,
      strongClaims: ["자동 재시도 로직 구현", "결제 성공률 +4.8%p 상승"],
      missingProof: [],
      suggestion: "완벽한 구체성과 기술적 증거가 포함된 최우수 기재 항목입니다."
    },
    {
      experienceTitle: "카카오엔터프라이즈 - Product Manager",
      evidenceScore: 3,
      strongClaims: ["월간 활성 기업 수 350% 증가"],
      missingProof: ["기반 MAU 수치 (Base number)", "API 에러율 감소에 대한 본인의 기획적 기여 범위"],
      suggestion: "'350% 증가'의 모수가 되는 초기 수치 범위(예: 100개사 -> 450개사)를 명시하여 신뢰도를 높이세요."
    }
  ],
  hiringRisks: [
    {
      area: "A/B 테스트 통계적 유의성 및 성과 인과관계",
      defensibilityScore: 65,
      pressureQuestions: [
        "결제 완료율 14.2% 상승이 순수한 PM의 UX 개편 덕분인지, 마케팅 프로모션이나 외부 요인 때문인지 어떻게 분리 측정했나요?",
        "A/B 테스트 실행 시 샘플 사이즈와 최소 검정력은 어떻게 계산했습니까?"
      ],
      defenseStrategy: "A/B 테스트 진행 당시 통제 변인(마케팅 부하 제외, 동일 기간 코호트 격리)과 Amplitude의 95% 신뢰구간 분석 결과를 3문장으로 간결하게 소명하세요."
    },
    {
      area: "기술적 한계 상황에서의 의사결정 방식",
      defensibilityScore: 70,
      pressureQuestions: [
        "서킷 브레이커 도입 기획 시 개발진이 과도한 아키텍처 공수로 반대했을 때 어떻게 설득했나요?",
        "대형 가맹점의 커스텀 요구사항과 자체 플랫폼 표준화 간의 충돌 시 우선순위 기준은 무엇이었습니까?"
      ],
      defenseStrategy: "서비스 가용성(SLA 99.99%) 보장 시 발생하는 사업적 손실 방지액을 데이터로 환산해 개발팀과 유관부서를 설득했던 에피소드로 답변하세요."
    }
  ],
  finalVerdict: {
    verdict: "Strong Hire",
    executiveSummary: `[현업 팀장 종합 평가]
후보자는 핀테크/결제 도메인에서 실질적인 비즈니스 임팩트를 증명한 우수한 테크니컬 PM입니다. 특히 데이터 기반의 문제 정의 및 결제 이탈률 개선 성과가 돋보입니다. 

네이버페이 및 결제 플랫폼 PM 직무에 즉시 투입 가능한 'High Readiness' 수준으로 평가되며, 기술적 이해도 또한 개발진과의 소통에 차질이 없을 만큼 탄탄합니다.

단, 면접 전 '성과 지표의 Baseline 및 A/B 테스트 검증 방식'에 대한 압박 질문에 완벽히 방어할 준비가 필요하며, 글로벌 우대사항 관련 보완 답변을 준비한다면 최종 합격 가능성이 매우 높습니다.`,
    roadmap: [
      {
        phase: "0-30일 (단기: 이력서 및 면접 방어력 강화)",
        tasks: [
          "결제 완료율 14.2% 향상 건에 대한 A/B 테스트 코호트 및 Baseline 데이터 정리",
          "카카오엔터프라이즈 경력의 활성 기업 수 Base number 표기 보완",
          "면접 방어 질문 2개 영역(A/B 테스트 인과관계, 서킷브레이커 설득) 모범 답안 작성"
        ]
      },
      {
        phase: "30-60일 (중기: 우대사항 및 역량 갭 보완)",
        tasks: [
          "글로벌 PG 결제 표준 규격(ISO 20022, PCI-DSS 등)에 대한 아티클 스터디 및 프로젝트 경험 연결",
          "대규모 피크 트래픽 환경에서의 리스크 대응 가이드라인 문서 포트폴리오 준비"
        ]
      },
      {
        phase: "60-90일 (장기: 타겟 기업 서류 제출 및 최종 면접)",
        tasks: [
          "네이버 타겟 직무 지원서 최종 검토 및 서류 제출",
          "현업 면접관 시뮬레이션을 통한 압박 면접 방어 테스트 3회 실시"
        ]
      }
    ]
  }
};
