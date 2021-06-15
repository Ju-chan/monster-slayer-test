import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';
import { CLEAR_CURRENT } from '../../context/types';

function ContactForm() {
  const contactContext = useContext(ContactContext);

  const {addContact, updateContact, clearCurrent, current} = contactContext;

  useEffect(()=> {
    if(current !== null) {
      // current -- complete contact
      setContact(current);
    } else {
      // Setting to the default
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
      })
    }
    // Adding dependencies to watch them if they change
  }, [contactContext, current]);
  // Instead of creating state for each property, we will put all of them into useState object parameter
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal',
  });
  const { name, email, phone, type } = contact;

  const onChange = (e) =>
    // Spreading out the content of the current state, [e.target.name] <-- what is typed
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if(current === null) {
      addContact(contact);
    } else {
      updateContact(contact)
    }
    // contactContext.addContact(contact);
    
    // Clearing the form to the default after the submit
    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'personal',
    });
  };
  
  
  const clearAll = ()=> {
      clearCurrent();
  }
  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>{current ? "Edit Contact": "Add contact"}</h2>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name} //name refers to the empty name key in the useState
        onChange={onChange}
      ></input>
      <input
        type='email'
        placeholder='Email'
        name='email'
        value={email}
        onChange={onChange}
      />
      <input
        type='phone'
        placeholder='Phone'
        name='phone'
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type='radio'
        name='type'
        value='personal'
        checked={type === 'personal'}
        onChange={onChange}
      />{' '}
      Personal{' '}
      <input
        type='radio'
        name='type'
        value='professional'
        // defaultChecked as props is also possible
        checked={type === 'professional'}
        onChange={onChange}
      />
      Professional{' '}
      <div>
        <input
          type='submit'
          value={current ? "Update Contact": "Add contact"}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && <div>
        <button className="btn btn-light btn-block" onClick={clearAll}>Clear</button></div>}
    </form>
  );
}

export default ContactForm;
