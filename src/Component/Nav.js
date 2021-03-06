import React from 'react';

function logout(){
    console.log("LOGGINOUT")
    
    sessionStorage.clear()
}
const Nav = () =>{
    if(sessionStorage.getItem('token')!=null){
        console.log(sessionStorage.getItem('token'))
        return(
            <nav className = "navbar navbar-expand navbar-dark bg-dark">
                <div className = "container">
                    <a href = "/" className = "navbar-brand">{sessionStorage.getItem('username') }'s Nodeworks</a>
                    <div className = "collapse navbar-collapse">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                            <a href="/workflow" className = "nav-link">Workflows</a>
                            </li>
                            <li className="nav-item">
                            <a href="/status" className = "nav-link" onClick={logout}>Status</a>
                            </li>
                            <li className="nav-item">
                            <a href="/login" className = "nav-link" onClick={logout}>Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
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