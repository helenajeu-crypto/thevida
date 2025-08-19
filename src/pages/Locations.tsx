import React from 'react';
import { Link } from 'react-router-dom';
import './Locations.css';

const Locations: React.FC = () => {
  const locations = [
    {
      id: 1,
      name: '인천점',
      address: '인천광역시 미추홀구 제물량로4번길 34-33',
      phone: '032-891-0121',
      features: ['24시간 전문 간호', '재활치료실', '해양 전망', '카페테리아'],
      description: '인천 미추홀구에 위치한 요양원입니다. 편안하고 따뜻한 환경에서 전문적인 케어 서비스를 제공합니다.',
      image: '/images/location-incheon.jpg'
    },
    {
      id: 2,
      name: '안양점',
      address: '경기도 안양시 만안구 전파로 19-1 더비다요양원',
      phone: '031-464-5075',
      features: ['전문 치매케어', '물리치료실', '독서실', '야외 산책로'],
      description: '안심할 수 있는 평화롭고 안전한 환경에서 어르신들을 정성껏 보살핍니다.',
      image: '/images/location-anyang.jpg'
    }
  ];

  return (
    <div className="locations">
      {/* Hero Section */}
      <section className="locations-hero">
        <div className="container">
          <h1 className="locations-hero-title">지점소개</h1>
          <p className="locations-hero-subtitle">
            전국 각지에 위치한 따뜻한 요양원 지점들을 소개합니다
          </p>
        </div>
      </section>

      {/* Locations Overview */}
      <section className="locations-overview">
        <div className="container">
          <div className="overview-content">
                         <h2 className="overview-title">전국 2개 지점 운영</h2>
             <p className="overview-description">
               인천 미추홀구와 경기 안양에 위치한 요양원 지점에서 
               전문적이고 따뜻한 케어 서비스를 제공합니다. 각 지점은 지역 특성에 맞는 
               특별한 프로그램과 시설을 갖추고 있어, 어르신들의 건강과 행복을 위한 
               최적의 환경을 제공합니다.
             </p>
             <div className="overview-stats">
               <div className="stat-item">
                 <span className="stat-number">2</span>
                 <span className="stat-label">지점</span>
               </div>
               <div className="stat-item">
                 <span className="stat-number">100+</span>
                 <span className="stat-label">수용 가능 인원</span>
               </div>
               <div className="stat-item">
                 <span className="stat-number">24/7</span>
                 <span className="stat-label">전문 간호</span>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Locations List */}
      <section className="locations-list">
        <div className="container">
          <h2 className="locations-list-title">지점 선택</h2>
          <div className="locations-buttons">
            <Link to="/locations/incheon" className="location-button">
              <div className="button-content">
                <h3 className="button-title">인천점</h3>
                <p className="button-description">인천 미추홀구에 위치한 요양원</p>
                <div className="button-details">
                  <span className="detail-text">📍 인천광역시 미추홀구 제물량로4번길 34-33</span>
                  <span className="detail-text">📞 032-891-0121</span>
                </div>
              </div>
            </Link>
            <Link to="/locations/anyang" className="location-button">
              <div className="button-content">
                <h3 className="button-title">안양점</h3>
                <p className="button-description">치매 전문 케어 요양원</p>
                <div className="button-details">
                  <span className="detail-text">📍 경기도 안양시 만안구 전파로 19-1 더비다요양원</span>
                  <span className="detail-text">📞 031-464-5075</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="container">
          <h2 className="map-title">지점 위치</h2>
          <div className="map-container">
            <div className="map-placeholder">
              <div className="map-icon">🗺️</div>
              <p className="map-text">전국 지점 위치 지도</p>
              <p className="map-description">
                각 지점의 정확한 위치와 교통편을 확인하실 수 있습니다
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="locations-cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">지점별 상담 문의</h2>
            <p className="cta-description">
              각 지점의 전문 상담사가 개인별 맞춤 상담을 제공합니다. 
              방문 상담도 가능하니 언제든 연락주세요.
            </p>
            <div className="cta-buttons">
              <button className="btn btn-primary">전화 상담</button>
              <button className="btn btn-secondary">방문 예약</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Locations;
