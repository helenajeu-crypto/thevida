import React, { useState, useEffect } from 'react';
import apiClient from '../utils/api';
import ContentManager from './ContentManager';
import './AdminPanel.css';

interface Appointment {
  _id: string;
  branch: 'incheon' | 'anyang';
  date: string;
  time: string;
  elderName: string;
  guardianName: string;
  guardianPhone: string;
  relationship: string;
  inquiryType: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
}

interface Statistics {
  total: number;
  pending: number;
  confirmed: number;
  completed: number;
  branches: {
    incheon: number;
    anyang: number;
  };
  inquiryTypes: Array<{
    _id: string;
    count: number;
  }>;
}

const AdminPanel: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  // Filter state
  const [filters, setFilters] = useState({
    status: 'all',
    branch: 'all',
    search: ''
  });

  // Tab state
  const [activeTab, setActiveTab] = useState<'appointments' | 'content'>('appointments');

  useEffect(() => {
    const savedToken = localStorage.getItem('adminToken');
    if (savedToken) {
      setToken(savedToken);
      setIsLoggedIn(true);
      fetchAppointments();
      fetchStatistics();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await apiClient.adminLogin(loginForm);
      if (response.success && response.data?.token) {
        setToken(response.data.token);
        setIsLoggedIn(true);
        localStorage.setItem('adminToken', response.data.token);
        fetchAppointments();
        fetchStatistics();
      } else {
        alert('로그인에 실패했습니다.');
      }
    } catch (error: any) {
      alert(error.message || '로그인에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setToken('');
    setIsLoggedIn(false);
    localStorage.removeItem('adminToken');
    setAppointments([]);
    setStatistics(null);
  };

  const fetchAppointments = async () => {
    try {
      const params = {
        page: currentPage.toString(),
        limit: '10',
        ...filters
      };
      
      const response = await apiClient.getAppointments(token, params);
      if (response.success && response.data) {
        setAppointments(response.data.appointments);
        setTotalPages(response.data.pagination.total);
      }
    } catch (error) {
      console.error('예약 목록 조회 실패:', error);
    }
  };

  const fetchStatistics = async () => {
    try {
      const response = await apiClient.getStatistics(token);
      if (response.success && response.data) {
        setStatistics(response.data);
      }
    } catch (error) {
      console.error('통계 조회 실패:', error);
    }
  };

  const updateAppointmentStatus = async (id: string, status: string) => {
    try {
      const response = await apiClient.updateAppointmentStatus(token, id, status);
      if (response.success) {
        fetchAppointments();
        fetchStatistics();
        alert('예약 상태가 업데이트되었습니다.');
      }
    } catch (error: any) {
      alert(error.message || '상태 업데이트에 실패했습니다.');
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchAppointments();
    }
  }, [currentPage, filters]);

  if (!isLoggedIn) {
    return (
      <div className="admin-login">
        <div className="login-container">
          <h2>🔐 관리자 로그인</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>이메일</label>
              <input
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>비밀번호</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                required
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? '로그인 중...' : '로그인'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>🏥 더비다 요양원 관리자 패널</h1>
        <button onClick={handleLogout} className="logout-btn">로그아웃</button>
      </div>

      {/* 탭 네비게이션 */}
      <div className="admin-tabs">
        <button
          className={`tab-btn ${activeTab === 'appointments' ? 'active' : ''}`}
          onClick={() => setActiveTab('appointments')}
        >
          📋 예약 관리
        </button>
        <button
          className={`tab-btn ${activeTab === 'content' ? 'active' : ''}`}
          onClick={() => setActiveTab('content')}
        >
          📝 콘텐츠 관리
        </button>
      </div>

      {/* 탭 콘텐츠 */}
      {activeTab === 'appointments' && (
        <>
          {/* Statistics */}
          {statistics && (
            <div className="statistics">
              <h2>📊 통계 현황</h2>
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>전체 예약</h3>
                  <p>{statistics.total}건</p>
                </div>
                <div className="stat-card">
                  <h3>대기 중</h3>
                  <p>{statistics.pending}건</p>
                </div>
                <div className="stat-card">
                  <h3>확정</h3>
                  <p>{statistics.confirmed}건</p>
                </div>
                <div className="stat-card">
                  <h3>완료</h3>
                  <p>{statistics.completed}건</p>
                </div>
              </div>
              
              <div className="branch-stats">
                <h3>지점별 예약</h3>
                <div className="branch-grid">
                  <div className="branch-card">
                    <h4>인천점</h4>
                    <p>{statistics.branches.incheon}건</p>
                  </div>
                  <div className="branch-card">
                    <h4>안양점</h4>
                    <p>{statistics.branches.anyang}건</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Filters */}
          <div className="filters">
            <h2>🔍 예약 목록</h2>
            <div className="filter-controls">
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <option value="all">전체 상태</option>
                <option value="pending">대기 중</option>
                <option value="confirmed">확정</option>
                <option value="cancelled">취소</option>
                <option value="completed">완료</option>
              </select>
              
              <select
                value={filters.branch}
                onChange={(e) => setFilters({ ...filters, branch: e.target.value })}
              >
                <option value="all">전체 지점</option>
                <option value="incheon">인천점</option>
                <option value="anyang">안양점</option>
              </select>
              
              <input
                type="text"
                placeholder="이름 또는 연락처로 검색..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </div>
          </div>

          {/* Appointments Table */}
          <div className="appointments-table">
            <table>
              <thead>
                <tr>
                  <th>날짜/시간</th>
                  <th>지점</th>
                  <th>어르신</th>
                  <th>보호자</th>
                  <th>연락처</th>
                  <th>문의 유형</th>
                  <th>상태</th>
                  <th>작업</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td>
                      {appointment.date}<br/>
                      {appointment.time}
                    </td>
                    <td>
                      {appointment.branch === 'incheon' ? '인천점' : '안양점'}
                    </td>
                    <td>{appointment.elderName}</td>
                    <td>{appointment.guardianName}</td>
                    <td>{appointment.guardianPhone}</td>
                    <td>{appointment.inquiryType}</td>
                    <td>
                      <span className={`status status-${appointment.status}`}>
                        {appointment.status === 'pending' && '대기 중'}
                        {appointment.status === 'confirmed' && '확정'}
                        {appointment.status === 'cancelled' && '취소'}
                        {appointment.status === 'completed' && '완료'}
                      </span>
                    </td>
                    <td>
                      <select
                        value={appointment.status}
                        onChange={(e) => updateAppointmentStatus(appointment._id, e.target.value)}
                      >
                        <option value="pending">대기 중</option>
                        <option value="confirmed">확정</option>
                        <option value="cancelled">취소</option>
                        <option value="completed">완료</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                이전
              </button>
              <span>{currentPage} / {totalPages}</span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                다음
              </button>
            </div>
          )}
        </>
      )}

      {activeTab === 'content' && (
        <ContentManager />
      )}
    </div>
  );
};

export default AdminPanel;
