import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import AuthContext from '../../context/auth/authContext';

function Home() {
  const [user, showUser] = useState([]);
  const authContext = useContext(AuthContext);
  // The user will remain its value and authenticated even after reloading the page

  const showUsersInfo = () => {
    axios
      .post('/api/users/users', { email: localStorage.getItem('email') })
      .then((res) => showUser(res.data));
  };

  useEffect(() => {
    authContext.loaduser();
    showUsersInfo();

    // eslint-disable-next-line
  }, []);
  return (
    <div className='grid-2'>
      <h1>{user.gold}</h1>
    </div>
  );
}

export default Home;
