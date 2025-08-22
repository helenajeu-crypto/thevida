import React, { useState, useEffect } from 'react';
import { homepageAPI, HomepageImage } from '../utils/api';
import './Services.css';

const Services: React.FC = () => {
  const [programImages, setProgramImages] = useState<{ [key: string]: HomepageImage[] }>({
    rehabilitation: [],
    cognitive: [],
    birthday: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProgramImages = async () => {
      try {
        setIsLoading(true);
        
        // 각 프로그램별 이미지 로드
        const [rehabImages, cognitiveImages, birthdayImages] = await Promise.all([
          homepageAPI.getImagesByCategory('gallery').then(images => 
            images.filter(img => img.subcategory === 'rehabilitation')
          ),
          homepageAPI.getImagesByCategory('gallery').then(images => 
            images.filter(img => img.subcategory === 'cognitive')
          ),
          homepageAPI.getImagesByCategory('gallery').then(images => 
            images.filter(img => img.subcategory === 'birthday')
          )
        ]);

        setProgramImages({
          rehabilitation: rehabImages,
          cognitive: cognitiveImages,
          birthday: birthdayImages
        });
      } catch (error) {
        console.error('프로그램 이미지 로드 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProgramImages();
  }, []);

  const renderProgramCard = (type: 'rehabilitation' | 'cognitive' | 'birthday', title: string, description: string[]) => {
    const images = programImages[type];
    const hasImages = images.length > 0;

    return (
      <div className={`program-card ${hasImages ? '' : 'no-image'}`}>
        {hasImages && (
          <div className="program-images">
            {images.slice(0, 3).map((image, index) => (
              <img
                key={image.id}
                src={`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}${image.imageUrl}`}
                alt={image.title}
                className={`program-image ${index === 0 ? 'main' : 'secondary'}`}
              />
            ))}
          </div>
        )}
        <div className="program-content">
          <h3>{title}</h3>
          <ul className="program-list">
            {description.map((item, index) => (
              <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="services">
      {/* Programs & Events Only */}
      <section className="section programs-section">
        <div className="container">
          <h1 className="section-title">프로그램 및 행사</h1>
          <p className="section-subtitle">더비다의 일상 속 치유와 즐거움이 함께합니다.</p>

          {isLoading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>프로그램 정보를 불러오는 중...</p>
            </div>
          ) : (
            <div className="programs-grid">
              {renderProgramCard(
                'rehabilitation',
                '재활프로그램',
                [
                  '<strong>전동 상하지 운동</strong>: 관절 가동범위 향상, 혈액순환 촉진, 상지 중심 기능운동 유도',
                  '<strong>틸팅 테이블</strong>: 기립이 어려운 어르신의 혈압·관절·근육 자극, 안전한 기립 적응',
                  '<strong>보행재활 시스템</strong>: 바른 보행자세와 균형, 안전하게 걷는 동작 연습',
                  '<strong>워커 보행 훈련</strong>: 스스로 체중을 지지하며 이동하는 단계적 보행 연습',
                  '<strong>로봇 보행 훈련</strong>: 웨어러블 보조기를 활용한 자립 보행에 가까운 훈련'
                ]
              )}

              {renderProgramCard(
                'cognitive',
                '인지프로그램',
                [
                  '<strong>미술 활동</strong>: 그리기·만들기·색칠하기로 소근육·집중력 향상',
                  '<strong>음악 활동</strong>: 노래 부르기·리듬놀이로 정서 안정과 교류 촉진',
                  '<strong>게임·보드</strong>: 규칙 게임으로 판단력·기억력 증진',
                  '<strong>회상치료</strong>: 사진·이야기 나눔으로 자존감 회복'
                ]
              )}

              {renderProgramCard(
                'birthday',
                '생신잔치',
                [
                  '<strong>월례 행사</strong>: 매월 생신 어르신을 위한 축하 행사 진행',
                  '<strong>맞춤 구성</strong>: 케이크·과일·다과로 따뜻한 파티',
                  '<strong>참여와 기록</strong>: 함께 축하하고 기념 사진 촬영'
                ]
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Services;

