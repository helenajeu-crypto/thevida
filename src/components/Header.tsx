import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const toggleDropdown = (dropdownName: string) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  // 특정 위치로 이동하는 함수
  const scrollToSection = (path: string, sectionId?: string) => {
    closeMobileMenu();
    closeDropdown();
    
    // 현재 페이지와 같은지 확인
    const isSamePage = location.pathname === path;
    
    if (isSamePage) {
      // 같은 페이지에 있을 때: 상단으로 스크롤
      if (sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // 상단으로 스크롤
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      // 다른 페이지에 있을 때: 페이지 이동 후 스크롤
      navigate(path);
      
      if (sectionId) {
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
      }
    }
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo" onClick={closeMobileMenu}>
            <span className="logo-text">The vida</span>
            <span className="logo-subtitle">더비다 스테이&케어</span>
          </Link>

          <nav className={`nav ${isMobileMenuOpen ? 'nav-open' : ''}`}>
            {/* 더비다 인천점 드롭다운 */}
            <div className="nav-dropdown">
              <button
                className={`nav-link dropdown-toggle ${location.pathname.startsWith('/locations/incheon') ? 'active' : ''}`}
                onClick={() => {
                  scrollToSection('/locations/incheon');
                  toggleDropdown('incheon');
                }}
                onMouseEnter={() => setActiveDropdown('incheon')}
              >
                더비다 인천점
              </button>
              <div className={`dropdown-menu ${activeDropdown === 'incheon' ? 'show' : ''}`} onMouseLeave={closeDropdown}>
                <button className="dropdown-item" onClick={() => scrollToSection('/locations/incheon')}>
                  지점 소개
                </button>
                <button className="dropdown-item" onClick={() => scrollToSection('/locations/incheon', 'directions')}>
                  오시는 길
                </button>
                <button className="dropdown-item" onClick={() => scrollToSection('/rehabilitation')}>
                  재활프로그램
                </button>
                <button className="dropdown-item" onClick={() => scrollToSection('/cognitive')}>
                  인지프로그램
                </button>
                <button className="dropdown-item" onClick={() => scrollToSection('/birthday')}>
                  어르신생신잔치
                </button>
              </div>
            </div>

            {/* 더비다 안양점 드롭다운 */}
            <div className="nav-dropdown">
              <button
                className={`nav-link dropdown-toggle ${location.pathname.startsWith('/locations/anyang') ? 'active' : ''}`}
                onClick={() => {
                  scrollToSection('/locations/anyang');
                  toggleDropdown('anyang');
                }}
                onMouseEnter={() => setActiveDropdown('anyang')}
              >
                더비다 안양점
              </button>
              <div className={`dropdown-menu ${activeDropdown === 'anyang' ? 'show' : ''}`} onMouseLeave={closeDropdown}>
                <button className="dropdown-item" onClick={() => scrollToSection('/locations/anyang')}>
                  지점 소개
                </button>
                <button className="dropdown-item" onClick={() => scrollToSection('/locations/anyang', 'directions')}>
                  오시는 길
                </button>
                <button className="dropdown-item" onClick={() => scrollToSection('/rehabilitation')}>
                  재활프로그램
                </button>
                <button className="dropdown-item" onClick={() => scrollToSection('/cognitive')}>
                  인지프로그램
                </button>
                <button className="dropdown-item" onClick={() => scrollToSection('/birthday')}>
                  어르신생신잔치
                </button>
              </div>
            </div>

            {/* 서비스 안내 드롭다운 */}
            <div className="nav-dropdown">
              <button
                className={`nav-link dropdown-toggle ${location.pathname === '/services-guide' ? 'active' : ''}`}
                onClick={() => {
                  scrollToSection('/services-guide');
                  toggleDropdown('services');
                }}
                onMouseEnter={() => setActiveDropdown('services')}
              >
                서비스 안내
              </button>
              <div className={`dropdown-menu ${activeDropdown === 'services' ? 'show' : ''}`} onMouseLeave={closeDropdown}>
                <button className="dropdown-item" onClick={() => scrollToSection('/services-guide', 'rehabilitation')}>
                  재활프로그램
                </button>
                <button className="dropdown-item" onClick={() => scrollToSection('/services-guide', 'cognitive')}>
                  인지프로그램
                </button>
                <button className="dropdown-item" onClick={() => scrollToSection('/services-guide', 'birthday')}>
                  어르신생신잔치
                </button>
              </div>
            </div>

            <Link
              to="/contact"
              className={`nav-link consultation-btn ${location.pathname === '/contact' ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              상담신청
            </Link>
          </nav>

          <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
            <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
