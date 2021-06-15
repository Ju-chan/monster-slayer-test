import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

function Alerts() {
  const alertContext = useContext(AlertContext);
  // If there is an alert in the state, it will loop through it and display a corresponding alert message.
  // .map() is for iterating arrays!
  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.type}`}>
        <i className='fas fa-info-circle' />
        {alert.msg}
      </div>
    ))
  );
}

export default Alerts;
