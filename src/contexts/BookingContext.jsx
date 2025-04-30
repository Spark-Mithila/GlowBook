import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  doc
} from "firebase/firestore";
import { useAuth } from "./AuthContext";
import { db } from "../services/Firebase";

const BookingContext = createContext();

export function useBookings() {
  return useContext(BookingContext);
}

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    async function fetchBookings() {
      if (currentUser) {
        const bookingsRef = collection(db, "bookings");
        const q = query(
          bookingsRef,
          where("ownerId", "==", currentUser.uid),
          orderBy("appointmentTime", "desc")
        );
        
        const querySnapshot = await getDocs(q);
        const bookingsData = [];
        
        querySnapshot.forEach((doc) => {
          bookingsData.push({
            id: doc.id,
            ...doc.data()
          });
        });
        
        setBookings(bookingsData);
      } else {
        setBookings([]);
      }
      setLoading(false);
    }

    fetchBookings();
  }, [currentUser]);

  async function addBooking(bookingData) {
    const newBooking = {
      ...bookingData,
      ownerId: currentUser.uid,
      createdAt: new Date()
    };
    
    const docRef = await addDoc(collection(db, "bookings"), newBooking);
    setBookings([...bookings, { id: docRef.id, ...newBooking }]);
    return docRef;
  }

  async function updateBooking(id, bookingData) {
    await updateDoc(doc(db, "bookings", id), bookingData);
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, ...bookingData } : booking
    ));
  }

  async function deleteBooking(id) {
    await deleteDoc(doc(db, "bookings", id));
    setBookings(bookings.filter(booking => booking.id !== id));
  }

  const value = {
    bookings,
    loading,
    addBooking,
    updateBooking,
    deleteBooking
  };

  return (
    <BookingContext.Provider value={value}>
      {!loading && children}
    </BookingContext.Provider>
  );
}