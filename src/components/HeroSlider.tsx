import React, { useState, useEffect } from 'react';
import './HeroSlider.css';

interface Slide {
  id: number;
  background: string;
  title: string;
  subtitle: string;
  type: 'gradient' | 'image';
}

const slides: Slide[] = [
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
  },
  {
    id: 3,
    background: `${process.env.PUBLIC_URL}/images/homehero/slide1.jpeg`,
    title: '전문적인 케어와',
    subtitle: '편안한 환경을 제공합니다',
    type: 'image'
  },
  {
    id: 4,
    background: `${process.env.PUBLIC_URL}/images/homehero/slide2.jpeg`,
    title: '24시간 케어로',
    subtitle: '안전하고 따뜻한 보호를 약속합니다',
    type: 'image'
  }
];

const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // 5초마다 자동 슬라이드

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

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
