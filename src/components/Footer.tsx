import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* 좌측: 회사 소개 */}
          <div className="footer-left">
            <div className="footer-section">
              <h3>회사 소개</h3>
              <Link to="/company" className="company-link">
                • 주식회사 콤파스원
              </Link>
            </div>
          </div>
          
          {/* 우측: 요양원 정보 */}
          <div className="footer-right">
            <div className="footer-section">
              <h3>더비다 요양원</h3>
              <p>어르신들의 삶의 존엄과 가치를 함께 만들어 갑니다</p>
            </div>
            
                          <div className="footer-locations">
                <div className="footer-location">
                  <h4>• 인천점</h4>
                  <p className="phone">032-891-0121</p>
                  <p className="address">인천광역시 미추홀구 제물량로4번길 34-33</p>
                </div>
                <div className="footer-location">
                  <h4>• 안양점</h4>
                  <p className="phone">031-464-5075</p>
                  <p className="address">경기도 안양시 만안구 전파로 19-1 더비다요양원</p>
                </div>
              </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 더비다 요양원. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


