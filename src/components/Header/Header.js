import React from 'react'
import './Header.css'

const Header = () => {
  return(
    <div className="header">
      <div>
        <span className="title-header">Weather</span>
      </div>
      <div className="btns">
        <span>
          <i className="fas fa-toggle-off"></i>
        </span>
        <span>
          <i className="fas fa-search"></i>
        </span>
      </div>      
    </div>
  )
}

export default Header