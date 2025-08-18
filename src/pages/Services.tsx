import React from 'react';
import './Services.css';

const Services: React.FC = () => {
  return (
    <div className="services">
      {/* Mini Hero */}
      <section className="mini-hero" aria-label="서비스 안내">
        <div className="container mini-hero-inner">
          <h1 className="mini-hero-title">더비다 서비스 안내</h1>
          <p className="mini-hero-subtitle">프로그램 및 행사</p>
        </div>
      </section>

      {/* Programs & Events Only */}
      <section className="section programs-section">
        <div className="container">
          <h1 className="section-title">프로그램 및 행사</h1>
          <p className="section-subtitle">더비다의 일상 속 치유와 즐거움이 함께합니다.</p>

          <div className="programs-grid no-image">
            {/* 재활프로그램 상세 */}
            <div className="program-card no-image">
              <div className="program-content">
                <h3>재활프로그램</h3>
                <ul className="program-list">
                  <li><strong>전동 상하지 운동</strong>: 관절 가동범위 향상, 혈액순환 촉진, 상지 중심 기능운동 유도</li>
                  <li><strong>틸팅 테이블</strong>: 기립이 어려운 어르신의 혈압·관절·근육 자극, 안전한 기립 적응</li>
                  <li><strong>보행재활 시스템</strong>: 바른 보행자세와 균형, 안전하게 걷는 동작 연습</li>
                  <li><strong>워커 보행 훈련</strong>: 스스로 체중을 지지하며 이동하는 단계적 보행 연습</li>
                  <li><strong>로봇 보행 훈련</strong>: 웨어러블 보조기를 활용한 자립 보행에 가까운 훈련</li>
                </ul>
              </div>
            </div>

            {/* 인지프로그램 상세 */}
            <div className="program-card no-image">
              <div className="program-content">
                <h3>인지프로그램</h3>
                <ul className="program-list">
                  <li><strong>미술 활동</strong>: 그리기·만들기·색칠하기로 소근육·집중력 향상</li>
                  <li><strong>음악 활동</strong>: 노래 부르기·리듬놀이로 정서 안정과 교류 촉진</li>
                  <li><strong>게임·보드</strong>: 규칙 게임으로 판단력·기억력 증진</li>
                  <li><strong>회상치료</strong>: 사진·이야기 나눔으로 자존감 회복</li>
                </ul>
              </div>
            </div>

            {/* 생신잔치 상세 */}
            <div className="program-card no-image">
              <div className="program-content">
                <h3>생신잔치</h3>
                <ul className="program-list">
                  <li><strong>월례 행사</strong>: 매월 생신 어르신을 위한 축하 행사 진행</li>
                  <li><strong>맞춤 구성</strong>: 케이크·과일·다과로 따뜻한 파티</li>
                  <li><strong>참여와 기록</strong>: 함께 축하하고 기념 사진 촬영</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;

