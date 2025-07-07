import axios from 'axios';
import Constants from 'expo-constants';

// API URL configuration for different environments
const getApiUrl = () => {
  // Check if we have a configured API URL
  if (Constants.expoConfig?.extra?.apiUrl) {
    return Constants.expoConfig.extra.apiUrl;
  }
  
  // Default URLs based on environment
  if (__DEV__) {
    // Development mode
    return 'http://10.0.2.2:5001/api'; // Android emulator
    // For physical device, use your computer's IP:
    // return 'http://192.168.1.100:5001/api';
  }
  
  // Production fallback
  return 'https://your-production-api.com/api';
};

const API_BASE_URL = getApiUrl();

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        if (this.authToken) {
          config.headers.Authorization = `Bearer ${this.authToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle errors
    this.api.interceptors.response.use(
      (response) => response.data,
      (error) => {
        if (error.response?.status === 401) {
          // Token expired or invalid
          this.authToken = null;
          // You might want to trigger a logout here
        }
        return Promise.reject(error.response?.data || error.message);
      }
    );
  }

  setAuthToken(token) {
    this.authToken = token;
  }

  // Auth endpoints
  async sendOtp(email) {
    return this.api.post('/auth/send-otp', { email });
  }

  async verifyOtp(email, otp) {
    return this.api.post('/auth/verify-otp', { email, otp });
  }

  async register(userData) {
    return this.api.post('/auth/register', userData);
  }

  async login(email, password) {
    return this.api.post('/auth/login', { email, password });
  }

  async sendPasswordResetOtp(email) {
    return this.api.post('/auth/send-reset-otp', { email });
  }

  async verifyResetOtp(email, otp) {
    return this.api.post('/auth/verify-reset-otp', { email, otp });
  }

  async resetPassword(email, otp, newPassword) {
    return this.api.post('/auth/reset-password', { email, otp, newPassword });
  }

  async logout() {
    return this.api.post('/auth/logout');
  }

  // User endpoints
  async getCurrentUser() {
    return this.api.get('/auth/me');
  }

  async updateProfile(userData) {
    return this.api.put('/auth/profile', userData);
  }

  async updateBookingDetails(bookingData) {
    return this.api.put('/auth/booking-details', bookingData);
  }

  // Booking endpoints
  async getAvailableSeats(membershipType, date) {
    return this.api.get(`/booking/available-seats`, {
      params: { membershipType, date }
    });
  }

  async createBooking(bookingData) {
    return this.api.post('/booking/create', bookingData);
  }

  async getUserBookings() {
    return this.api.get('/booking/user-bookings');
  }

  // Payment endpoints
  async createPaymentOrder(amount, bookingDetails) {
    return this.api.post('/payment/create-order', { amount, bookingDetails });
  }

  async verifyPayment(paymentData) {
    return this.api.post('/payment/verify', paymentData);
  }
}

export default new ApiService();