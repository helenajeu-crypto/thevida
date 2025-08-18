const mongoose = require('mongoose');
require('dotenv').config();

// Content 모델 정의
const ContentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['slider', 'service', 'facility', 'info', 'settings']
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  images: [{
    type: String
  }],
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Content = mongoose.model('Content', ContentSchema);

// 초기 콘텐츠 데이터
const initialContents = [
  {
    type: 'slider',
    title: '더비다 요양원 메인 슬라이더',
    description: '메인 페이지 슬라이더 이미지',
    content: {
      slides: [
        {
          title: '더비다 요양원에 오신 것을 환영합니다',
          subtitle: '어르신들의 편안한 노후를 위한 최고의 선택',
          image: 'slider-1.jpg',
          link: '/about'
        },
        {
          title: '전문적인 케어 서비스',
          subtitle: '24시간 전문 인력이 함께하는 안전한 환경',
          image: 'slider-2.jpg',
          link: '/services'
        },
        {
          title: '편안한 시설과 환경',
          subtitle: '어르신들이 편안하게 지낼 수 있는 최신 시설',
          image: 'slider-3.jpg',
          link: '/facilities'
        }
      ]
    },
    order: 1,
    isActive: true
  },
  {
    type: 'service',
    title: '24시간 전문 케어',
    description: '전문 인력이 24시간 함께하는 안전한 케어 서비스',
    content: {
      description: '더비다 요양원은 전문적인 의료진과 케어 인력이 24시간 상주하여 어르신들의 건강과 안전을 최우선으로 관리합니다.',
      features: [
        '전문 의료진 24시간 상주',
        '개인별 맞춤 케어 계획',
        '정기 건강 검진',
        '응급 상황 대응 시스템'
      ],
      price: '월 150만원부터'
    },
    order: 1,
    isActive: true
  },
  {
    type: 'service',
    title: '맞춤형 재활 프로그램',
    description: '개인별 상태에 맞는 전문 재활 서비스',
    content: {
      description: '어르신 개개인의 건강 상태와 필요에 맞춘 전문적인 재활 프로그램을 제공합니다.',
      features: [
        '개인별 재활 평가',
        '전문 물리치료사 상주',
        '다양한 재활 운동 프로그램',
        '정기적인 재활 효과 평가'
      ],
      price: '별도 문의'
    },
    order: 2,
    isActive: true
  },
  {
    type: 'facility',
    title: '편안한 생활 공간',
    description: '어르신들이 편안하게 지낼 수 있는 최신 시설',
    content: {
      description: '더비다 요양원은 어르신들이 편안하고 안전하게 지낼 수 있도록 최신 시설을 갖추고 있습니다.',
      facilities: [
        '개인실 및 2인실',
        '전용 화장실 및 샤워실',
        '공용 거실 및 휴게실',
        '정원 및 산책로',
        '의료실 및 상담실'
      ],
      images: ['facility-1.jpg', 'facility-2.jpg', 'facility-3.jpg']
    },
    order: 1,
    isActive: true
  },
  {
    type: 'info',
    title: '입소 안내',
    description: '더비다 요양원 입소 절차 및 안내',
    content: {
      process: [
        {
          step: 1,
          title: '상담 및 견학',
          description: '전화 또는 방문을 통한 상담 및 시설 견학'
        },
        {
          step: 2,
          title: '입소 신청',
          description: '입소 신청서 작성 및 필요 서류 제출'
        },
        {
          step: 3,
          title: '건강 상태 평가',
          description: '전문 의료진의 건강 상태 평가 및 케어 계획 수립'
        },
        {
          step: 4,
          title: '입소 확정',
          description: '입소 일정 확정 및 계약 체결'
        }
      ],
      requiredDocuments: [
        '입소 신청서',
        '건강진단서',
        '신분증 사본',
        '보호자 신분증 사본',
        '소득 증명서'
      ]
    },
    order: 1,
    isActive: true
  },
  {
    type: 'settings',
    title: '운영 시간 설정',
    description: '요양원 운영 시간 및 예약 가능 시간 설정',
    content: {
      businessHours: {
        weekdays: {
          start: '09:00',
          end: '18:00'
        },
        weekends: {
          start: '09:00',
          end: '17:00'
        }
      },
      appointmentSlots: {
        interval: 30,
        startTime: '09:00',
        endTime: '17:00'
      },
      closedDates: [
        '2024-01-01',
        '2024-02-09',
        '2024-02-10',
        '2024-02-11',
        '2024-05-05',
        '2024-06-06',
        '2024-08-15',
        '2024-10-03',
        '2024-10-09',
        '2024-12-25'
      ]
    },
    order: 1,
    isActive: true
  }
];

async function initContent() {
  try {
    // MongoDB 연결
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/thevida';
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB 연결 성공');

    // 기존 콘텐츠 삭제
    await Content.deleteMany({});
    console.log('🗑️ 기존 콘텐츠 삭제 완료');

    // 초기 콘텐츠 생성
    const createdContents = await Content.insertMany(initialContents);
    console.log(`✅ ${createdContents.length}개의 초기 콘텐츠 생성 완료`);

    // 생성된 콘텐츠 목록 출력
    console.log('\n📋 생성된 콘텐츠 목록:');
    createdContents.forEach(content => {
      console.log(`- ${content.type}: ${content.title}`);
    });

    console.log('\n🎉 콘텐츠 초기화 완료!');
  } catch (error) {
    console.error('❌ 콘텐츠 초기화 실패:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 MongoDB 연결 종료');
  }
}

// 스크립트 실행
if (require.main === module) {
  initContent();
}

module.exports = { initContent };
