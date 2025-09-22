// MainControl.jsx
import React, { useState } from 'react';
import {Personal} from './Personal'; 
import {Address} from './AddressRegister'; 
import {Password} from './PasswordRegister'; 

const MainControl = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleFormSubmit = (formData) => {
    // Handle form submission logic here
    console.log('Form submitted:', formData);

    // Move to the next form/page
    setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      {currentPage === 1 && <Personal onSubmit={handleFormSubmit} />}
      {currentPage === 2 && <Address onSubmit={handleFormSubmit} />}
      {currentPage === 3 && <Password onSubmit={handleFormSubmit} />}
    </div>
  );
};

export default MainControl;