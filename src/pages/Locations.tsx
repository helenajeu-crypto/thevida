import React from 'react';
import { Link } from 'react-router-dom';
import KakaoMap from '../components/KakaoMap';
import './Locations.css';

const Locations: React.FC = () => {
  return (
    <div className="locations-page">
      {/* Hero Section */}
      <section className="locations-hero">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">지점 안내</h1>
            <p className="hero-subtitle">
              전국 2개 지점에서 전문적이고 따뜻한 케어 서비스를 제공합니다
            </p>
          </div>
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
            <KakaoMap
              name="더비다 요양원 지점"
              address="인천광역시 미추홀구 제물량로4번길 34-33"
            />
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
