// src/contexts/CustomerContext.jsx

import React, { createContext, useContext, useState, useEffect } from "react";
import CustomerService from "../services/CustomerService";
import { useAuth } from "./AuthContext";

const CustomerContext = createContext();

export function useCustomers() {
  return useContext(CustomerContext);
}

export function CustomerProvider({ children }) {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  // Fetch all customers
  const fetchCustomers = async () => {
    if (!isAuthenticated) {
      setCustomers([]);
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      const data = await CustomerService.getAllCustomers();
      setCustomers(data);
    } catch (err) {
      setError("Failed to fetch customers. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetching
  useEffect(() => {
    fetchCustomers();
  }, [isAuthenticated]);

  // Add a new customer
  const addCustomer = async (customerData) => {
    try {
      setLoading(true);
      const newCustomer = await CustomerService.createCustomer(customerData);
      setCustomers(prevCustomers => [...prevCustomers, newCustomer]);
      return newCustomer;
    } catch (err) {
      setError("Failed to add customer. Please try again.");
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update a customer
  const updateCustomer = async (id, customerData) => {
    try {
      setLoading(true);
      const updatedCustomer = await CustomerService.updateCustomer(id, customerData);
      setCustomers(prevCustomers => 
        prevCustomers.map(customer => customer.id === id ? updatedCustomer : customer)
      );
      return updatedCustomer;
    } catch (err) {
      setError("Failed to update customer. Please try again.");
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete a customer
  const deleteCustomer = async (id) => {
    try {
      setLoading(true);
      await CustomerService.deleteCustomer(id);
      setCustomers(prevCustomers => prevCustomers.filter(customer => customer.id !== id));
    } catch (err) {
      setError("Failed to delete customer. Please try again.");
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get customer history
  const getCustomerHistory = async (id) => {
    try {
      const history = await CustomerService.getCustomerHistory(id);
      return history;
    } catch (err) {
      console.error(`Error fetching history for customer ${id}:`, err);
      throw err;
    }
  };

  const value = {
    customers,
    loading,
    error,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    getCustomerHistory,
    refreshCustomers: fetchCustomers
  };

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
}