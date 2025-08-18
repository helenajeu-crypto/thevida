import React from 'react';
import './About.css';

const About: React.FC = () => {
  return (
    <div className="about">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <h1 className="about-hero-title">따뜻한 요양원 소개</h1>
            <p className="about-hero-subtitle">
              2010년 설립 이후, 어르신들의 편안한 생활을 위해 노력해온 따뜻한 요양원입니다.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section mission">
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <h2 className="section-title">우리의 미션</h2>
              <p className="mission-description">
                따뜻한 요양원은 어르신들이 마지막까지 존엄하고 편안한 삶을 살 수 있도록 
                최선을 다하는 곳입니다. 전문적인 의료 케어와 함께 가족 같은 따뜻함을 
                제공하여 어르신들과 가족 모두가 만족할 수 있는 환경을 만들어갑니다.
              </p>
              <div className="mission-values">
                <div className="value-item">
                  <h3>❤️ 존엄성</h3>
                  <p>어르신의 인격과 자존감을 최우선으로 생각합니다.</p>
                </div>
                <div className="value-item">
                  <h3>🏥 전문성</h3>
                  <p>경험 많은 의료진이 최고의 케어를 제공합니다.</p>
                </div>
                <div className="value-item">
                  <h3>🏠 편안함</h3>
                  <p>마치 집에 있는 것처럼 편안한 환경을 제공합니다.</p>
                </div>
              </div>
            </div>
            <div className="mission-image">
              <div className="image-placeholder">🏥</div>
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="section history">
        <div className="container">
          <h2 className="section-title">연혁</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-year">2010</div>
              <div className="timeline-content">
                <h3>따뜻한 요양원 설립</h3>
                <p>어르신들의 편안한 생활을 위해 요양원을 설립했습니다.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2015</div>
              <div className="timeline-content">
                <h3>의료진 확충</h3>
                <p>전문 의료진을 확충하여 더욱 전문적인 케어를 제공하기 시작했습니다.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2018</div>
              <div className="timeline-content">
                <h3>시설 확장</h3>
                <p>더 많은 어르신들을 모실 수 있도록 시설을 확장했습니다.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2024</div>
              <div className="timeline-content">
                <h3>최신 의료장비 도입</h3>
                <p>최신 의료장비를 도입하여 더욱 정확한 진단과 치료가 가능해졌습니다.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section team">
        <div className="container">
          <h2 className="section-title">전문 의료진</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-image">
                <div className="member-placeholder">👨‍⚕️</div>
              </div>
              <div className="member-info">
                <h3>김의사 원장</h3>
                <p className="member-title">내과 전문의</p>
                <p className="member-description">
                  20년간의 임상경험을 바탕으로 어르신들의 건강을 지켜드립니다.
                </p>
              </div>
            </div>
            <div className="team-member">
              <div className="member-image">
                <div className="member-placeholder">👩‍⚕️</div>
              </div>
              <div className="member-info">
                <h3>이간호사</h3>
                <p className="member-title">수간호사</p>
                <p className="member-description">
                  15년간의 간호 경험으로 어르신들을 정성껏 케어해드립니다.
                </p>
              </div>
            </div>
            <div className="team-member">
              <div className="member-image">
                <div className="member-placeholder">👨‍⚕️</div>
              </div>
              <div className="member-info">
                <h3>박치료사</h3>
                <p className="member-title">재활치료사</p>
                <p className="member-description">
                  전문적인 재활치료로 어르신들의 일상생활 능력 향상을 도와드립니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="section facilities">
        <div className="container">
          <h2 className="section-title">시설 안내</h2>
          <div className="facilities-grid">
            <div className="facility-card">
              <div className="facility-icon">🛏️</div>
              <h3>편안한 객실</h3>
              <p>개인별 맞춤형 객실로 편안한 휴식을 취하실 수 있습니다.</p>
            </div>
            <div className="facility-card">
              <div className="facility-icon">🏥</div>
              <h3>진료실</h3>
              <p>최신 의료장비를 갖춘 진료실에서 정확한 진단을 받으실 수 있습니다.</p>
            </div>
            <div className="facility-card">
              <div className="facility-icon">🏃‍♂️</div>
              <h3>재활실</h3>
              <p>전문 재활장비를 갖춘 재활실에서 체계적인 치료를 받으실 수 있습니다.</p>
            </div>
            <div className="facility-card">
              <div className="facility-icon">🍽️</div>
              <h3>식당</h3>
              <p>영양사가 설계한 맞춤형 식단으로 건강한 식사를 즐기실 수 있습니다.</p>
            </div>
            <div className="facility-card">
              <div className="facility-icon">🌳</div>
              <h3>정원</h3>
              <p>아름다운 정원에서 자연과 함께하는 시간을 보내실 수 있습니다.</p>
            </div>
            <div className="facility-card">
              <div className="facility-icon">🎨</div>
              <h3>여가실</h3>
              <p>다양한 여가활동을 즐기실 수 있는 공간을 제공합니다.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;


