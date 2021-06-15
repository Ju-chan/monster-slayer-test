import React, { useContext, useEffect } from 'react';
import ContactForm from '../contacts/ContactForm';
import Contacts from '../contacts/Contacts';
import ContactFilter from '../contacts/ContactFilter';
import AuthContext from '../../context/auth/authContext';

function Home() {
  const authContext = useContext(AuthContext);
  // The user will remain its value and authenticated even after reloading the page
  useEffect(() => {
    authContext.loaduser();
    // In order not to run loaduser() as a dependency
    // eslint-disable-next-line
  }, []);
  return (
    <div className='grid-2'>
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  );
}

export default Home;
