# 더비다 요양원 홈페이지

더비다 요양원의 공식 홈페이지입니다. React + TypeScript로 구축된 프론트엔드와 Node.js + Express + MongoDB로 구축된 백엔드 API를 포함합니다.

## 🏗️ 프로젝트 구조

```
thevida/
├── src/                    # React 프론트엔드
│   ├── components/         # React 컴포넌트
│   ├── pages/             # 페이지 컴포넌트
│   ├── utils/             # 유틸리티 함수
│   └── config/            # 설정 파일
├── backend/               # Node.js 백엔드
│   ├── src/               # TypeScript 소스
│   │   ├── models/        # MongoDB 모델
│   │   ├── routes/        # API 라우트
│   │   ├── middleware/    # 미들웨어
│   │   └── utils/         # 유틸리티
│   └── scripts/           # 스크립트
├── public/                # 정적 파일
└── docker-compose.yml     # Docker 설정
```

## 🚀 주요 기능

### 프론트엔드
- **반응형 웹 디자인**: 모바일, 태블릿, 데스크톱 최적화
- **방문상담 예약 시스템**: 실시간 가용 시간 확인 및 예약
- **지점별 정보**: 인천점, 안양점 상세 정보
- **서비스 소개**: 재활치료, 인지치료, 생일파티 등
- **관리자 패널**: 예약 관리 및 통계
- **콘텐츠 관리**: 홈페이지 콘텐츠 및 이미지 관리

### 백엔드 API
- **예약 관리**: CRUD 작업 및 상태 관리
- **콘텐츠 관리**: 홈페이지 콘텐츠 CRUD 및 이미지 업로드
- **실시간 가용성**: 시간대별 예약 가능 여부 확인
- **이메일 알림**: 예약 접수 시 자동 이메일 발송
- **관리자 인증**: JWT 기반 보안 인증
- **통계 대시보드**: 예약 현황 및 분석

## 🛠️ 기술 스택

### 프론트엔드
- **React 18** + **TypeScript**
- **React Router** - 라우팅
- **Styled Components** - 스타일링
- **Fetch API** - HTTP 통신

### 백엔드
- **Node.js** + **Express** + **TypeScript**
- **MongoDB** + **Mongoose** - 데이터베이스
- **JWT** - 인증
- **Nodemailer** - 이메일 발송
- **Express Validator** - 입력 검증

### 인프라
- **Docker** + **Docker Compose**
- **Nginx** - 리버스 프록시
- **MongoDB** - 데이터베이스

## 📦 설치 및 실행

### 1. 저장소 클론
```bash
git clone <repository-url>
cd thevida
```

### 2. 환경 변수 설정

#### 백엔드 환경 변수
```bash
cd backend
cp env.example .env
```

`.env` 파일을 편집하여 다음 값들을 설정하세요:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/thevida
MONGODB_URI_PROD=mongodb+srv://username:password@cluster.mongodb.net/thevida

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# Email Configuration (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=더비다 요양원 <your-email@gmail.com>

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Admin Configuration
ADMIN_EMAIL=admin@thevida.com
ADMIN_PASSWORD=admin123
```

#### 프론트엔드 환경 변수
```bash
cp .env.example .env
```

`.env` 파일을 편집:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. 개발 환경 실행

#### 백엔드 실행
```bash
cd backend
npm install
npm run dev
```

#### 프론트엔드 실행
```bash
npm install
npm start
```

### 4. 데이터베이스 초기화
```bash
cd backend
npm run init-db
```

### 5. Docker로 전체 시스템 실행
```bash
# 환경 변수 설정
export EMAIL_USER=your-email@gmail.com
export EMAIL_PASS=your-app-password
export FRONTEND_URL=http://localhost:3000

# Docker Compose 실행
docker-compose up -d
```

## 🌐 배포

### 1. 클라우드 서비스 배포

#### Vercel (프론트엔드)
```bash
npm install -g vercel
vercel --prod
```

#### Railway (백엔드)
```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

#### MongoDB Atlas
1. [MongoDB Atlas](https://www.mongodb.com/atlas)에서 클러스터 생성
2. 데이터베이스 사용자 생성
3. IP 화이트리스트 설정
4. 연결 문자열을 환경 변수에 설정

### 2. VPS 배포

#### 서버 설정
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install docker.io docker-compose nginx

# Docker Compose 실행
docker-compose up -d
```

#### SSL 인증서 설정 (Let's Encrypt)
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## 📊 관리자 패널

### 접속 정보
- **URL**: `http://localhost:3000/admin`
- **이메일**: `admin@thevida.com`
- **비밀번호**: `admin123`

### 주요 기능
- 예약 목록 조회 및 관리
- 예약 상태 변경 (대기/확정/취소/완료)
- 통계 대시보드
- 지점별 예약 현황

## 🔧 API 문서

### 예약 API
- `POST /api/appointments` - 새 예약 생성
- `GET /api/appointments/availability/:branch/:date` - 가용 시간 조회
- `GET /api/appointments/:id` - 예약 상세 조회

### 관리자 API
- `POST /api/admin/login` - 관리자 로그인
- `GET /api/admin/appointments` - 예약 목록 조회
- `PATCH /api/admin/appointments/:id/status` - 예약 상태 변경
- `GET /api/admin/statistics` - 통계 조회

### 가용성 API
- `GET /api/availability/business-hours` - 영업시간 조회
- `GET /api/availability/closed-dates` - 휴무일 조회
- `GET /api/availability/slot-interval` - 시간 간격 조회

## 🚨 보안 고려사항

1. **환경 변수**: 민감한 정보는 환경 변수로 관리
2. **JWT 토큰**: 관리자 인증에 JWT 사용
3. **입력 검증**: 모든 사용자 입력에 대한 검증
4. **Rate Limiting**: API 요청 제한 설정
5. **CORS**: 적절한 CORS 설정
6. **HTTPS**: 프로덕션 환경에서 SSL/TLS 사용

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📞 문의

더비다 요양원
- **인천점**: 032-891-0121
- **안양점**: 031-464-5075
- **이메일**: info@thevida.com
