import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Define the active style
  const activeStyle = {
    borderBottom: "2px solid white",
    // You can add more styles as needed
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleMenu();
    }
  };

  return (
    <div className='nav'>
      <div className="menu-icon"
      onClick={toggleMenu} 
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-expanded={isMenuOpen}
      aria-label="Toggle menu">
      <div className="bar"/>
      <div className="bar"/>
      <div className="bar"/>
    </div>
    <ul className={isMenuOpen ? 'show' : ''}>
            <li>
              <NavLink to="/" style={({ isActive }) => 
                isActive ? activeStyle : undefined
              } onClick={toggleMenu}>HJEM</NavLink>
            </li>
            <li>
              <NavLink to="/bygg" style={({ isActive }) => 
                isActive ? activeStyle : undefined
              } onClick={toggleMenu}>BYGG</NavLink>
            </li>
            <li>
              <NavLink to="/uteomraader" style={({ isActive }) => 
                isActive ? activeStyle : undefined
              } onClick={toggleMenu}>UTEOMRÅDER</NavLink>
            </li>
            <li>
              <NavLink to="/regler" style={({ isActive }) => 
                isActive ? activeStyle : undefined
              } onClick={toggleMenu}>REGLER</NavLink>
            </li>
            <li>
              <NavLink to="/rapporter" style={({ isActive }) => 
                isActive ? activeStyle : undefined
              } onClick={toggleMenu}>RAPPORTER</NavLink>
            </li>
            <li>
              <NavLink to="/praktisk" style={({ isActive }) => 
                isActive ? activeStyle : undefined
              } onClick={toggleMenu}>PRAKTISK</NavLink>
            </li>
            <li>
              <NavLink to="/nokkelen" style={({ isActive }) => 
                isActive ? activeStyle : undefined
              } onClick={toggleMenu}>NØKKELEN</NavLink>
            </li>
            <li>
              <NavLink to="/soknader" style={({ isActive }) => 
                isActive ? activeStyle : undefined
              } onClick={toggleMenu}>SØKNADER</NavLink>
            </li>
        </ul>
    </div>
  )
}

export default Nav;
