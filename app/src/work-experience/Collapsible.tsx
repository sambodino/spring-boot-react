import React, { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import { ChevronDown, ChevronUp } from 'react-bootstrap-icons';

import './Collapsible.css';

const Collapsible = (props) => {
  const [open, setOpen] = useState(false);

  return (<div className='collapsible'>
    <div className='collapsible-heading' onClick={() => setOpen(!open)}>
      {props.text}
      {open ? <ChevronUp/> : <ChevronDown/>}
    </div>
    <Collapse in={open}>
      {props.children}
    </Collapse>
  </div>);
};

export default Collapsible;
