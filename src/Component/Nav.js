import React from 'react';

const Nav = () =>{
    return(
        <nav className = "navbar navbar-expand navbar-dark bg-dark">
            <div className = "container">
                <a href = "/" className = "navbar-brand">Home</a>
                <div className = "collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto">
                        <li className = "nav-item">
                        <a href="/login" className = "nav-link">Login</a>
                        </li>
                        <li className="nav-item">
                        <a href="/signup" className = "nav-link">Sign up</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
export default Nav;