import React from 'react';
import THDLOG from './logo.svg';
import './Header.css';

const Header = () => (
            <div className='header'>
                <div className='header-logo'>
                    <img className='thd-logo' src={ THDLOG } alt={ ' homedepot logo' } />
                </div>
                <div>
                    <p><span>HDW Crane</span><span>  | </span></p>
                </div>
            </div>
        )

export default Header;