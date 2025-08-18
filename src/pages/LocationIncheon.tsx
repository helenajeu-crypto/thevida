import React from 'react';
import StaticKakaoMap from '../components/StaticKakaoMap';
import './LocationDetail.css';

const LocationIncheon: React.FC = () => {
  const locationData = {
    name: '더비다 인천점',
    address: '인천광역시 미추홀구 제물량로4번길 34-33',
    phone: '032-891-0121',
    features: ['24시간 전문 간호', '신축생활실', '영양관리', '재활치료시스템'],
    description: '인천 미추홀구에 위치한 요양원입니다. 편안하고 따뜻한 환경에서 전문적인 케어 서비스를 제공합니다.',
    facilities: [
      '공동 거실',
      '생활실 (1인실 / 2인실 / 3인실 / 4인실)',
      '프로그램실',
      '재활&물리치료실'
    ],
    capacity: '50명',
    staff: '전문 간호사 8명, 재활치료사 3명, 영양사 2명'
  };

  return (
    <div className="location-detail">
      {/* Hero Section */}
      <section className="location-hero">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">{locationData.name}</h1>
            <p className="hero-subtitle">{locationData.description}</p>
            <div className="hero-buttons">
              <a href="tel:032-891-0121" className="btn btn-primary">
                📞 전화문의 바로가기
              </a>
              <button className="btn btn-secondary">
                📋 상담신청 바로가기
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="section location-overview">
        <div className="container">
          <div className="overview-grid">
            <div className="overview-content">
              <h2 className="section-title">지점 소개</h2>
              <p className="overview-description">
                인천 미추홀구에 위치한 더비다 인천점은 어르신들의 편안한 생활을 위한 
                최적의 환경을 제공합니다. 24시간 전문적인 케어와 다양한 활동을 통해 
                어르신들이 행복한 시간을 보내실 수 있도록 최선을 다합니다.
              </p>
              <div className="mindset-section">
                <h3 className="mindset-title">더비다의 마음가짐</h3>
                <ul className="mindset-list">
                  <li>어르신을 가족처럼 모시는 마음</li>
                  <li>사랑하고 섬기며 봉사하는 마음</li>
                  <li>보호자와 함께하는 마음</li>
                </ul>
              </div>
            </div>
            <div className="overview-image">
              <div className="facility-sign-placeholder">
                <div className="placeholder-content">
                  <div className="placeholder-icon">🏥</div>
                  <h3>시설 간판</h3>
                  <p>더비다 인천점 외관</p>
                  <span className="coming-soon">사진 준비 중</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Facilities Gallery Section */}
      <section className="section facilities-gallery">
        <div className="container">
          <h2 className="section-title">시설 둘러보기</h2>
          <p className="section-subtitle">더비다 인천점의 다양한 시설을 소개합니다</p>
          
          <div className="facilities-gallery-vertical">
            {/* 메인 로비 */}
            <div className="facility-image-item">
              <div className="facility-image-placeholder">
                <div className="placeholder-content">
                  <div className="placeholder-icon">🏥</div>
                  <h3>메인 로비</h3>
                  <p>어르신들을 따뜻하게 맞이하는 메인 로비</p>
                  <span className="coming-soon">사진 준비 중</span>
                </div>
              </div>
              <div className="facility-description">
                <p>어르신들을 따뜻하게 맞이하는 메인 로비입니다. 편안하고 쾌적한 환경에서 안전한 생활을 보장합니다.</p>
              </div>
            </div>

            {/* 생활실 사진들 */}
            <div className="living-rooms-section">
              <div className="living-rooms-grid">
                {/* 2인실 */}
                <div className="living-room-item">
                  <div className="facility-image-placeholder">
                    <div className="placeholder-content">
                      <div className="placeholder-icon">🛏️</div>
                      <h3>2인실</h3>
                      <p>편안한 2인실</p>
                      <span className="coming-soon">사진 준비 중</span>
                    </div>
                  </div>
                </div>
                
                {/* 3인실 */}
                <div className="living-room-item">
                  <div className="facility-image-placeholder">
                    <div className="placeholder-content">
                      <div className="placeholder-icon">🛏️</div>
                      <h3>3인실</h3>
                      <p>넓은 3인실</p>
                      <span className="coming-soon">사진 준비 중</span>
                    </div>
                  </div>
                </div>
                
                {/* 4인실 */}
                <div className="living-room-item">
                  <div className="facility-image-placeholder">
                    <div className="placeholder-content">
                      <div className="placeholder-icon">🛏️</div>
                      <h3>4인실</h3>
                      <p>활기찬 4인실</p>
                      <span className="coming-soon">사진 준비 중</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 생활실 통합 설명 */}
              <div className="facility-description">
                <p>2인실, 3인실, 4인실로 구성된 편안한 생활 공간입니다. 각 실은 개별 화장실과 샤워시설을 갖추고 있어 프라이버시를 보장하며, 동료들과 함께하는 따뜻한 생활을 제공합니다.</p>
              </div>
            </div>

            {/* 공동거실 */}
            <div className="facility-image-item">
              <div className="facility-image-placeholder">
                <div className="placeholder-content">
                  <div className="placeholder-icon">🛋️</div>
                  <h3>공동거실</h3>
                  <p>어르신들이 함께하는 아늑한 공간</p>
                  <span className="coming-soon">사진 준비 중</span>
                </div>
              </div>
              <div className="facility-description">
                <p>공동거실은 어르신들이 생활실을 벗어나 서로 이야기를 나누고 함께 휴식을 즐길 수 있는 아늑하고 따뜻한 공간입니다. 편안한 분위기 속에서 웃음과 대화가 오가는 곳입니다.</p>
              </div>
            </div>

            {/* 면회실 */}
            <div className="facility-image-item">
              <div className="facility-image-placeholder">
                <div className="placeholder-content">
                  <div className="placeholder-icon">💬</div>
                  <h3>면회실</h3>
                  <p>가족들과 만나는 공간</p>
                  <span className="coming-soon">사진 준비 중</span>
                </div>
              </div>
              <div className="facility-description">
                <p>가족들과 편안하게 만날 수 있는 면회실입니다. 따뜻한 분위기에서 의미 있는 시간을 보낼 수 있습니다.</p>
              </div>
            </div>
            
            {/* 프로그램실 (준비 중) */}
            <div className="facility-image-item">
              <div className="facility-image-placeholder">
                <div className="placeholder-content">
                  <div className="placeholder-icon">🎨</div>
                  <h3>프로그램실</h3>
                  <p>다양한 활동과 프로그램을 진행하는 공간</p>
                  <span className="coming-soon">사진 준비 중</span>
                </div>
              </div>
              <div className="facility-description">
                <p>어르신들의 정신적, 신체적 건강을 위한 다양한 프로그램을 진행하는 공간입니다. 전문 강사와 함께하는 즐거운 활동 시간을 제공합니다.</p>
              </div>
            </div>
            
            {/* 외부 사진 (준비 중) */}
            <div className="facility-image-item">
              <div className="facility-image-placeholder">
                <div className="placeholder-content">
                  <div className="placeholder-icon">🌳</div>
                  <h3>외부 시설</h3>
                  <p>야외 정원과 산책로</p>
                  <span className="coming-soon">사진 준비 중</span>
                </div>
              </div>
              <div className="facility-description">
                <p>조용하고 평화로운 야외 정원과 산책로를 제공합니다. 계절별로 아름다운 자연을 감상하며 안전하게 산책할 수 있습니다.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Directions Section */}
      <section id="directions" className="section directions">
        <div className="container">
          <h2 className="section-title">오시는 길</h2>
          <div className="directions-content">
            <div className="address-info">
              <p className="address-text">📍 {locationData.address}</p>
            </div>
            <div className="map-container">
              <StaticKakaoMap
                centerX={485555}
                centerY={1081038}
                title="더비다 인천점"
                address="인천광역시 미추홀구 제물량로4번길 34-33"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta">
        <div className="container">
          <div className="cta-content">
            <h2>더비다 인천점에 문의하세요</h2>
            <p>전문 상담사가 어르신의 상황에 맞는 최적의 서비스를 추천해드립니다.</p>
            <div className="cta-buttons">
              <a href="tel:032-891-0121" className="btn btn-primary">
                📞 전화문의
              </a>
              <button className="btn btn-secondary">
                📋 상담신청
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocationIncheon;

