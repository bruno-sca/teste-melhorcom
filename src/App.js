import React from 'react';

import Header from './components/Header';
import Routes from './routes';
import Footer from './components/Footer';

import './global.css'

function App() {
    return (
        <>
            <Header />
            <Routes />
            <Footer />
        </>
    );
}

export default App;
