import React from 'react';

function Footer() {
  function fullYear() {
    const yearFormat = new Date();
    return yearFormat.getFullYear();
  }

  return (
    <footer className="w-100 mt-auto bg-secondary p-4">
      <h2 className="copyright">
        &copy; <span>{fullYear()} Working RV'ers</span> 
      </h2>
    </footer>
  );
};

export default Footer;
