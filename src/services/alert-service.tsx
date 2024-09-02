import { Alert, Snackbar } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom';

type MessageType = 'success' | 'error' | 'info' | 'warning';

interface NotifyProps {
    message: string,
    type: MessageType,
    verticalPosition?: 'top' | 'bottom',
    horizontalPosition?: 'left' | 'right' | 'center'
}

const notificationDefaultVertical = 'top';
const notificationDefaultHorizontal = 'right';

const NotificationSnackbar: React.FC<NotifyProps> = ({message, type, verticalPosition, horizontalPosition}) => {

    return (
        <Snackbar
            anchorOrigin={{ vertical: verticalPosition ? verticalPosition : 'bottom', horizontal: horizontalPosition ? horizontalPosition :'right' }}
            open={true}
            sx={{position: 'fixed', zIndex: 1500}}
        >
            <Alert severity={type} sx={{ width: '100%' }}>
                {message}
            </Alert>

        </Snackbar>
    );
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const showNotification = ({ message, type, verticalPosition, horizontalPosition }: NotifyProps) => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    ReactDOM.render(
        <NotificationSnackbar message={message} type={type} verticalPosition={verticalPosition} horizontalPosition={horizontalPosition} />,
        container
    );

    setTimeout(() => {
        document.body.removeChild(container);
    }, 5000);
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const showWarning = (message:string) => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    ReactDOM.render(
        <NotificationSnackbar message={message} type={'warning'} verticalPosition={notificationDefaultVertical} horizontalPosition={notificationDefaultHorizontal} />,
        container
    );

    setTimeout(() => {
        document.body.removeChild(container);
    }, 5000);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const showError = (message:string) => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    ReactDOM.render(
        <NotificationSnackbar message={message} type={'error'} verticalPosition={notificationDefaultVertical} horizontalPosition={notificationDefaultHorizontal}/>,
        container
    );

    setTimeout(() => {
        document.body.removeChild(container);
    }, 5000);
};


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const showSuccess = ( message:string ) => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    ReactDOM.render(
        <NotificationSnackbar message={message} type={'success'} verticalPosition={notificationDefaultVertical} horizontalPosition={notificationDefaultHorizontal} />,
        container
    );

    setTimeout(() => {
        document.body.removeChild(container);
    }, 5000);
};


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const showInfo = ( message:string ) => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    ReactDOM.render(
        <NotificationSnackbar message={message} type={'info'} verticalPosition={notificationDefaultVertical} horizontalPosition={notificationDefaultHorizontal} />,
        container
    );

    setTimeout(() => {
        document.body.removeChild(container);
    }, 5000);
};