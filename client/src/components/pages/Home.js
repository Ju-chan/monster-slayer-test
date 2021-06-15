import React, { useContext, useEffect } from 'react';

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
      <div>Hello</div>
      <div></div>
    </div>
  );
}

export default Home;
