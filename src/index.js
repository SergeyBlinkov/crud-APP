import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Components/reducer/userSlice';
import MenuButtonReducer from './Components/reducer/MenuButtonSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        MenuButton: MenuButtonReducer
    },
});


ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>



, document.getElementById('root'));
registerServiceWorker();
