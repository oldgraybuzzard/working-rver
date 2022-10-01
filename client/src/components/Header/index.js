import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-secondary mb-4 py-2 flex-row align-center" sticky="top">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <Link to="/">
          <h1>Working RV'er</h1>
        </Link>

        <nav className="text-center">
          <Link to="/">Home</Link>
          <Link to="/dashboard">RV'er Seeking</Link>
          <Link to="/dashboard">Seeking an RV'er</Link>
          <Link to="/login">Login</Link>
          <Link to="/Signup">Signup</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
