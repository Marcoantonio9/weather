import React from 'react'
import './Header.css'
import { GlobalContext } from "../../Context";

const Header = () => {
  const global = React.useContext(GlobalContext)
  return(
    <div className="header" style={{backgroundColor: global.statusTheme == true ? '#010101' : ''}}>      
      <div>
        <span className="title-header" style={{color: global.statusTheme == true ? '#f0ece2' : ''}}>Weather</span>
      </div>
      <div className="btns">
        <span>
          {global.statusTheme == false && 
            <i className="fas fa-toggle-off" onClick={global.changeStatusTheme} style={{color: global.statusTheme == true ? '#f0ece2' : ''}}></i>
          }
          {global.statusTheme == true &&
            <i className="fas fa-toggle-on" onClick={global.changeStatusTheme} style={{color: global.statusTheme == true ? '#f0ece2' : ''}}></i>
          }          
        </span>
        <span>
          <i className="fas fa-search" onClick={global.changeStatusModal} style={{color: global.statusTheme == true ? '#f0ece2' : ''}}></i>
        </span>
      </div>      
    </div>
  )
}

export default Header