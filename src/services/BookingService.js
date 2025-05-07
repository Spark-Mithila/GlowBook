// src/services/BookingService.js
import { apiClient } from "./apiClient";

const BookingService = {
  // Get all bookings for the current user
  getAllBookings: async (filters = {}) => {
    try {
      // Convert filters to query params
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.date) params.append('date', filters.date);
      if (filters.customerId) params.append('customerId', filters.customerId);
      
      const query = params.toString() ? `?${params.toString()}` : '';
      const response = await apiClient.get(`/appointments${query}`);
      
      // Based on API guide, data is returned in response.data.data
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }
  },

  // Get upcoming bookings
  getUpcomingBookings: async (limit = 5) => {
    try {
      // According to API guide, we should use filters on the main endpoint
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
      const response = await apiClient.get(`/appointments?date=${today}&status=scheduled,confirmed&limit=${limit}`);
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching upcoming bookings:', error);
      throw error;
    }
  },

  // Get a single booking by ID
  getBookingById: async (id) => {
    try {
      const response = await apiClient.get(`/appointments/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching booking ${id}:`, error);
      throw error;
    }
  },

  // Create a new booking
  createBooking: async (bookingData) => {
    try {
      const response = await apiClient.post('/appointments', bookingData);
      return response.data.data;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  },

  // Update an existing booking
  updateBooking: async (id, bookingData) => {
    try {
      // API guide uses PATCH instead of PUT
      const response = await apiClient.patch(`/appointments/${id}`, bookingData);
      return response.data.data;
    } catch (error) {
      console.error(`Error updating booking ${id}:`, error);
      throw error;
    }
  },

  // Cancel a booking (not delete)
  deleteBooking: async (id) => {
    try {
      const response = await apiClient.delete(`/appointments/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error cancelling booking ${id}:`, error);
      throw error;
    }
  },

  // Get booking statistics - This might need to be implemented in the backend
  getBookingStats: async () => {
    try {
      // This endpoint may not be explicitly mentioned in the API guide
      // We'll need to calculate stats on client side or add to backend
      const response = await apiClient.get('/appointments');
      const bookings = response.data.data || [];
      
      // Calculate stats from bookings data
      const stats = {
        totalBookings: bookings.length,
        totalCustomers: new Set(bookings.map(b => b.customerPhone)).size,
        totalRevenue: bookings.reduce((sum, booking) => sum + (booking.price || 0), 0)
      };
      
      return stats;
    } catch (error) {
      console.error('Error calculating booking stats:', error);
      throw error;
    }
  },
};

export default BookingService;