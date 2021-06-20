import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import AuthContext from '../../context/auth/authContext';
import Image from '../../assets/warrior.png';

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
    <div className='home-wrapper'>
      <h1>Your stats</h1>
      <img src={Image} />
      <p>Your current health amount: {user.health}</p>
      <p>Your current gold amount: {user.gold}</p>
      <p>Your current inventory: {user.inventory}</p>
    </div>
  );
}

export default Home;
