// src/contexts/BookingContext.jsx

import React, { createContext, useContext, useState, useEffect } from "react";
import BookingService from "../services/BookingService";
import { useAuth } from "./AuthContext";

const BookingContext = createContext();

export function useBookings() {
  return useContext(BookingContext);
}

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState([]);
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalCustomers: 0,
    totalRevenue: 0
  });
  
  const { _currentUser, isAuthenticated } = useAuth();

  // Fetch all bookings
  const fetchBookings = async () => {
    if (!isAuthenticated) {
      setBookings([]);
      setUpcomingBookings([]);
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      const data = await BookingService.getAllBookings();
      setBookings(data);
    } catch (err) {
      setError("Failed to fetch bookings. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch upcoming bookings
  const fetchUpcomingBookings = async (limit = 5) => {
    if (!isAuthenticated) return;
    
    try {
      const data = await BookingService.getUpcomingBookings(limit);
      setUpcomingBookings(data);
    } catch (err) {
      console.error("Error fetching upcoming bookings:", err);
    }
  };

  // Fetch booking statistics
  const fetchBookingStats = async () => {
    if (!isAuthenticated) return;
    
    try {
      const data = await BookingService.getBookingStats();
      setStats(data);
    } catch (err) {
      console.error("Error fetching booking stats:", err);
    }
  };

  // Initial data fetching
  useEffect(() => {
    fetchBookings();
    fetchUpcomingBookings();
    fetchBookingStats();
  }, [isAuthenticated]);

  // Add a new booking
  const addBooking = async (bookingData) => {
    try {
      setLoading(true);
      const newBooking = await BookingService.createBooking(bookingData);
      setBookings(prevBookings => [...prevBookings, newBooking]);
      await fetchUpcomingBookings(); // Refresh upcoming bookings
      await fetchBookingStats(); // Update stats
      return newBooking;
    } catch (err) {
      setError("Failed to create booking. Please try again.");
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update a booking
  const updateBooking = async (id, bookingData) => {
    try {
      setLoading(true);
      const updatedBooking = await BookingService.updateBooking(id, bookingData);
      setBookings(prevBookings => 
        prevBookings.map(booking => booking.id === id ? updatedBooking : booking)
      );
      await fetchUpcomingBookings(); // Refresh upcoming bookings
      return updatedBooking;
    } catch (err) {
      setError("Failed to update booking. Please try again.");
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete a booking
  const deleteBooking = async (id) => {
    try {
      setLoading(true);
      await BookingService.deleteBooking(id);
      setBookings(prevBookings => prevBookings.filter(booking => booking.id !== id));
      await fetchUpcomingBookings(); // Refresh upcoming bookings
      await fetchBookingStats(); // Update stats
    } catch (err) {
      setError("Failed to delete booking. Please try again.");
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Refresh all booking data
  const refreshBookingData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchBookings(),
        fetchUpcomingBookings(),
        fetchBookingStats()
      ]);
    } catch (err) {
      console.error("Error refreshing booking data:", err);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    bookings,
    upcomingBookings,
    stats,
    loading,
    error,
    addBooking,
    updateBooking,
    deleteBooking,
    refreshBookingData,
    fetchUpcomingBookings
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
}