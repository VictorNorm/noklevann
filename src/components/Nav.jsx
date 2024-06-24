import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav() {
  // Define the active style
  const activeStyle = {
    borderBottom: "2px solid white",
    // You can add more styles as needed
  };

  return (
    <div className='nav'>
        <ul>
            <li>
              <NavLink to="/" style={({ isActive }) => 
                isActive ? activeStyle : undefined
              }>HJEM</NavLink>
            </li>
            <li>
              <NavLink to="/bygg" style={({ isActive }) => 
                isActive ? activeStyle : undefined
              }>BYGG</NavLink>
            </li>
            <li>
              <NavLink to="/uteomraader" style={({ isActive }) => 
                isActive ? activeStyle : undefined
              }>UTEOMRÅDER</NavLink>
            </li>
            <li>
              <NavLink to="/regler" style={({ isActive }) => 
                isActive ? activeStyle : undefined
              }>REGLER</NavLink>
            </li>
            <li>
              <NavLink to="/rapporter" style={({ isActive }) => 
                isActive ? activeStyle : undefined
              }>RAPPORTER</NavLink>
            </li>
            <li>
              <NavLink to="/praktisk" style={({ isActive }) => 
                isActive ? activeStyle : undefined
              }>PRAKTISK</NavLink>
            </li>
            <li>
              <NavLink to="/nokkelen" style={({ isActive }) => 
                isActive ? activeStyle : undefined
              }>NØKKELEN</NavLink>
            </li>
            <li>
              <NavLink to="/soknader" style={({ isActive }) => 
                isActive ? activeStyle : undefined
              }>SØKNADER</NavLink>
            </li>
        </ul>
    </div>
  )
}

export default Nav;
