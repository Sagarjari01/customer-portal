import React from 'react';
import { Customer } from '../interfaces/Customer';
import CustomerCard from './CustomerCard';

interface CustomerListProps {
  customers: Customer[];
  selectedCustomerId: number | null;
  onSelectCustomer: (id: number) => void;
}

const CustomerList: React.FC<CustomerListProps> = ({ customers, selectedCustomerId, onSelectCustomer }) => {
  return (
    <div className='customer-list-main'>
      {customers.map(customer => (
        <CustomerCard
          key={customer.id}
          customer={customer}
          onClick={() => onSelectCustomer(customer.id)}
          isSelected={customer.id === selectedCustomerId}
        />
      ))}
    </div>
  );
};

export default CustomerList;
