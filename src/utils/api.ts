const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  errors?: any[];
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
    return this.request('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointmentData),
    });
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


}

export const apiClient = new ApiClient(API_BASE_URL);
export default apiClient;
