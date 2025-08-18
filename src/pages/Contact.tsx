import React, { useEffect, useMemo, useState } from 'react';
import './Contact.css';
import apiClient from '../utils/api';
import type { BranchKey } from '../config/availability';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    branch: '' as '' | BranchKey,
    date: '',
    time: '',
    elderName: '',
    guardianName: '',
    guardianPhone: '',
    relationship: '',
    inquiryType: '',
    message: ''
  });

  const todayStr = useMemo(() => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }, []);

  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [isClosed, setIsClosed] = useState<{ closed: boolean; reason?: 'closedDay' | 'closedDate' }>({ closed: false });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    const fetchAvailability = async () => {
      if (formData.branch && formData.date) {
        try {
          const response = await apiClient.getAvailableSlots(formData.branch, formData.date);
          if (response.success && response.data) {
            setAvailableSlots(response.data.availableSlots || []);
            setBookedSlots(response.data.bookedSlots || []);
            setIsClosed({ closed: !response.data.open, reason: response.data.closedReason });
            // 시간 재설정 (이전 선택이 유효하지 않다면 비움)
            if (formData.time && !response.data.availableSlots?.includes(formData.time)) {
              setFormData((prev) => ({ ...prev, time: '' }));
            }
          }
        } catch (error) {
          console.error('가용 시간 조회 실패:', error);
          setAvailableSlots([]);
          setBookedSlots([]);
          setIsClosed({ closed: false });
        }
      } else {
        setAvailableSlots([]);
        setBookedSlots([]);
        setIsClosed({ closed: false });
        if (formData.time) setFormData((prev) => ({ ...prev, time: '' }));
      }
    };

    fetchAvailability();
  }, [formData.branch, formData.date, formData.time]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.branch || !formData.date || !formData.time) {
      alert('지점, 날짜, 시간을 선택해주세요.');
      return;
    }

    try {
      const response = await apiClient.createAppointment(formData);
      if (response.success) {
        alert('방문상담 예약이 성공적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.');
        setFormData({
          branch: '',
          date: '',
          time: '',
          elderName: '',
          guardianName: '',
          guardianPhone: '',
          relationship: '',
          inquiryType: '',
          message: ''
        });
        setAvailableSlots([]);
        setBookedSlots([]);
        setIsClosed({ closed: false });
      } else {
        alert(response.message || '예약 접수 중 오류가 발생했습니다.');
      }
    } catch (error: any) {
      console.error('예약 접수 실패:', error);
      alert(error.message || '예약 접수 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="contact">
      {/* Contact Section */}
      <section className="section contact-section">
        <div className="container">
          {/* 상담신청 카드 */}
          <div className="contact-card">
            <div className="contact-card-header">
              <h2>📋 방문상담 예약</h2>
              <p>폼을 작성해 주시면 방문 가능 일정과 안내를 드리겠습니다.</p>
            </div>
            <div className="contact-card-content">
              <div className="contact-info">
                <div className="quick-call-buttons">
                  <a href="tel:032-891-0121" className="btn btn-primary">📞 인천점 바로 전화</a>
                  <a href="tel:031-464-5075" className="btn btn-primary">📞 안양점 바로 전화</a>
                </div>
              </div>

              <div className="contact-form-container">
                <form onSubmit={handleSubmit} className="contact-form">
                  {/* 지점 / 날짜 */}
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="branch">방문 지점 *</label>
                      <select
                        id="branch"
                        name="branch"
                        value={formData.branch}
                        onChange={handleChange}
                        required
                      >
                        <option value="">지점을 선택해주세요</option>
                        <option value="incheon">더비다 인천점</option>
                        <option value="anyang">더비다 안양점</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="date">방문 날짜 *</label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        min={todayStr}
                      />
                    </div>
                  </div>

                  {/* 시간 선택 */}
                  <div className="form-group">
                    <label htmlFor="time">방문 시간 *</label>
                    <select
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      disabled={!formData.branch || !formData.date || isClosed.closed}
                    >
                      <option value="">
                        {isClosed.closed
                          ? '선택 불가 (휴무일)'
                          : formData.branch && formData.date
                          ? '시간을 선택해주세요'
                          : '지점과 날짜를 먼저 선택해주세요'}
                      </option>
                      {availableSlots.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                      {bookedSlots.length > 0 && (
                        <optgroup label="예약 불가">
                          {bookedSlots.map((t) => (
                            <option key={`b-${t}`} value={t} disabled>
                              {t} (예약불가)
                            </option>
                          ))}
                        </optgroup>
                      )}
                    </select>
                    {isClosed.closed && (
                      <div className="helper-text">해당 날짜는 {isClosed.reason === 'closedDay' ? '정기 휴무' : '휴무일(임시)'} 입니다.</div>
                    )}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="elderName">어르신 성함 *</label>
                      <input
                        type="text"
                        id="elderName"
                        name="elderName"
                        value={formData.elderName}
                        onChange={handleChange}
                        required
                        placeholder="예) 홍길동"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="guardianName">보호자 성함 *</label>
                      <input
                        type="text"
                        id="guardianName"
                        name="guardianName"
                        value={formData.guardianName}
                        onChange={handleChange}
                        required
                        placeholder="예) 김보호"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="guardianPhone">보호자 연락처 *</label>
                      <input
                        type="tel"
                        id="guardianPhone"
                        name="guardianPhone"
                        value={formData.guardianPhone}
                        onChange={handleChange}
                        required
                        placeholder="예) 010-1234-5678"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="relationship">어르신과의 관계 *</label>
                      <input
                        type="text"
                        id="relationship"
                        name="relationship"
                        value={formData.relationship}
                        onChange={handleChange}
                        required
                        placeholder="예) 자녀, 손자/손녀, 친척, 기타"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="inquiryType">문의 유형 *</label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">문의 유형을 선택해주세요</option>
                      <option value="입원 상담">입원 상담</option>
                      <option value="서비스 문의">서비스 문의</option>
                      <option value="견학 신청">견학 신청</option>
                      <option value="기타">기타</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">문의 내용 (선택)</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      placeholder="필수는 아니지만, 어르신의 상태나 요청사항을 자유롭게 적어주세요"
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary submit-btn">
                    방문상담 예약 신청
                  </button>
                </form>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Contact;

