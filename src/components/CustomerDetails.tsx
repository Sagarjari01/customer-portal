import React, { useEffect, useMemo } from 'react';
import { Customer } from '../interfaces/Customer';
import { usePhotoContext } from '../contexts/PhotoContext';
import ShimmerGrid from './shimmerUI/ShimmerGrid';


interface CustomerDetailsProps {
  customer: Customer;
}

const CustomerDetails: React.FC<CustomerDetailsProps> = React.memo(({ customer }) => {
  const { photos, isLoading, startPhotoInterval, stopPhotoInterval } = usePhotoContext();

  useEffect(() => {
    startPhotoInterval(customer.id);
    return () => stopPhotoInterval();
  }, [customer.id, startPhotoInterval, stopPhotoInterval]);

  const photoGrid = useMemo(() => (
    <div className="customer-details-main">
      {photos.map((photo, index) => (
        <img key={index} src={photo} alt={`photo-${index}`} className="customer-details-image" />
      ))}
    </div>
  ), [photos]);

  return (
    <div className="customer-details">
      <h2>{customer.name}</h2>
      <p>{customer.title}</p>
      <p>{customer.address}</p>
      {isLoading ? <ShimmerGrid /> : photoGrid}
    </div>
  );
});

export default CustomerDetails;