import React, { useMemo, useState } from 'react';
import { Customer } from './interfaces/Customer';
import CustomerList from './components/CustomerList';
import CustomerDetails from './components/CustomerDetails';
import './App.css';
const generateMockCustomers = (count: number): Customer[] => 
  Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `Customer ${index + 1}`,
    title: `Title ${index + 1}`,
    address: `Address ${index + 1}`,
    photos: []
  }));

const App: React.FC = () => {
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);

  const mockCustomers = useMemo(() => generateMockCustomers(1000), []);

  const selectedCustomer = useMemo(() => 
    mockCustomers.find(customer => customer.id === selectedCustomerId) || null,
    [mockCustomers, selectedCustomerId]
  );
  return (
    <div className="app-container">
      <div className="customer-list-container">
        <CustomerList
          customers={mockCustomers}
          selectedCustomerId={selectedCustomerId}
          onSelectCustomer={setSelectedCustomerId}
        />
      </div>
      <div className="customer-details-container">
        {selectedCustomer && <CustomerDetails customer={selectedCustomer} />}
      </div>
    </div>
  );
};

export default App;
