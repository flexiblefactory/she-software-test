import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { SnackbarProvider } from 'notistack';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SnackbarProvider maxSnack={3}><App /></SnackbarProvider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
