import { apiClient } from "./apiClient";

// src/services/BookingService.js
const BookingService = {
  // Get all bookings for the current user
  getAllBookings: async () => {
    try {
      const response = await apiClient.get('/appointments');
      return response.data;
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }
  },

  // Get upcoming bookings
  getUpcomingBookings: async (limit = 5) => {
    try {
      const response = await apiClient.get(`/appointments/upcoming?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching upcoming bookings:', error);
      throw error;
    }
  },

  // Get a single booking by ID
  getBookingById: async (id) => {
    try {
      const response = await apiClient.get(`/appointments/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching booking ${id}:`, error);
      throw error;
    }
  },

  // Create a new booking
  createBooking: async (bookingData) => {
    try {
      const response = await apiClient.post('/appointments', bookingData);
      return response.data;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  },

  // Update an existing booking
  updateBooking: async (id, bookingData) => {
    try {
      const response = await apiClient.put(`/appointments/${id}`, bookingData);
      return response.data;
    } catch (error) {
      console.error(`Error updating booking ${id}:`, error);
      throw error;
    }
  },

  // Delete a booking
  deleteBooking: async (id) => {
    try {
      const response = await apiClient.delete(`/appointments/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting booking ${id}:`, error);
      throw error;
    }
  },

  // Get booking statistics
  getBookingStats: async () => {
    try {
      const response = await apiClient.get('/appointments/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching booking stats:', error);
      throw error;
    }
  },
};

export default BookingService;