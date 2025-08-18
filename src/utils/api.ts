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

  // Admin APIs
  async adminLogin(credentials: { email: string; password: string }): Promise<ApiResponse> {
    return this.request('/admin/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async getAdminProfile(token: string): Promise<ApiResponse> {
    return this.request('/admin/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getAppointments(token: string, params?: any): Promise<ApiResponse> {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request(`/admin/appointments${queryString}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async updateAppointmentStatus(
    token: string,
    appointmentId: string,
    status: string
  ): Promise<ApiResponse> {
    return this.request(`/admin/appointments/${appointmentId}/status`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
  }

  async getStatistics(token: string, period?: string): Promise<ApiResponse> {
    const queryString = period ? `?period=${period}` : '';
    return this.request(`/admin/statistics${queryString}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // 콘텐츠 관리 API
  async getContents(type?: string): Promise<ApiResponse> {
    const queryString = type ? `?type=${type}` : '';
    return this.request(`/content${queryString}`);
  }

  async getContent(id: string): Promise<ApiResponse> {
    return this.request(`/content/${id}`);
  }

  async getAdminContents(token: string, params?: any): Promise<ApiResponse> {
    const queryParams = new URLSearchParams();
    if (params?.type) queryParams.append('type', params.type);
    if (params?.page) queryParams.append('page', params.page);
    if (params?.limit) queryParams.append('limit', params.limit);

    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
    return this.request(`/content/admin/all${queryString}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async createContent(token: string, formData: FormData): Promise<ApiResponse> {
    return this.request('/content', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
  }

  async updateContent(token: string, id: string, formData: FormData): Promise<ApiResponse> {
    return this.request(`/content/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
  }

  async deleteContent(token: string, id: string): Promise<ApiResponse> {
    return this.request(`/content/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async deleteContentImage(token: string, contentId: string, imageName: string): Promise<ApiResponse> {
    return this.request(`/content/${contentId}/images/${imageName}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
export default apiClient;
