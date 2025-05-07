// src/services/CustomerService.js
import { apiClient } from './apiClient';

const CustomerService = {
  // Get all customers
  getAllCustomers: async () => {
    try {
      const response = await apiClient.get('/customers');
      // API returns data in response.data.data as per guide
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw error;
    }
  },

  // Get a single customer by ID
  getCustomerById: async (id) => {
    try {
      const response = await apiClient.get(`/customers/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching customer ${id}:`, error);
      throw error;
    }
  },

  // Create a new customer
  createCustomer: async (customerData) => {
    try {
      const response = await apiClient.post('/customers', customerData);
      return response.data.data;
    } catch (error) {
      console.error('Error creating customer:', error);
      throw error;
    }
  },

  // Update an existing customer
  updateCustomer: async (id, customerData) => {
    try {
      // API guide doesn't explicitly mention customer update endpoint
      // Assuming it follows REST conventions similar to other endpoints
      const response = await apiClient.patch(`/customers/${id}`, customerData);
      return response.data.data;
    } catch (error) {
      console.error(`Error updating customer ${id}:`, error);
      throw error;
    }
  },

  // Delete a customer
  deleteCustomer: async (id) => {
    try {
      // API guide doesn't explicitly mention customer deletion
      // Assuming it follows REST conventions
      const response = await apiClient.delete(`/customers/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting customer ${id}:`, error);
      throw error;
    }
  },

  // Get customer history by ID
  getCustomerHistory: async (id) => {
    try {
      const response = await apiClient.get(`/customers/${id}/history`);
      return response.data.data || [];
    } catch (error) {
      console.error(`Error fetching history for customer ${id}:`, error);
      throw error;
    }
  },

  // Get customer history by phone number
  getCustomerHistoryByPhone: async (phone) => {
    try {
      // This endpoint is mentioned in the API guide
      const response = await apiClient.get(`/customers/phone/${phone}/history`);
      return response.data.data || [];
    } catch (error) {
      console.error(`Error fetching history for phone ${phone}:`, error);
      throw error;
    }
  }
};

export default CustomerService;