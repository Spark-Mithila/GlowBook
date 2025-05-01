// src/services/CustomerService.js

// Reuse the same axios instance from BookingService
import { apiClient } from './apiClient';

const CustomerService = {
  // Get all customers
  getAllCustomers: async () => {
    try {
      const response = await apiClient.get('/customers');
      return response.data;
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw error;
    }
  },

  // Get a single customer by ID
  getCustomerById: async (id) => {
    try {
      const response = await apiClient.get(`/customers/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching customer ${id}:`, error);
      throw error;
    }
  },

  // Create a new customer
  createCustomer: async (customerData) => {
    try {
      const response = await apiClient.post('/customers', customerData);
      return response.data;
    } catch (error) {
      console.error('Error creating customer:', error);
      throw error;
    }
  },

  // Update an existing customer
  updateCustomer: async (id, customerData) => {
    try {
      const response = await apiClient.put(`/customers/${id}`, customerData);
      return response.data;
    } catch (error) {
      console.error(`Error updating customer ${id}:`, error);
      throw error;
    }
  },

  // Delete a customer
  deleteCustomer: async (id) => {
    try {
      const response = await apiClient.delete(`/customers/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting customer ${id}:`, error);
      throw error;
    }
  },

  // Get customer history (bookings)
  getCustomerHistory: async (id) => {
    try {
      const response = await apiClient.get(`/customers/${id}/history`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching history for customer ${id}:`, error);
      throw error;
    }
  },
};

export default CustomerService;