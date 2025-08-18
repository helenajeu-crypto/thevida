import React, { useState, useEffect } from 'react';
import apiClient from '../utils/api';
import './ContentManager.css';

interface Content {
  _id: string;
  type: 'slider' | 'service' | 'facility' | 'info' | 'settings';
  title: string;
  description?: string;
  content: any;
  images?: string[];
  order?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ContentFormData {
  type: 'slider' | 'service' | 'facility' | 'info' | 'settings';
  title: string;
  description: string;
  content: string;
  order: number;
  isActive: boolean;
}

const ContentManager: React.FC = () => {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [token, setToken] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingContent, setEditingContent] = useState<Content | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [filters, setFilters] = useState({ type: 'all' });

  const [formData, setFormData] = useState<ContentFormData>({
    type: 'slider',
    title: '',
    description: '',
    content: '',
    order: 0,
    isActive: true
  });

  useEffect(() => {
    const savedToken = localStorage.getItem('adminToken');
    if (savedToken) {
      setToken(savedToken);
      fetchContents();
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchContents();
    }
  }, [currentPage, filters]);

  const fetchContents = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage.toString(),
        limit: '10',
        ...filters
      };
      
      const response = await apiClient.getAdminContents(token, params);
      if (response.success && response.data) {
        setContents(response.data.contents);
        setTotalPages(response.data.pagination.total);
      }
    } catch (error) {
      console.error('콘텐츠 목록 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('type', formData.type);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('order', formData.order.toString());
      formDataToSend.append('isActive', formData.isActive.toString());

      // 파일 추가
      selectedFiles.forEach(file => {
        formDataToSend.append('images', file);
      });

      let response;
      if (editingContent) {
        response = await apiClient.updateContent(token, editingContent._id, formDataToSend);
      } else {
        response = await apiClient.createContent(token, formDataToSend);
      }

      if (response.success) {
        alert(editingContent ? '콘텐츠가 수정되었습니다.' : '콘텐츠가 생성되었습니다.');
        resetForm();
        fetchContents();
      } else {
        alert(response.message || '작업에 실패했습니다.');
      }
    } catch (error: any) {
      alert(error.message || '작업에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('정말로 이 콘텐츠를 삭제하시겠습니까?')) {
      return;
    }

    try {
      const response = await apiClient.deleteContent(token, id);
      if (response.success) {
        alert('콘텐츠가 삭제되었습니다.');
        fetchContents();
      } else {
        alert(response.message || '삭제에 실패했습니다.');
      }
    } catch (error: any) {
      alert(error.message || '삭제에 실패했습니다.');
    }
  };

  const handleEdit = (content: Content) => {
    setEditingContent(content);
    setFormData({
      type: content.type,
      title: content.title,
      description: content.description || '',
      content: JSON.stringify(content.content, null, 2),
      order: content.order || 0,
      isActive: content.isActive
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      type: 'slider',
      title: '',
      description: '',
      content: '',
      order: 0,
      isActive: true
    });
    setEditingContent(null);
    setShowForm(false);
    setSelectedFiles([]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleImageDelete = async (contentId: string, imageName: string) => {
    if (!window.confirm('이 이미지를 삭제하시겠습니까?')) {
      return;
    }

    try {
      const response = await apiClient.deleteContentImage(token, contentId, imageName);
      if (response.success) {
        alert('이미지가 삭제되었습니다.');
        fetchContents();
      } else {
        alert(response.message || '이미지 삭제에 실패했습니다.');
      }
    } catch (error: any) {
      alert(error.message || '이미지 삭제에 실패했습니다.');
    }
  };

  const getContentTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      slider: '슬라이더',
      service: '서비스',
      facility: '시설',
      info: '정보',
      settings: '설정'
    };
    return labels[type] || type;
  };

  if (!token) {
    return <div className="content-manager">관리자 로그인이 필요합니다.</div>;
  }

  return (
    <div className="content-manager">
      <div className="content-header">
        <h2>📝 콘텐츠 관리</h2>
        <button onClick={() => setShowForm(true)} className="add-btn">
          새 콘텐츠 추가
        </button>
      </div>

      {/* 필터 */}
      <div className="filters">
        <select
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        >
          <option value="all">전체 타입</option>
          <option value="slider">슬라이더</option>
          <option value="service">서비스</option>
          <option value="facility">시설</option>
          <option value="info">정보</option>
          <option value="settings">설정</option>
        </select>
      </div>

      {/* 콘텐츠 폼 */}
      {showForm && (
        <div className="content-form-overlay">
          <div className="content-form">
            <h3>{editingContent ? '콘텐츠 수정' : '새 콘텐츠 추가'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>타입</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  required
                >
                  <option value="slider">슬라이더</option>
                  <option value="service">서비스</option>
                  <option value="facility">시설</option>
                  <option value="info">정보</option>
                  <option value="settings">설정</option>
                </select>
              </div>

              <div className="form-group">
                <label>제목</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>설명</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="form-group">
                <label>콘텐츠 (JSON)</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={10}
                  required
                  placeholder='{"key": "value"}'
                />
              </div>

              <div className="form-group">
                <label>순서</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                />
              </div>

              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  />
                  활성화
                </label>
              </div>

              <div className="form-group">
                <label>이미지 업로드</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {selectedFiles.length > 0 && (
                  <div className="selected-files">
                    선택된 파일: {selectedFiles.map(f => f.name).join(', ')}
                  </div>
                )}
              </div>

              <div className="form-actions">
                <button type="submit" disabled={loading}>
                  {loading ? '처리 중...' : (editingContent ? '수정' : '생성')}
                </button>
                <button type="button" onClick={resetForm}>
                  취소
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 콘텐츠 목록 */}
      <div className="contents-list">
        {loading ? (
          <div className="loading">로딩 중...</div>
        ) : contents.length === 0 ? (
          <div className="no-content">콘텐츠가 없습니다.</div>
        ) : (
          contents.map(content => (
            <div key={content._id} className="content-item">
              <div className="content-info">
                <h4>{content.title}</h4>
                <p className="content-type">{getContentTypeLabel(content.type)}</p>
                <p className="content-description">{content.description}</p>
                <div className="content-meta">
                  <span>순서: {content.order}</span>
                  <span>상태: {content.isActive ? '활성' : '비활성'}</span>
                  <span>생성일: {new Date(content.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {content.images && content.images.length > 0 && (
                <div className="content-images">
                  <h5>이미지</h5>
                  <div className="image-grid">
                    {content.images.map((image, index) => (
                      <div key={index} className="image-item">
                        <img 
                          src={`${process.env.REACT_APP_API_URL?.replace('/api', '')}/uploads/images/${image}`} 
                          alt={`${content.title} 이미지 ${index + 1}`}
                        />
                        <button
                          onClick={() => handleImageDelete(content._id, image)}
                          className="delete-image-btn"
                        >
                          삭제
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="content-actions">
                <button onClick={() => handleEdit(content)} className="edit-btn">
                  수정
                </button>
                <button onClick={() => handleDelete(content._id)} className="delete-btn">
                  삭제
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            이전
          </button>
          <span>{currentPage} / {totalPages}</span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
};

export default ContentManager;
