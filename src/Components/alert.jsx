import React, { Component } from 'react';
import { Alert } from '@material-ui/core';
import { AlertTitle } from '@material-ui/core';

class Alert extends Component {
    // state = {  }
    render() { 
        return (<div>
            <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                <strong>No Location Found</strong>
                </Alert>
        </div>  );
    }
}
 
export default Alert;