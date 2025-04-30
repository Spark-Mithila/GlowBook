import React, { createContext, useContext, useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "./AuthContext";
import { db } from "../services/Firebase";

const PlanContext = createContext();

export function usePlan() {
  return useContext(PlanContext);
}

export function PlanProvider({ children }) {
  const [currentPlan, setCurrentPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    async function fetchPlan() {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setCurrentPlan(userDoc.data().planType || "free");
        }
      } else {
        setCurrentPlan(null);
      }
      setLoading(false);
    }

    fetchPlan();
  }, [currentUser]);

  async function updatePlan(planType) {
    if (currentUser) {
      await updateDoc(doc(db, "users", currentUser.uid), {
        planType
      });
      setCurrentPlan(planType);
    }
  }

  const plans = {
    basic: {
      name: "Basic",
      price: 499,
      features: [
        "Appointment Management",
        "Business Profile",
        "WhatsApp Integration"
      ]
    },
    standard: {
      name: "Standard",
      price: 999,
      features: [
        "All Basic features",
        "Customer History",
        "Analytics Dashboard"
      ]
    },
    premium: {
      name: "Premium",
      price: 1999,
      features: [
        "All Standard features",
        "Advanced Analytics",
        "Priority Support"
      ]
    }
  };

  const value = {
    currentPlan,
    updatePlan,
    plans,
    loading,
    hasAccess: () => {
      // Logic to check if current plan has access to feature
      // Implement based on features
      return true; // Placeholder
    }
  };

  return (
    <PlanContext.Provider value={value}>
      {!loading && children}
    </PlanContext.Provider>
  );
}