import React from 'react';
import { Link } from 'react-router-dom';
import HeroSlider from '../components/HeroSlider';
import AdminPanel from '../components/AdminPanel';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home">
      <AdminPanel />

      {/* 
        관리자 가이드 - Hero Section:
        - hero-title: 메인 문구 변경 (어르신들 삶의 존엄과 가치를 함께 만들어 갑니다)
        - hero-subtitle: 부제목 변경 (따뜻한 마음으로 어르신들을 모시는...)
        - highlight 클래스: 강조 텍스트 스타일 변경
      */}
      <HeroSlider />

      {/* 
        관리자 가이드 - Locations Section:
        - h3: 지점명 변경 (더비다 인천점, 더비다 안양점)
        - location-description: 지점 설명 변경
        - location-address: 주소 변경
        - tel: 전화번호 변경 (032-891-0121, 031-464-5075)
        - image-placeholder: 🏥 이모지를 다른 이모지로 변경하거나 실제 이미지로 교체
      */}
      <section className="section locations">
        <div className="container">
          <div className="locations-grid">
            <Link to="/locations/incheon" className="location-card">
              <div className="location-image">
                <div className="image-placeholder">🏥</div>
              </div>
              <div className="location-content">
                <h3>더비다 인천점</h3>
                <p className="location-description">
                  인천 미추홀구에 위치한 요양원입니다. 편안하고 따뜻한 환경에서 전문적인 케어 서비스를 제공합니다.
                </p>
                <div className="location-address">
                  📍 인천광역시 미추홀구 제물량로4번길 34-33
                </div>
                <div className="location-buttons" onClick={(e) => e.stopPropagation()}>
                  <a href="tel:032-891-0121" className="btn btn-primary">
                    📞 전화문의 바로가기
                  </a>
                  <Link to="/contact" className="btn btn-secondary">
                    📋 상담신청 바로가기
                  </Link>
                </div>
              </div>
            </Link>
            
            <Link to="/locations/anyang" className="location-card">
              <div className="location-image">
                <div className="image-placeholder">🏥</div>
              </div>
              <div className="location-content">
                <h3>더비다 안양점</h3>
                <p className="location-description">
                  조용하고 평화로운 환경에서 치매 전문 케어를 제공하는 요양원입니다.
                </p>
                <div className="location-address">
                  📍 경기도 안양시 만안구 전파로 19-1 더비다요양원
                </div>
                <div className="location-buttons" onClick={(e) => e.stopPropagation()}>
                  <a href="tel:031-464-5075" className="btn btn-primary">
                    📞 전화문의 바로가기
                  </a>
                  <Link to="/contact" className="btn btn-secondary">
                    📋 상담신청 바로가기
                  </Link>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Why The vida Section */}
      <section className="section why-thevida">
        <div className="container">
          <h2 className="section-title">왜 더비다 요양원인가요?</h2>
          <div className="why-content">
            <p className="why-description">
              24시간 케어와 따뜻한 마음으로 어르신들을 모시는 더비다 요양원입니다. 재활 운동은 개인별로 세심하게 진행합니다. 어르신의 건강 상태와 하루 일과를 공유해 보호자께서 안심하실 수 있습니다.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta">
        <div className="container">
          <div className="cta-content">
            <h2>어르신의 편안한 생활을 도와드립니다</h2>
            <p>지금 상담을 받아보시고, 따뜻한 더비다 요양원의 서비스를 경험해보세요.</p>
            <Link to="/contact" className="btn btn-primary">
              무료 상담 신청
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
