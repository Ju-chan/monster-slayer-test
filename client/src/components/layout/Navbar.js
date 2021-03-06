import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
// import ContactContext from '../../context/contact/contactContext';

function Navbar({ title, icon }) {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout, user } = authContext;

  // Assigning the function to the context to clear contacts which remain in the state after logging out
  // const contactContext = useContext(ContactContext);
  // const { clearContacts } = contactContext;

  // We're not clearing logout function in the onClick as we need to clear contacts after logging out
  const onLogout = () => {
    logout();
    // clearContacts();
  };

  const authLinks = (
    <Fragment>
      <li className='greeting'>Greetings, brave warrior {user && user.name}</li>
      <li className='greeting'>
        <a onClick={onLogout} href='#!'>
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  );
  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );
  return (
    <div className='navbar bg-primary'>
      <h1 className='title'>{title}</h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
}
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};
Navbar.defaultProps = {
  title: 'Monster Slayer',
  icon: '',
};
export default Navbar;
