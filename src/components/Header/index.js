import React from 'react';

import './styles.css';
import phoneIcon from '../../assets/phone_logo.svg';

export default function Header() {
    return (
        <header>
            <h1>M</h1>
            <img src={phoneIcon} alt="icon"/>
        </header>
    );
}
