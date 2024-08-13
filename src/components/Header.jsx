import React from 'react'
import { Link } from 'react-router-dom'
import ada from "../images/ada.jpg"
import noklevannDomene from "../images/noklevannDomene.jpg"

function Header() {
  return (
    <div className="header">
      <img src={ada} alt="noklevann" />
        <Link to={"/"}><h2>Nøklevann Borettslag</h2></Link>
        <img src={noklevannDomene} alt="noklevann" className='img2'/>
    </div>
  )
}

export default Header