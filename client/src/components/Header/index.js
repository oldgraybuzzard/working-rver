import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = () => {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <Navbar className="bg-light mb-4 py-1 flex-row align-center" sticky="top">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <Link to='/'>
          <h1>Working RV'er</h1>
        </Link>
        <nav className="text-center">
          {Auth.loggedIn() ? (
            <>
              <Link to="/">Home</Link>
              <Link to="/dashboard">RV'er Seeking</Link>
              <Link to="/dashboard">Seeking an RV'er</Link>
              <Link to="/profile">Me</Link>
              <a href="/" onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </nav>
      </div>
    </Navbar>
  );
};

export default Header;
