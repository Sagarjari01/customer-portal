import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import axios from 'axios';

interface PhotoContextType {
  photos: string[];
  isLoading: boolean;
  startPhotoInterval: (customerId: number) => void;
  stopPhotoInterval: () => void;
  fetchRandomPhotos: () => Promise<void>;
}

const PhotoContext = createContext<PhotoContextType | undefined>(undefined);

export const usePhotoContext = () => {
  const context = useContext(PhotoContext);
  if (!context) {
    throw new Error('usePhotoContext must be used within a PhotoProvider');
  }
  return context;
};

export const PhotoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const currentCustomerIdRef = useRef<number | null>(null);

  const getRandomPageNumber = () => {
    return Math.floor(Math.random() * 556);
  };

  const fetchRandomPhotos = useCallback(async () => {
    setIsLoading(true);
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    try {
      await delay(2000)
      const randomPage = getRandomPageNumber();
      const response = await axios.get(`https://jsonplaceholder.typicode.com/photos?_page=${randomPage}&_limit=9`);
      const photoUrls = response.data.map((photo: any) => photo.url);
      setPhotos(photoUrls);
    } catch (error) {
      console.error('Error fetching random photos:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const startPhotoInterval = useCallback((customerId: number) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (currentCustomerIdRef.current !== customerId) {
      setPhotos([]); 
      currentCustomerIdRef.current = customerId;
    }
    fetchRandomPhotos();
    intervalRef.current = setInterval(() => {
      fetchRandomPhotos();
    }, 10000);
  }, [fetchRandomPhotos]);

  const stopPhotoInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  return (
    <PhotoContext.Provider value={{ photos, isLoading, startPhotoInterval, stopPhotoInterval, fetchRandomPhotos }}>
      {children}
    </PhotoContext.Provider>
  );
};