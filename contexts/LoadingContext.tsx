"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LoadingContextType {
  isInitialLoading: boolean;
  setIsInitialLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    // Check if this is the initial load by checking sessionStorage
    const hasLoaded = sessionStorage.getItem('vyuha_app_loaded');
    
    if (!hasLoaded) {
      // First time loading - show loader for a minimum duration
      const timer = setTimeout(() => {
        setIsInitialLoading(false);
        sessionStorage.setItem('vyuha_app_loaded', 'true');
      }, 2500); // Show loader for 2.5 seconds minimum for a good UX

      return () => clearTimeout(timer);
    } else {
      // Already loaded before in this session - skip loader
      setIsInitialLoading(false);
    }
  }, []);

  // Clear the session storage when the browser tab/window is closed
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Clear the flag when the user closes the browser/tab completely
      sessionStorage.removeItem('vyuha_app_loaded');
    };

    // Listen for when the user is leaving the site completely
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <LoadingContext.Provider value={{ isInitialLoading, setIsInitialLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
