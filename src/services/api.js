// API service for frontend communication with backend
const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:5001/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('authToken');
  }

  // Set authentication token
  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  }

  // Get authentication headers
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }
    
    return headers;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }
      
      return data;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  // Authentication methods
  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async logout() {
    try {
      await this.request('/auth/logout', { method: 'POST' });
    } finally {
      this.setToken(null);
    }
  }

  async sendOTP(email) {
    return this.request('/auth/send-otp', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async verifyOTP(email, otp) {
    return this.request('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ email, otp }),
    });
  }

  async forgotPassword(email) {
    return this.request('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async resetPassword(email, otp, newPassword) {
    return this.request('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ email, otp, newPassword }),
    });
  }

  // User profile methods
  async getProfile() {
    return this.request('/auth/me');
  }

  async updateProfile(profileData) {
    return this.request('/auth/update-profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  // Membership methods
  async getMembershipPlans() {
    return this.request('/membership/plans');
  }

  async updateMembership(membershipData) {
    return this.request('/auth/update-membership', {
      method: 'POST',
      body: JSON.stringify(membershipData),
    });
  }

  // Booking methods
  async createBooking(bookingData) {
    return this.request('/auth/update-booking', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  }

  async getBookings() {
    return this.request('/bookings');
  }

  async cancelBooking(bookingId) {
    return this.request(`/bookings/${bookingId}/cancel`, {
      method: 'POST',
    });
  }

  // Payment methods
  async processPayment(paymentData) {
    return this.request('/auth/complete-payment', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  }

  async getPaymentHistory() {
    return this.request('/payments/history');
  }

  // Utility methods
  async checkHealth() {
    return this.request('/health');
  }

  async checkEmailAvailability(email) {
    return this.request('/auth/check-email', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async checkPhoneAvailability(phone) {
    return this.request('/auth/check-phone', {
      method: 'POST',
      body: JSON.stringify({ phone }),
    });
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;