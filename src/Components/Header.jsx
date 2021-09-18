import React from 'react';
import { NavLink } from 'react-router-dom';
const Header = () => {
    return ( 
        <div className="header">
            <NavLink  to="/"  > Feeds  </NavLink>
            <NavLink  to="signup"  >    Sign Up </NavLink>
            <NavLink  to="signin"  >    Sign In </NavLink>
            <NavLink  to="profile"  >   Profile </NavLink>
        </div>
     );
}
 
export default Header;