import React from 'react';
import { Button } from 'reactstrap';

const StyledExport = props => {
  const handleExport = e => {
    let alertText;
    let error;
    let success;
    if (props.exportUrl) {
      alertText = 'Exported';
      error = false;
      success = true;
    } else {
      e.preventDefault();
      alertText = 'Please Validate First!';
      error = true;
      success = false;
    }
    props.onExport(alertText, true, error, success);
  };
  return (
    <a href={props.exportUrl}>
      <Button color="secondary" style={{ width: '100%' }} onClick={handleExport}>
        Export to your computer
      </Button>
    </a>
  );
};

export default StyledExport;
