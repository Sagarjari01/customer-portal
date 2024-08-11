import React, { useEffect, useMemo, useCallback } from 'react';
import { Customer } from '../interfaces/Customer';
import { usePhotoContext } from '../contexts/PhotoContext';

interface CustomerDetailsProps {
  customer: Customer;
}

const CustomerDetails: React.FC<CustomerDetailsProps> = React.memo(({ customer }) => {
  const { photos, startPhotoInterval, stopPhotoInterval } = usePhotoContext();

  useEffect(() => {
    startPhotoInterval();
    return () => stopPhotoInterval();
  }, [customer, startPhotoInterval, stopPhotoInterval]);

  const photoGrid = useMemo(() => (
    <div className="customer-details-main">
      {photos.map((photo, index) => (
        <img className='customer-details-image' key={index} src={photo} alt={`photo-${index}`} />
      ))}
    </div>
  ), [photos]);

  const renderCustomerInfo = useCallback(() => (
    <>
      <h2>{customer.name}</h2>
      <p>{customer.title}</p>
      <p>{customer.address}</p>
    </>
  ), [customer]);

  return (
    <div>
      {renderCustomerInfo()}
      {photoGrid}
    </div>
  );
});

export default CustomerDetails;