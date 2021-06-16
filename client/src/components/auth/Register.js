// Registering a new user
import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

function Register(props) {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  // Pulling out register from the context
  const { register, error, clearErrors, isAuthenticated } = authContext;
  // Logging out in the browser about the user being already registered
  useEffect(() => {
    if (isAuthenticated) {
      // Redirecting to the homepage after the user successfully registers
      props.history.push('/');
    }
    if (error === 'User already exists') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    image: null,
    name: '',
    email: '',
    password: '',
    // 2nd password entry confirmation
    password2: '',
  });
  const { image, name, email, password, password2 } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const fileSelected = (e) => {
    this.image = e.target.files;
  };
  const fileUploaded = (e) => {
    const fd = new FormData();
    fd.append('profile-pic', this.image, this.image.name);
    axios.post('/api/users', fd).then((res) => console.log(res.data));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setAlert('Please fill all fields', 'danger');
    } else if (password !== password2) {
      setAlert('Passwords do not match');
    } else {
      register({
        image,
        name,
        email,
        password,
      });
    }
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <div>
            <label htmlFor='profile-picture'>Upload your profile picture</label>
            <input
              type='file'
              name='profile=picture'
              value={image}
              onChange={fileSelected}
            />
            <button
              value='submit'
              onClick={fileUploaded}
              className='btn btn-primary'
            >
              Upload
            </button>
          </div>

          <label htmlFor='name'>Username</label>
          <input
            type='text'
            name='name'
            value={name}
            onChange={onChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Set password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
            minLength='6'
          />
        </div>

        <div className='form-group'>
          <label htmlFor='password2'>Confirm password</label>
          <input
            type='password'
            name='password2'
            value={password2}
            onChange={onChange}
            required
            minLength='6'
          />
          <input type='submit' value='Register' className='btn btn-primary' />
        </div>
      </form>
    </div>
  );
}

export default Register;
