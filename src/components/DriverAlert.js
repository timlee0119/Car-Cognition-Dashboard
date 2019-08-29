import React from 'react';

const DriverAlert = (props) => (
  <>
    <h6 className="text-danger">{props.children}</h6>
  </>
);

export default DriverAlert;
