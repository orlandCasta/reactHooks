import React, { useState } from 'react';
import Header from '../components/Header';
import Characters from '../components/Characters';
import ThemeContext from '../context/ThemeContext';
import './styles/Home.css'

function Home() {

    const [theme, updateTheme] = useState("bg-light");

    return (
        <ThemeContext.Provider>
            <div className="App">
                <Header/>
                <Characters/>
            </div>
        </ThemeContext.Provider>
    );
}

export default Home;