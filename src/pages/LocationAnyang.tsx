import React from 'react';
import KakaoMap from '../components/KakaoMap';
import './LocationDetail.css';

const LocationAnyang: React.FC = () => {
  const locationData = {
    name: '더비다 안양점',
    address: '경기도 안양시 만안구 전파로 19-1 더비다요양원',
    phone: '031-464-5075',
    // 안양점의 정확한 좌표 (카카오맵에서 확인한 좌표)
    lat: 37.3825,
    lng: 126.9333,
    features: ['재활치료시스템', '물리치료실', '영양관리', '신축생활실'],
    description: '안심할 수 있는 평화롭고 안전한 환경에서 어르신들을 정성껏 보살핍니다.',
    facilities: [
      '공동 거실',
      '생활실 (1인실 / 2인실 / 3인실 / 4인실)',
      '프로그램실',
      '재활&물리치료실'
    ],
    capacity: '40명',
    staff: '전문 간호사 6명, 재활치료사 2명, 영양사 2명'
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
              <a href="tel:031-464-5075" className="btn btn-primary">
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
              <h2 className="section-title">더비다 요양원 인사말</h2>
              <p className="overview-description">
                안녕하세요, The Vida 원장 임경애입니다.
              </p>
              <p className="overview-description">
                오늘날 우리 사회는 초고령화와 핵가족화로 인해 가정 내에서 어르신들을 보살핌에 있어 많은 가족들이 어려움을 겪고 있습니다. 이에 The Vida는 치매, 뇌졸중 등 노인성 질환으로 힘들어하시는 어르신들과 그 가족분들을 위한 요양 시설로, 전문 인력이 각자의 특화 분야에서 헌신적으로 어르신들을 돌보고 있습니다.
              </p>
              <p className="overview-description">
                특히 저희 더비다 요양원은 24시간 케어와 따뜻한 마음으로 어르신들을 모시는 것을 가장 중요한 가치로 삼고 있습니다. 재활 운동은 어르신 개개인의 상태에 맞추어 세심하게 진행하며, 어르신의 건강 상태와 하루 일과를 보호자분들께 공유해드림으로써 언제나 안심하실 수 있도록 하고 있습니다.
              </p>
              <p className="overview-description">
                "사랑하고 섬기며 베풀며 살겠습니다"라는 원훈을 따라, 저희 The Vida는 어르신들께 늘 가족 같은 마음으로 최고의 서비스를 제공하며, 쾌적하고 안전한 환경에서 더 나은 삶을 누리실 수 있도록 최선을 다할 것을 약속드립니다.
              </p>
            </div>
            
            <div className="overview-image">
              <div className="facility-sign-placeholder">
                <div className="placeholder-content">
                  <div className="placeholder-icon">🏥</div>
                  <h3>시설 간판</h3>
                  <p>더비다 안양점 외관</p>
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
          <p className="section-subtitle">더비다 안양점의 내부 환경을 둘러보세요</p>
          
          <div className="facilities-gallery-vertical">
            {/* 메인 로비 */}
            <div className="facility-image-item">
              <img 
                src={process.env.PUBLIC_URL + '/images/anyang/facilitynew1.jpg'} 
                alt="메인 로비"
                className="facility-image"
                onError={(e) => {
                  const target = e.currentTarget;
                  const placeholder = target.nextElementSibling as HTMLElement;
                  if (target && placeholder) {
                    target.style.display = 'none';
                    placeholder.style.display = 'flex';
                  }
                }}
              />
              <div className="image-placeholder" style={{ display: 'none', height: '500px', alignItems: 'center', justifyContent: 'center', background: 'var(--gray-light)', fontSize: '2rem' }}>
                🏥 메인 로비
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
                  <img 
                    src={process.env.PUBLIC_URL + '/images/anyang/facilitynew2_1.jpg'} 
                    alt="2인실"
                    className="living-room-image"
                    onError={(e) => {
                      const target = e.currentTarget;
                      const placeholder = target.nextElementSibling as HTMLElement;
                      if (target && placeholder) {
                        target.style.display = 'none';
                        placeholder.style.display = 'flex';
                      }
                    }}
                  />
                  <div className="image-placeholder" style={{ display: 'none', height: '300px', alignItems: 'center', justifyContent: 'center', background: 'var(--gray-light)', fontSize: '1.5rem' }}>
                    🛏️ 2인실
                  </div>
                </div>
                
                {/* 3인실 */}
                <div className="living-room-item">
                  <img 
                    src={process.env.PUBLIC_URL + '/images/anyang/facilitynew2_2.jpg'} 
                    alt="3인실"
                    className="living-room-image"
                    onError={(e) => {
                      const target = e.currentTarget;
                      const placeholder = target.nextElementSibling as HTMLElement;
                      if (target && placeholder) {
                        target.style.display = 'none';
                        placeholder.style.display = 'flex';
                      }
                    }}
                  />
                  <div className="image-placeholder" style={{ display: 'none', height: '300px', alignItems: 'center', justifyContent: 'center', background: 'var(--gray-light)', fontSize: '1.5rem' }}>
                    🛏️ 3인실
                  </div>
                </div>
                
                {/* 4인실 */}
                <div className="living-room-item">
                  <img 
                    src={process.env.PUBLIC_URL + '/images/anyang/facilitynew2_3.jpg'} 
                    alt="4인실"
                    className="living-room-image"
                    onError={(e) => {
                      const target = e.currentTarget;
                      const placeholder = target.nextElementSibling as HTMLElement;
                      if (target && placeholder) {
                        target.style.display = 'none';
                        placeholder.style.display = 'flex';
                      }
                    }}
                  />
                  <div className="image-placeholder" style={{ display: 'none', height: '300px', alignItems: 'center', justifyContent: 'center', background: 'var(--gray-light)', fontSize: '1.5rem' }}>
                    🛏️ 4인실
                  </div>
                </div>
              </div>
              
              {/* 생활실 통합 설명 */}
              <div className="facility-description">
                <p>2인실, 3인실, 4인실로 구성된 편안한 생활 공간입니다. 내 집과 같은 아늑하고 쾌적한 생활실은, 어르신들이 서로 함께할 수 있는 따뜻한 생활을 제공합니다.</p>
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
              <img 
                src={process.env.PUBLIC_URL + '/images/anyang/facilitynew3.jpg'} 
                alt="면회실"
                className="facility-image"
                onError={(e) => {
                  const target = e.currentTarget;
                  const placeholder = target.nextElementSibling as HTMLElement;
                  if (target && placeholder) {
                    target.style.display = 'none';
                    placeholder.style.display = 'flex';
                  }
                }}
              />
              <div className="image-placeholder" style={{ display: 'none', height: '500px', alignItems: 'center', justifyContent: 'center', background: 'var(--gray-light)', fontSize: '2rem' }}>
                💬 면회실
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
              <KakaoMap
                title="더비다 안양점"
                address="경기도 안양시 만안구 전파로 19-1 더비다요양원"
                lat={locationData.lat}
                lng={locationData.lng}
                height={400}
                level={3}
                showDirections={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta">
        <div className="container">
          <div className="cta-content">
            <h2>더비다 안양점에 문의하세요</h2>
            <p>전문 상담사가 어르신의 상황에 맞는 최적의 서비스를 추천해드립니다.</p>
            <div className="cta-buttons">
              <a href="tel:031-464-5075" className="btn btn-primary">
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

export default LocationAnyang;


