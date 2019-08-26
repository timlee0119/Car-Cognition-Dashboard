import React from 'react';

const DriverAlert = (props) => (
  // <div style={{"position": "absolute", "left": props.left, "top": props.top, "textAlign": props.center, "width": "250px"}}>
  //   <h5 className="text-danger">{props.children}</h5>
  // </div>
  <>
    <h5 className="text-danger">{props.children}</h5>
  </>
);

export default DriverAlert;
