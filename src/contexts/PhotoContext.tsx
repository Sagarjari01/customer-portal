import React, { createContext, useContext, useState, useCallback, useRef, useMemo } from 'react';
import axios from 'axios';

interface PhotoContextType {
  photos: string[];
  startPhotoInterval: () => void;
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

export const PhotoProvider: React.FC<{ children: React.ReactNode }> = React.memo(({ children }) => {
  const [photos, setPhotos] = useState<string[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const getRandomPageNumber = useCallback(() => {
    return Math.floor(Math.random() * 556);
  }, []);

  const fetchRandomPhotos = useCallback(async () => {
    try {
      const randomPage = getRandomPageNumber();
      const response = await axios.get(`https://jsonplaceholder.typicode.com/photos?_page=${randomPage}&_limit=9`);
      const photoUrls = response.data.map((photo: any) => photo.url);
      setPhotos(photoUrls);
    } catch (error) {
      console.error('Error fetching random photos:', error);
    }
  }, [getRandomPageNumber]);

  const startPhotoInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
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

  const contextValue = useMemo(() => ({
    photos,
    startPhotoInterval,
    stopPhotoInterval,
    fetchRandomPhotos
  }), [photos, startPhotoInterval, stopPhotoInterval, fetchRandomPhotos]);

  return (
    <PhotoContext.Provider value={contextValue}>
      {children}
    </PhotoContext.Provider>
  );
});