import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>더비다 요양원</h3>
            <p>어르신들의 삶의 존엄과 가치를 함께 만들어 갑니다</p>
          </div>
          
          <div className="footer-section">
            <h4>지점 정보</h4>
            <div className="footer-locations">
              <div className="footer-location">
                <strong>인천점</strong>
                <p>032-891-0121</p>
                <p>인천광역시 미추홀구 제물량로4번길 34-33</p>
              </div>
              <div className="footer-location">
                <strong>안양점</strong>
                <p>031-464-5075</p>
                <p>경기도 안양시 만안구 전파로 19-1 더비다요양원</p>
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


