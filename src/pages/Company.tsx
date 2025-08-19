import React from 'react';
import './Company.css';

const Company: React.FC = () => {
  return (
    <div className="company">
      {/* Hero Section */}
      <section className="company-hero">
        <div className="container">
          <div className="company-hero-content">
            <h1 className="company-hero-title">주식회사 콤파스원</h1>
            <p className="company-hero-subtitle">
              어르신들의 삶의 질 향상을 위한 전문적인 케어 서비스를 제공하는 기업입니다
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="section company-overview">
        <div className="container">
          <div className="overview-grid">
            <div className="overview-content">
              <h2 className="section-title">회사 소개</h2>
              <p className="overview-description">
                주식회사 콤파스원은 어르신들의 건강하고 행복한 노후 생활을 위해 
                전문적인 요양 케어 서비스를 제공하는 기업입니다. 
                더비다 요양원을 통해 인천과 안양 지역에서 
                어르신들과 그 가족들에게 따뜻하고 전문적인 케어 서비스를 제공하고 있습니다.
              </p>
              
              <div className="company-values">
                <h3>기업 가치</h3>
                <ul>
                  <li>어르신의 존엄성과 자존감을 최우선으로 하는 서비스</li>
                  <li>전문적이고 과학적인 케어 방법론 적용</li>
                  <li>가족과 함께하는 포용적 케어 환경 조성</li>
                  <li>지속적인 서비스 품질 향상과 혁신</li>
                </ul>
              </div>
            </div>
            
            <div className="overview-stats">
              <div className="stat-item">
                <span className="stat-number">2</span>
                <span className="stat-label">요양원 운영</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100+</span>
                <span className="stat-label">수용 가능 인원</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">24/7</span>
                <span className="stat-label">전문 케어</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Areas */}
      <section className="section business-areas">
        <div className="container">
          <h2 className="section-title">사업 영역</h2>
          <div className="business-grid">
            <div className="business-card">
              <div className="business-icon">🏥</div>
              <h3>요양 케어 서비스</h3>
              <p>전문적인 요양 케어와 일상 생활 지원 서비스를 제공합니다.</p>
            </div>
            <div className="business-card">
              <div className="business-icon">💪</div>
              <h3>재활 치료</h3>
              <p>개인별 맞춤 재활 프로그램을 통한 신체 기능 회복을 지원합니다.</p>
            </div>
            <div className="business-card">
              <div className="business-icon">🧠</div>
              <h3>인지 치료</h3>
              <p>치매 예방과 인지 기능 향상을 위한 전문 프로그램을 운영합니다.</p>
            </div>
            <div className="business-card">
              <div className="business-icon">🎉</div>
              <h3>생활 프로그램</h3>
              <p>어르신들의 삶의 질 향상을 위한 다양한 활동 프로그램을 제공합니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="section company-contact">
        <div className="container">
          <h2 className="section-title">연락처</h2>
          <div className="contact-info">
            <div className="contact-item">
              <strong>회사명:</strong> 주식회사 콤파스원
            </div>
            <div className="contact-item">
              <strong>대표자:</strong> [대표자명]
            </div>
            <div className="contact-item">
              <strong>사업자등록번호:</strong> [사업자등록번호]
            </div>
            <div className="contact-item">
              <strong>주소:</strong> [회사 주소]
            </div>
            <div className="contact-item">
              <strong>전화:</strong> [회사 전화번호]
            </div>
            <div className="contact-item">
              <strong>이메일:</strong> [회사 이메일]
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Company;
