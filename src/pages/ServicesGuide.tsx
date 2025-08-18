import React from 'react';
import './ServicesGuide.css';

const ServicesGuide: React.FC = () => {
  return (
    <div className="services-guide">
      {/* Hero Section */}
      <section className="services-hero">
        <div className="container">
          <h1 className="hero-title">더비다 서비스 안내</h1>
          <p className="hero-subtitle">
            어르신들의 건강과 행복을 위한 전문적인 서비스를 제공합니다
          </p>
        </div>
      </section>

      {/* Navigation Menu */}
      <section className="services-nav">
        <div className="container">
          <div className="nav-buttons">
            <a href="#rehabilitation" className="nav-button">
              🏃‍♂️ 더비다 재활프로그램
            </a>
            <a href="#cognitive" className="nav-button">
              🧠 더비다 인지프로그램
            </a>
            <a href="#birthday" className="nav-button">
              🎂 더비다 어르신 생신잔치
            </a>
          </div>
        </div>
      </section>

      {/* Rehabilitation Program Section */}
      <section id="rehabilitation" className="service-section rehabilitation-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">더비다 재활프로그램</h2>
          </div>
          
          <div className="service-content">
                         <div className="service-description">
               <div className="underline-accent"></div>
               <p>
                 더비다에서는 5단계 재활 기구를 활용하여 어르신들의 상태에 맞춘 맞춤형 재활 운동을 진행합니다. 
                 이는 단순히 "운동이 건강에 좋으니깐"이라는 이유 때문이 아닙니다. 어르신들이 스스로 성취감을 느끼고, 
                 한 걸음 한 걸음 걸어 나갈 수 있다는 희망을 몸소 경험하시도록 돕는 것이 더비다 재활의 가장 큰 목적입니다.
               </p>
              
              <p>
                평소 앉아 계시거나 누워만 계셨던 어르신들도 재활 기구의 지지와 선생님들의 세심한 도움을 통해 
                근육과 관절이 굳는 것을 예방할 수 있습니다. 실제로 더비다에서는 재활을 통해 하루하루 몸이 개선되는 것을 
                기쁘게 체감하신 어르신들이 많으며, 많은 분들이 스스로 보행하려는 의지와 열정을 품고 계십니다.
              </p>
              
              <p>
                이에 더비다는 어르신들이 재활을 통해 성취감과 행복을 누리실 수 있도록 최선을 다하고 있습니다.
              </p>
              
                             <div className="rehabilitation-gallery">
                <div className="underline-accent"></div>
                
                <div className="mixed-gallery">
                  <div className="gallery-item" data-ratio="4:3">
                    <img 
                      src="/images/services/rehabilitation/re1.png" 
                      alt="더비다 재활프로그램 - 전동 상하지 운동기구"
                      className="gallery-image"
                    />
                  </div>
                  
                  <div className="gallery-item" data-ratio="4:3">
                    <img 
                      src="/images/services/rehabilitation/re2.png" 
                      alt="더비다 재활프로그램 - 틸팅 테이블"
                      className="gallery-image"
                    />
                  </div>
                  
                  <div className="gallery-item" data-ratio="4:3">
                    <img 
                      src="/images/services/rehabilitation/re4.png" 
                      alt="더비다 재활프로그램 - 워커 보행 훈련"
                      className="gallery-image"
                    />
                  </div>
                  
                  <div className="gallery-item" data-ratio="3:4">
                    <img 
                      src="/images/services/rehabilitation/re14.jpg" 
                      alt="더비다 재활프로그램 - 종합 재활"
                      className="gallery-image"
                    />
                  </div>
                  
                  <div className="gallery-item" data-ratio="3:4">
                    <img 
                      src="/images/services/rehabilitation/re5.png" 
                      alt="더비다 재활프로그램 - 로봇 보행 훈련"
                      className="gallery-image"
                    />
                  </div>
                  
                  <div className="gallery-item" data-ratio="3:4">
                    <img 
                      src="/images/services/rehabilitation/re15.jpg" 
                      alt="더비다 재활프로그램 - 추가 재활 프로그램"
                      className="gallery-image"
                    />
                  </div>
                  
                  <div className="gallery-item" data-ratio="4:3">
                    <img 
                      src="/images/services/rehabilitation/re6.png" 
                      alt="더비다 재활프로그램 - 재활치료실"
                      className="gallery-image"
                    />
                  </div>
                  
                  <div className="gallery-item" data-ratio="3:4">
                    <img 
                      src="/images/services/rehabilitation/re7.png" 
                      alt="더비다 재활프로그램 - 물리치료"
                      className="gallery-image"
                    />
                  </div>
                  
                  <div className="gallery-item" data-ratio="3:4">
                    <img 
                      src="/images/services/rehabilitation/re8" 
                      alt="더비다 재활프로그램 - 운동치료"
                      className="gallery-image"
                    />
                  </div>
                  
                  <div className="gallery-item" data-ratio="4:3">
                    <img 
                      src="/images/services/rehabilitation/re9" 
                      alt="더비다 재활프로그램 - 재활 프로그램"
                      className="gallery-image"
                    />
                  </div>
                  
                  <div className="gallery-item" data-ratio="3:4">
                    <img 
                      src="/images/services/rehabilitation/re10" 
                      alt="더비다 재활프로그램 - 맞춤형 치료"
                      className="gallery-image"
                    />
                  </div>
                  
                  <div className="gallery-item" data-ratio="4:3">
                    <img 
                      src="/images/services/rehabilitation/re11.jpg" 
                      alt="더비다 재활프로그램 - 전문 치료"
                      className="gallery-image"
                    />
                  </div>
                  
                                    <div className="gallery-item" data-ratio="3:4">
                    <img 
                      src="/images/services/rehabilitation/re13.jpg" 
                      alt="더비다 재활프로그램 - 치료 환경"
                      className="gallery-image"
                    />
                  </div>
                  
                  
                  
                  <div className="gallery-item" data-ratio="3:4">
                    <img 
                      src="/images/services/rehabilitation/re12.jpg" 
                      alt="더비다 재활프로그램 - 재활 시설"
                      className="gallery-image"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            
          </div>
        </div>
      </section>

      {/* Cognitive Program Section */}
      <section id="cognitive" className="service-section cognitive-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">더비다 인지프로그램</h2>
          </div>
          
          <div className="service-content">
            <div className="service-description">
              <div className="underline-accent"></div>
              <p>
                더비다의 인지 프로그램은 매일 새로운 주제로 매월 계획되어, 어르신들께 다양한 즐거움을 선사합니다. 오감을 자극하는 활동 속에서 그림을 그리거나 색칠하며 손재주를 발휘하고, 직접 만든 소품을 착용해보며 성취감을 느낍니다.
              </p>
              <p>
                서로 모여 고스톱을 치거나 각자 좋아하는 놀이와 활동을 하며, 노래를 함께 부르는 시간도 있습니다. 이러한 다채로운 프로그램은 치매 예방과 함께 정서적 안정을 돕고, 소소한 행복과 작은 성취 하나하나가 어르신들의 마음을 밝게 합니다.
              </p>
              <p>
                더비다는 어르신들이 인지 활동 시간에 웃음과 행복으로 가득할 수 있도록 늘 정성을 다하고 있습니다.
              </p>
              
              <div className="cognitive-gallery">
                <div className="underline-accent"></div>
                
                <div className="mixed-gallery">
                  <div className="gallery-item" data-ratio="4:3">
                    <img 
                      src="/images/services/cognitive/cog1.jpg" 
                      alt="더비다 인지프로그램 - 인지 활동 1"
                      className="gallery-image"
                    />
                  </div>
                  
                  <div className="gallery-item" data-ratio="4:3">
                    <img 
                      src="/images/services/cognitive/cog2.jpg" 
                      alt="더비다 인지프로그램 - 인지 활동 2"
                      className="gallery-image"
                    />
                  </div>
                  
                  <div className="gallery-item" data-ratio="3:4">
                    <img 
                      src="/images/services/cognitive/cog3.jpg" 
                      alt="더비다 인지프로그램 - 인지 활동 3"
                      className="gallery-image"
                    />
                  </div>
                  
                  <div className="gallery-item" data-ratio="3:4">
                    <img 
                      src="/images/services/cognitive/cog4.jpg" 
                      alt="더비다 인지프로그램 - 인지 활동 4"
                      className="gallery-image"
                    />
                  </div>
                  
                  <div className="gallery-item" data-ratio="3:4">
                    <img 
                      src="/images/services/cognitive/cog5.jpg" 
                      alt="더비다 인지프로그램 - 인지 활동 5"
                      className="gallery-image"
                    />
                  </div>
                  
                  <div className="gallery-item" data-ratio="3:4">
                    <img 
                      src="/images/services/cognitive/cog17.jpg" 
                      alt="더비다 인지프로그램 - 인지 활동 17"
                      className="gallery-image"
                    />
                  </div>
                  
                  <div className="gallery-item" data-ratio="4:3">
                    <img 
                      src="/images/services/cognitive/cog6.jpg" 
                      alt="더비다 인지프로그램 - 인지 활동 6"
                      className="gallery-image"
                    />
                  </div>
                  
                  <div className="gallery-item" data-ratio="3:4">
                    <img 
                      src="/images/services/cognitive/cog7.jpg" 
                      alt="더비다 인지프로그램 - 인지 활동 7"
                      className="gallery-image"
                    />
                  </div>
                  
                  <div className="gallery-item" data-ratio="3:4">
                    <img 
                      src="/images/services/cognitive/cog8.jpg" 
                      alt="더비다 인지프로그램 - 인지 활동 8"
                      className="gallery-image"
                    />
                  </div>
                  
                  <div className="gallery-item" data-ratio="4:3">
                    <img 
                      src="/images/services/cognitive/cog9.jpg" 
                      alt="더비다 인지프로그램 - 인지 활동 9"
                      className="gallery-image"
                    />
                  </div>
                  
                  <div className="gallery-item" data-ratio="4:3">
                    <img 
                      src="/images/services/cognitive/cog10.jpg" 
                      alt="더비다 인지프로그램 - 인지 활동 10"
                      className="gallery-image"
                    />
                  </div>
                  
                  <div className="gallery-item" data-ratio="3:4">
                    <img 
                      src="/images/services/cognitive/cog11.jpg" 
                      alt="더비다 인지프로그램 - 인지 활동 11"
                      className="gallery-image"
                    />
                  </div>
                  
                  <div className="gallery-item" data-ratio="3:4">
                    <img 
                      src="/images/services/cognitive/cog12.jpg" 
                      alt="더비다 인지프로그램 - 인지 활동 12"
                      className="gallery-image"
                    />
                  </div>
                  
                  <div className="gallery-item" data-ratio="4:3">
                    <img 
                      src="/images/services/cognitive/cog13.jpg" 
                      alt="더비다 인지프로그램 - 인지 활동 13"
                      className="gallery-image"
                    />
                  </div>
                  
                  <div className="gallery-item" data-ratio="3:4">
                    <img 
                      src="/images/services/cognitive/cog14.jpg" 
                      alt="더비다 인지프로그램 - 인지 활동 14"
                      className="gallery-image"
                    />
                  </div>
                  
                  <div className="gallery-item" data-ratio="3:4">
                    <img 
                      src="/images/services/cognitive/cog15.jpg" 
                      alt="더비다 인지프로그램 - 인지 활동 15"
                      className="gallery-image"
                    />
                  </div>
                  
                  <div className="gallery-item" data-ratio="4:3">
                    <img 
                      src="/images/services/cognitive/cog16.jpg" 
                      alt="더비다 인지프로그램 - 인지 활동 16"
                      className="gallery-image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Birthday Party Section */}
      <section id="birthday" className="service-section birthday-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">🎂 더비다 어르신 생신잔치 🎉</h2>
          </div>
          
          <div className="service-content">
            <div className="service-description">
              <div className="underline-accent"></div>
              <p>
                더비다에서는 매월 어르신들의 생신을 축하하는 작은 파티를 엽니다.
                특별한 날을 더욱 특별하게 만들기 위해 정성을 담아 준비하며,
                어르신들이 소소한 행복과 기쁨 속에서 새로운 추억을 쌓으실 수 있도록 합니다.
              </p>
              <p>
                옹기종기 모여 축하 노래를 부르고, 따뜻한 마음을 나누는 자리에서는
                자연스레 웃음꽃이 피어나고, 그 미소가 하루를 환하게 밝혀줍니다.
              </p>
            </div>
            
            <div className="birthday-gallery-main">
              <div className="underline-accent"></div>
              
              <div className="mixed-gallery">
                 <div className="gallery-item" data-ratio="4:3">
                   <img 
                     src="/images/services/birthday/birth1.jpg" 
                     alt="더비다 생신잔치 - 생신잔치 1"
                     className="gallery-image"
                   />
                 </div>
                 
                 <div className="gallery-item" data-ratio="3:4">
                   <img 
                     src="/images/services/birthday/birth10.jpg" 
                     alt="더비다 생신잔치 - 생신잔치 10"
                     className="gallery-image"
                   />
                 </div>
                 
                 <div className="gallery-item" data-ratio="3:4">
                   <img 
                     src="/images/services/birthday/birth2.jpg" 
                     alt="더비다 생신잔치 - 생신잔치 2"
                     className="gallery-image"
                   />
                 </div>
                 
                 <div className="gallery-item" data-ratio="4:3">
                   <img 
                     src="/images/services/birthday/birth3.jpg" 
                     alt="더비다 생신잔치 - 생신잔치 3"
                     className="gallery-image"
                   />
                 </div>
                 
                 <div className="gallery-item" data-ratio="4:3">
                   <img 
                     src="/images/services/birthday/birth4.jpg" 
                     alt="더비다 생신잔치 - 생신잔치 4"
                     className="gallery-image"
                   />
                 </div>
                 
                 <div className="gallery-item" data-ratio="3:4">
                   <img 
                     src="/images/services/birthday/birth5.jpg" 
                     alt="더비다 생신잔치 - 생신잔치 5"
                     className="gallery-image"
                   />
                 </div>
                 
                 <div className="gallery-item" data-ratio="3:4">
                   <img 
                     src="/images/services/birthday/birth6.jpg" 
                     alt="더비다 생신잔치 - 생신잔치 6"
                     className="gallery-image"
                   />
                 </div>
                 
                 <div className="gallery-item" data-ratio="4:3">
                   <img 
                     src="/images/services/birthday/birth7.jpg" 
                     alt="더비다 생신잔치 - 생신잔치 7"
                     className="gallery-image"
                   />
                 </div>
                 
                 <div className="gallery-item" data-ratio="4:3">
                   <img 
                     src="/images/services/birthday/birth8.jpg" 
                     alt="더비다 생신잔치 - 생신잔치 8"
                     className="gallery-image"
                   />
                 </div>
                 
                 <div className="gallery-item" data-ratio="4:3">
                   <img 
                     src="/images/services/birthday/birth9.jpg" 
                     alt="더비다 생신잔치 - 생신잔치 9"
                     className="gallery-image"
                   />
                 </div>
               </div>
             </div>
             

           </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>더비다 서비스에 대해 더 자세히 알아보세요</h2>

            <div className="cta-buttons">
              <a href="/contact" className="btn btn-primary">
                📞 상담 문의하기
              </a>
              <a href="/#locations" className="btn btn-secondary">
                📍 지점 둘러보기
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesGuide;
