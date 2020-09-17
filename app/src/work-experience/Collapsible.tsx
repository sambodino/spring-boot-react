import React, { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import { ChevronDown } from 'react-bootstrap-icons';

import './Collapsible.css';

const Collapsible = (props) => {
  const [open, setOpen] = useState(false);

  return (<div className='collapsible'>
    {props.text}
    <ChevronDown onClick={() => setOpen(!open)}/>
    <Collapse in={open}>
      {props.children}
    </Collapse>
  </div>);
};

export default Collapsible;
