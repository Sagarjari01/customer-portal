import React from 'react';
import './ShimmerGrid.css';

const ShimmerGrid: React.FC = () => {
  return (
    <div className="shimmer-grid">
      {Array(6).fill(null).map((_, index) => (
        <div key={index} className="shimmer-item"></div>
      ))}
    </div>
  );
};

export default ShimmerGrid;