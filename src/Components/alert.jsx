import React, { Component } from 'react';
import { Alert } from '@material-ui/lab';
import { AlertTitle } from '@material-ui/lab';

class AlertCom extends Component {
    render() { 
        return (
        <div>
            <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                <strong>No Location Found</strong>
            </Alert>
        </div>  );
    }
}
 
export default AlertCom;