import React from 'react';
import './Services.css';

const BirthdayParty: React.FC = () => {
  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">어르신생신잔치</h1>
            <p className="hero-subtitle">
              특별한 생신을 더욱 특별하게 만들어드리는 따뜻한 생신잔치 프로그램입니다
            </p>
          </div>
        </div>
      </section>

      

       {/* Program Records */}
       <section className="section program-records">
         <div className="container">
           <h2 className="section-title">생신잔치 기록</h2>
           <p className="section-subtitle">특별한 생신잔치의 소중한 순간들을 기록합니다</p>
           
           <div className="records-grid">
             {/* 2024년 8월 15일 */}
             <div className="record-item">
               <div className="record-date">
                 <span className="date-day">15</span>
                 <span className="date-month">8월</span>
                 <span className="date-year">2024</span>
               </div>
               <div className="record-content">
                 <h3>김○○ 어르신 생신잔치</h3>
                 <div className="record-images">
                   <div className="record-image-placeholder">
                     <span>📸</span>
                     <p>생신잔치 사진</p>
                   </div>
                 </div>
                 <p className="record-description">
                   오늘은 김○○ 어르신의 생신을 맞아 따뜻한 생신잔치를 준비했습니다. 
                   가족들과 함께하는 소중한 시간을 보내시며, 
                   모든 직원과 입소자들이 함께 축하해드렸습니다.
                 </p>
               </div>
             </div>

             {/* 2024년 8월 10일 */}
             <div className="record-item">
               <div className="record-date">
                 <span className="date-day">10</span>
                 <span className="date-month">8월</span>
                 <span className="date-year">2024</span>
               </div>
               <div className="record-content">
                 <h3>이○○ 어르신 생신잔치</h3>
                 <div className="record-images">
                   <div className="record-image-placeholder">
                     <span>📸</span>
                     <p>생신잔치 사진</p>
                   </div>
                 </div>
                 <p className="record-description">
                   이○○ 어르신의 생신잔치를 진행했습니다. 
                   어르신이 좋아하는 노래와 함께하는 축하 공연과 
                   특별한 생신 메뉴로 의미 있는 시간을 만들어드렸습니다.
                 </p>
               </div>
             </div>

             {/* 2024년 8월 5일 */}
             <div className="record-item">
               <div className="record-date">
                 <span className="date-day">05</span>
                 <span className="date-month">8월</span>
                 <span className="date-year">2024</span>
               </div>
               <div className="record-content">
                 <h3>박○○ 어르신 생신잔치</h3>
                 <div className="record-images">
                   <div className="record-image-placeholder">
                     <span>📸</span>
                     <p>생신잔치 사진</p>
                   </div>
                 </div>
                 <p className="record-description">
                   박○○ 어르신의 생신잔치를 진행했습니다. 
                   가족들과 함께하는 따뜻한 축하 시간을 보내시며, 
                   소중한 추억을 만들어드렸습니다.
                 </p>
               </div>
             </div>
           </div>
         </div>
       </section>

      {/* CTA Section */}
      <section className="section cta">
        <div className="container">
          <div className="cta-content">
            <h2>어르신생신잔치에 대해 더 자세히 알아보세요</h2>
            <p>전문 상담사가 어르신의 생신잔치를 특별하게 준비해드립니다.</p>
            <div className="cta-buttons">
              <a href="tel:032-891-0121" className="btn btn-primary">
                📞 전화문의
              </a>
              <a href="/contact" className="btn btn-secondary">
                📋 상담신청
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BirthdayParty;
