import React from 'react'
import './Header.css'
import { GlobalContext } from "../../Context";

const Header = () => {
  const global = React.useContext(GlobalContext)
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
          <i className="fas fa-search" onClick={global.changeStatusModal}></i>
        </span>
      </div>      
    </div>
  )
}

export default Header