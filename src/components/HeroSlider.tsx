import React, { useState, useEffect } from 'react';
import { homepageAPI, HomepageImage } from '../utils/api';
import './HeroSlider.css';

interface Slide {
  id: number;
  background: string;
  title: string;
  subtitle: string;
  type: 'gradient' | 'image';
}

// 기본 슬라이드 (API에서 이미지를 가져올 수 없을 때 사용)
const defaultSlides: Slide[] = [
  {
    id: 1,
    background: 'linear-gradient(135deg, var(--brand-color) 0%, var(--brand-color-dark) 100%)',
    title: '어르신들 삶의 존엄과 가치를',
    subtitle: '함께 만들어 갑니다',
    type: 'gradient'
  },
  {
    id: 2,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    title: '따뜻한 마음으로 모시는',
    subtitle: '더비다 요양원',
    type: 'gradient'
  }
];

const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<Slide[]>(defaultSlides);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadHeroImages = async () => {
      try {
        setIsLoading(true);
        const heroImages = await homepageAPI.getImagesByCategory('hero');
        
        if (heroImages.length > 0) {
          // API에서 가져온 이미지로 슬라이드 생성
          const apiSlides: Slide[] = heroImages.map((img, index) => ({
            id: index + 1,
            background: `http://localhost:3001${img.imageUrl}`,
            title: img.title || '더비다 요양원',
            subtitle: img.description || '전문적인 케어와 편안한 환경을 제공합니다',
            type: 'image' as const
          }));
          
          setSlides(apiSlides);
        } else {
          // API에서 이미지가 없으면 기본 슬라이드 사용
          setSlides(defaultSlides);
        }
      } catch (error) {
        console.error('Hero 이미지 로드 실패:', error);
        setSlides(defaultSlides);
      } finally {
        setIsLoading(false);
      }
    };

    loadHeroImages();
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // 5초마다 자동 슬라이드

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (isLoading) {
    return (
      <section className="hero-slider">
        <div className="slider-container">
          <div className="slide active">
            <div className="slide-content">
              <h1 className="slide-title">
                로딩 중...<br />
                <span className="highlight">더비다 요양원</span>
              </h1>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="hero-slider">
      <div className="slider-container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide ${index === currentSlide ? 'active' : ''} ${slide.type === 'image' ? 'image-slide' : ''}`}
            style={{
              background: slide.type === 'image' ? `url(${slide.background})` : slide.background,
              transform: slide.type === 'image' 
                ? `translateX(${(index - currentSlide) * 100}%)` 
                : `translateX(${(index - currentSlide) * 100}%)`,
              '--slide-offset': `${(index - currentSlide) * 100}%`
            } as React.CSSProperties}
          >
            <div className="slide-content">
              <h1 className="slide-title">
                {slide.title}<br />
                <span className="highlight">{slide.subtitle}</span>
              </h1>
            </div>
          </div>
        ))}
      </div>

      {/* 네비게이션 버튼 */}
      <button className="slider-nav prev" onClick={goToPrevSlide}>
        ‹
      </button>
      <button className="slider-nav next" onClick={goToNextSlide}>
        ›
      </button>

      {/* 인디케이터 */}
      <div className="slider-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
