import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';


const container = document.getElementById('app');

// ReactDOM.render(__qué__, __dónde__);

ReactDOM.render(
    <React.StrictMode>
            <App/>
    </React.StrictMode>,
    container
);