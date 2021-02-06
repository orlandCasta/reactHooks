import React,{ useState, useContext } from 'react';
import './styles/Header.css';

const Header = () => {
    
    /* Constante que destructura dos elementos 1.- El estado, 2.- Funcion que va cambiar este estado
    de quien lo destructura de useState, le pasamos el estado inicial (false), esto puede ser un arreglo, string, objeto, etc...*/
    
    const [darkMode, setDarkMode] = useState(false);
    const handleClick = () => {
        setDarkMode(!darkMode);
    }

    return (
        <div className="Header">
            <h1>React Hooks</h1>
            <button
            className=""
            type="button"
            onClick={handleClick}
            >
                {darkMode ? 'Dark Mode' : 'Light Mode'}
            </button>
        </div>
    );
}

export default Header;