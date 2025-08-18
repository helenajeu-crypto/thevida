import React, { useState, useEffect } from 'react';
import './Services.css';

const RehabilitationProgram: React.FC = () => {
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch('/data/rehabilitation-records.json');
        const data = await response.json();
        setRecords(data.records);
      } catch (error) {
        console.error('활동 기록을 불러오는데 실패했습니다:', error);
        setRecords([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

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
            <h1 className="hero-title">재활프로그램</h1>
            <p className="hero-subtitle">
              전문적인 재활치료를 통해 어르신들의 신체 기능 회복과 건강한 삶을 지원합니다
            </p>
          </div>
        </div>
      </section>

      {/* Program Records */}
      <section className="section program-records">
        <div className="container">
          <h2 className="section-title">프로그램 활동 기록</h2>
          <p className="section-subtitle">매일 진행되는 재활프로그램의 생생한 모습을 기록합니다</p>
          
          {loading ? (
            <div className="loading">로딩 중...</div>
          ) : (
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
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta">
        <div className="container">
          <div className="cta-content">
            <h2>재활프로그램에 대해 더 자세히 알아보세요</h2>
            <p>전문 상담사가 어르신의 상황에 맞는 최적의 재활 프로그램을 추천해드립니다.</p>
            <a href="/contact" className="btn btn-primary">
              상담 신청하기
            </a>
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && selectedRecord && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            
            <div className="modal-header">
              <h2>{selectedRecord.title}</h2>
              <div className="modal-date">
                {selectedRecord.year}년 {selectedRecord.month}월 {selectedRecord.day}일
              </div>
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
                    <span className="info-label">⏱️ 소요 시간</span>
                    <span className="info-value">{selectedRecord.duration}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">🏥 담당 치료사</span>
                    <span className="info-value">{selectedRecord.therapist}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">📍 진행 장소</span>
                    <span className="info-value">{selectedRecord.location}</span>
                  </div>
                </div>
              </div>

              <div className="modal-description">
                <h3>프로그램 내용</h3>
                <p>{selectedRecord.description}</p>
              </div>

              <div className="modal-benefits">
                <h3>기대 효과</h3>
                <ul>
                  {selectedRecord.benefits.map((benefit: string, index: number) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RehabilitationProgram;
