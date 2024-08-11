import React from 'react';
import { Customer } from '../interfaces/Customer';

interface CustomerCardProps {
  customer: Customer;
  onClick: () => void;
  isSelected: boolean;
}

const CustomerCard: React.FC<CustomerCardProps> = ({ customer, onClick, isSelected }) => {
  return (
    <div onClick={onClick} className={isSelected?"selected":"customer-card-main"} >
      <h3>{customer.name}</h3>
      <p>{customer.title}</p>
    </div>
  );
};

export default CustomerCard;
