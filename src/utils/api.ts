const API_BASE_URL = 'http://localhost:3001';

interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  errors?: any[];
}

export interface HomepageImage {
  id: string | number;
  title: string;
  description: string;
  imageUrl: string;
  category: 'hero' | 'location' | 'facility' | 'gallery';
  subcategory?: 'incheon' | 'anyang' | 'main' | 'sign' | 'lobby' | 'room' | 'therapy' | 'general';
  order_num?: number;
  isActive: boolean | number;
  uploadDate?: string;
  location?: string;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'API 요청 실패');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Appointment APIs
  async createAppointment(appointmentData: any): Promise<ApiResponse> {
    try {
      // 1. 상담 예약 생성
      const response = await this.request('/appointments', {
        method: 'POST',
        body: JSON.stringify(appointmentData),
      });

      // 2. SMS 알림 전송
      if (response.success) {
        await this.sendSMSNotification(appointmentData);
      }

      return response;
    } catch (error) {
      console.error('상담 예약 생성 실패:', error);
      throw error;
    }
  }

  // SMS 알림 전송
  private async sendSMSNotification(appointmentData: any): Promise<void> {
    const message = this.formatSMSMessage(appointmentData);
    
    try {
      // 실제 SMS 서비스 API 호출
      await this.request('/notifications/sms', {
        method: 'POST',
        body: JSON.stringify({
          to: '01021669525',
          message: message
        }),
      });
      
      console.log('✅ SMS 알림 전송 완료');
    } catch (error) {
      console.error('SMS 알림 전송 실패:', error);
      // SMS 전송 실패해도 예약은 성공으로 처리
    }
  }

  // SMS 메시지 포맷팅
  private formatSMSMessage(appointmentData: any): string {
    const branchName = appointmentData.branch === 'incheon' ? '인천점' : '안양점';
    const date = new Date(appointmentData.date).toLocaleDateString('ko-KR', {
      month: 'long',
      day: 'numeric'
    });

    return `[TheVida] 새로운 상담 예약 신청
${branchName}
${date} ${appointmentData.time}
${appointmentData.elderName} 어르신
${appointmentData.guardianName} (${appointmentData.guardianPhone})
${appointmentData.inquiryType}`;
  }

  async getAvailableSlots(branch: string, date: string): Promise<ApiResponse> {
    return this.request(`/appointments/availability/${branch}/${date}`);
  }

  // Availability APIs
  async getBusinessHours(): Promise<ApiResponse> {
    return this.request('/availability/business-hours');
  }

  async getClosedDates(): Promise<ApiResponse> {
    return this.request('/availability/closed-dates');
  }

  async getSlotInterval(): Promise<ApiResponse> {
    return this.request('/availability/slot-interval');
  }

  // 콘텐츠 관리 API
  async getContents(type?: string): Promise<ApiResponse> {
    const queryString = type ? `?type=${type}` : '';
    return this.request(`/content${queryString}`);
  }

  async getContent(id: string): Promise<ApiResponse> {
    return this.request(`/content/${id}`);
  }

  // 홈페이지 이미지 API
  async getHomepageImages(category?: string, subcategory?: string): Promise<ApiResponse> {
    let url = '/homepage-images';
    const params = new URLSearchParams();
    
    if (category) params.append('category', category);
    if (subcategory) params.append('subcategory', subcategory);
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    
    return this.request(url);
  }
}

// 홈페이지 이미지 API (별도 함수)
export const homepageAPI = {
  // 카테고리별 이미지 조회
  getImagesByCategory: async (category: string): Promise<HomepageImage[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/homepage-images?category=${category}`);
      if (!response.ok) {
        throw new Error('이미지 조회에 실패했습니다.');
      }
      const images = await response.json();
      return images;
    } catch (error) {
      console.error('API 호출 오류:', error);
      return [];
    }
  },

  // 모든 이미지 조회
  getAllImages: async (): Promise<HomepageImage[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/homepage-images`);
      if (!response.ok) {
        throw new Error('이미지 조회에 실패했습니다.');
      }
      const images = await response.json();
      return images;
    } catch (error) {
      console.error('API 호출 오류:', error);
      return [];
    }
  }
};

export const apiClient = new ApiClient(API_BASE_URL);
export default apiClient;
