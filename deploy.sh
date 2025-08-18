#!/bin/bash

# 더비다 요양원 홈페이지 배포 스크립트

set -e

echo "🚀 더비다 요양원 홈페이지 배포를 시작합니다..."

# 환경 변수 확인
if [ -z "$EMAIL_USER" ] || [ -z "$EMAIL_PASS" ]; then
    echo "❌ 환경 변수가 설정되지 않았습니다."
    echo "다음 환경 변수를 설정해주세요:"
    echo "export EMAIL_USER=your-email@gmail.com"
    echo "export EMAIL_PASS=your-app-password"
    exit 1
fi

# Docker 설치 확인
if ! command -v docker &> /dev/null; then
    echo "❌ Docker가 설치되지 않았습니다."
    echo "Docker를 먼저 설치해주세요: https://docs.docker.com/get-docker/"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose가 설치되지 않았습니다."
    echo "Docker Compose를 먼저 설치해주세요: https://docs.docker.com/compose/install/"
    exit 1
fi

# 기존 컨테이너 중지 및 제거
echo "🔄 기존 컨테이너를 정리합니다..."
docker-compose down --remove-orphans

# 이미지 빌드
echo "🔨 Docker 이미지를 빌드합니다..."
docker-compose build --no-cache

# 컨테이너 시작
echo "🚀 컨테이너를 시작합니다..."
docker-compose up -d

# 헬스 체크
echo "🏥 서비스 상태를 확인합니다..."
sleep 10

# 백엔드 헬스 체크
if curl -f http://localhost:5000/api/health > /dev/null 2>&1; then
    echo "✅ 백엔드 서비스가 정상적으로 실행 중입니다."
else
    echo "❌ 백엔드 서비스에 문제가 있습니다."
    docker-compose logs backend
    exit 1
fi

# 프론트엔드 헬스 체크
if curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ 프론트엔드 서비스가 정상적으로 실행 중입니다."
else
    echo "❌ 프론트엔드 서비스에 문제가 있습니다."
    docker-compose logs frontend
    exit 1
fi

# 데이터베이스 초기화
echo "🗄️ 데이터베이스를 초기화합니다..."
docker-compose exec backend npm run init-db

echo "📝 콘텐츠를 초기화합니다..."
docker-compose exec backend npm run init-content

echo "🎉 배포가 완료되었습니다!"
echo ""
echo "📱 접속 정보:"
echo "   프론트엔드: http://localhost:3000"
echo "   백엔드 API: http://localhost:5000"
echo "   관리자 패널: http://localhost:3000/admin"
echo ""
echo "🔑 관리자 계정:"
echo "   이메일: admin@thevida.com"
echo "   비밀번호: admin123"
echo ""
echo "📊 서비스 상태 확인:"
echo "   docker-compose ps"
echo ""
echo "📝 로그 확인:"
echo "   docker-compose logs -f"
echo ""
echo "🛑 서비스 중지:"
echo "   docker-compose down"
