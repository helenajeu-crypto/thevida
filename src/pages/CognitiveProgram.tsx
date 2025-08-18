import React, { useState } from 'react';
import './Services.css';

const CognitiveProgram: React.FC = () => {
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const records = [
    {
      id: 1,
      date: '2024-08-15',
      day: '15',
      month: '8월',
      year: '2024',
      title: '인지훈련 - 기억력 향상 게임',
      description: '오늘은 기억력 향상을 위한 다양한 게임을 진행했습니다. 카드 매칭 게임과 숫자 기억 게임을 통해 어르신들의 기억력과 집중력을 향상시켰습니다.',
      detailedDescription: `오늘은 기억력 향상을 위한 다양한 게임을 진행했습니다.

카드 매칭 게임과 숫자 기억 게임을 통해 어르신들의 기억력과 집중력을 향상시켰습니다.

진행한 게임들:
• 카드 매칭 게임 (기억력 향상)
• 숫자 기억 게임 (순서 기억력)
• 색깔 분류 게임 (인지 능력)
• 단어 연상 게임 (언어 능력)

참여 어르신: 12명
진행 시간: 오전 11:00 ~ 12:00
담당 강사: 최○○ 강사

어르신들이 게임에 매우 적극적으로 참여하시며, 기억력 향상에 도움이 되는 것을 확인할 수 있었습니다.`,
      images: ['/images/cognitive/memory-game-1.jpg', '/images/cognitive/memory-game-2.jpg'],
      participants: 12,
      duration: '60분',
      instructor: '최○○ 강사'
    },
    {
      id: 2,
      date: '2024-08-12',
      day: '12',
      month: '8월',
      year: '2024',
      title: '미술치료 - 자유로운 창작 활동',
      description: '자유로운 창작 활동을 통해 어르신들의 감정 표현과 소근육 운동을 도모했습니다. 각자만의 개성 있는 작품을 만들어내는 모습이 인상적이었습니다.',
      detailedDescription: `자유로운 창작 활동을 통해 어르신들의 감정 표현과 소근육 운동을 도모했습니다.

각자만의 개성 있는 작품을 만들어내는 모습이 인상적이었습니다.

미술 활동 내용:
• 자유 그림 그리기 (감정 표현)
• 색종이 접기 (소근육 운동)
• 물감 놀이 (색채 감각)
• 꼴라주 만들기 (창의력)

참여 어르신: 8명
진행 시간: 오후 2:00 ~ 3:30
담당 강사: 정○○ 강사

어르신들이 자신만의 독특한 작품을 만들어내시며, 창작의 즐거움을 느끼실 수 있었습니다.`,
      images: ['/images/cognitive/art-therapy-1.jpg', '/images/cognitive/art-therapy-2.jpg'],
      participants: 8,
      duration: '90분',
      instructor: '정○○ 강사'
    },
    {
      id: 3,
      date: '2024-08-10',
      day: '10',
      month: '8월',
      year: '2024',
      title: '음악치료 - 노래 부르기',
      description: '어르신들이 좋아하는 노래들을 함께 불러보는 시간을 가졌습니다. 음악을 통한 감정 교류와 기억 회상으로 즐거운 시간을 보냈습니다.',
      detailedDescription: `어르신들이 좋아하는 노래들을 함께 불러보는 시간을 가졌습니다.

음악을 통한 감정 교류와 기억 회상으로 즐거운 시간을 보냈습니다.

음악 활동 내용:
• 추억의 노래 부르기
• 리듬 악기 연주
• 음악 맞추기 게임
• 감정 표현 노래

참여 어르신: 15명
진행 시간: 오후 3:00 ~ 4:00
담당 강사: 김○○ 강사

어르신들이 젊은 시절의 추억을 회상하며 즐거워하시는 모습이 매우 인상적이었습니다.`,
      images: ['/images/cognitive/music-therapy-1.jpg', '/images/cognitive/music-therapy-2.jpg'],
      participants: 15,
      duration: '60분',
      instructor: '김○○ 강사'
    }
  ];

  const openModal = (record: any) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
  };

  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">인지프로그램</h1>
            <p className="hero-subtitle">
              치매 예방과 인지 기능 향상을 위한 전문적인 프로그램을 제공합니다
            </p>
          </div>
        </div>
      </section>

      

       {/* Program Records */}
       <section className="section program-records">
         <div className="container">
           <h2 className="section-title">프로그램 활동 기록</h2>
           <p className="section-subtitle">매일 진행되는 인지프로그램의 생생한 모습을 기록합니다</p>
           
           <div className="records-grid">
             {records.map((record) => (
               <div key={record.id} className="record-item" onClick={() => openModal(record)}>
                 <div className="record-date">
                   <span className="date-day">{record.day}</span>
                   <span className="date-month">{record.month}</span>
                   <span className="date-year">{record.year}</span>
                 </div>
                 <div className="record-content">
                   <h3>{record.title}</h3>
                   <div className="record-images">
                     <div className="record-image-placeholder">
                       <span>📸</span>
                       <p>프로그램 사진</p>
                     </div>
                   </div>
                   <p className="record-description">
                     {record.description}
                   </p>
                   <div className="record-meta">
                     <span className="meta-item">👥 {record.participants}명 참여</span>
                     <span className="meta-item">⏱️ {record.duration}</span>
                   </div>
                 </div>
               </div>
             ))}
           </div>
         </div>
       </section>

      {/* CTA Section */}
      <section className="section cta">
        <div className="container">
          <div className="cta-content">
            <h2>인지프로그램에 대해 더 자세히 알아보세요</h2>
            <p>전문 상담사가 어르신의 상황에 맞는 최적의 인지 프로그램을 추천해드립니다.</p>
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

      {/* Modal */}
      {isModalOpen && selectedRecord && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            
            <div className="modal-header">
              <div className="modal-date">
                <span className="modal-date-day">{selectedRecord.day}</span>
                <span className="modal-date-month">{selectedRecord.month}</span>
                <span className="modal-date-year">{selectedRecord.year}</span>
              </div>
              <h2 className="modal-title">{selectedRecord.title}</h2>
            </div>

            <div className="modal-body">
              <div className="modal-images">
                {selectedRecord.images.map((image: string, index: number) => (
                  <div key={index} className="modal-image-placeholder">
                    <span>📸</span>
                    <p>프로그램 사진 {index + 1}</p>
                  </div>
                ))}
              </div>

              <div className="modal-info">
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">👥 참여 어르신</span>
                    <span className="info-value">{selectedRecord.participants}명</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">⏱️ 진행 시간</span>
                    <span className="info-value">{selectedRecord.duration}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">👨‍🏫 담당 강사</span>
                    <span className="info-value">{selectedRecord.instructor}</span>
                  </div>
                </div>
              </div>

              <div className="modal-description">
                <h3>상세 내용</h3>
                <div className="description-text">
                  {selectedRecord.detailedDescription.split('\n').map((line: string, index: number) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CognitiveProgram;
