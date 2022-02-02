import React from 'react'
import { GlobalContext } from "../../Context";
import './Modal.css'

const Modal = () => {
  const global = React.useContext(GlobalContext)
  
  return (
    <div>
      {global.statusModal &&
        <div className="modal">
          <div className="close">
            <span>
              <i className="far fa-window-close" onClick={global.changeStatusModal}></i>
            </span>
          </div>
          <div className="area-inputs">
            {global.statusErrorSearch == true ?
              <h3>Verifique se digitou o nome da cidade corretamente</h3>
              : ''}
            <div className="inputs">
              <input type="text" placeholder="Digite o nome da cidade.." onKeyPress={global.handleCity} onChange={global.handleCity} />
              <button onClick={global.searchCity}>Pesquisar</button>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default Modal