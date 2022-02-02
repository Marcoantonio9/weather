/* eslint-disable */
import React, { useContext } from "react";
import './NextDays.css'
import axios from 'axios'
import { GlobalContext } from "../../Context";

const NextDays = () => {

  const global = React.useContext(GlobalContext)
  //const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${global.lat}&lon=${global.lon}&appid=7cdd176038991a72ee740b15de047dca&lang=pt_br`
  // const [arrNextDays, setArrNextDays] = React.useState([])  
  const urlTeste = `https://api.openweathermap.org/data/2.5/onecall?lat=${global.lat}&lon=${global.lon}&units=metric&exclude={part}&appid=7cdd176038991a72ee740b15de047dca&lang=pt_br`

  React.useEffect(() => {
    if (global.lon != null) {
      axios.get(urlTeste).then((res) => {
        let arr = []
        //arr.push(res.data.list[5], res.data.list[13], res.data.list[21], res.data.list[29], res.data.list[37])
        //arr.push(res.data.daily)
        let arraySemanal = []
        for(let i = 0; i < 5; i++){
          arraySemanal.push(res.data.daily[i])
        }
        arr = [...arraySemanal]
        global.setArrNextDays(...global.arrNextDays, arr)
        console.log(arr)
      })
    }
  }, [global.lon])

  return (
    <div id="teste">
      {global.statusModal &&
        <div className="modal">
          <div className="close">
            <span>
              <i className="far fa-window-close" onClick={global.changeStatusModal}></i>
            </span>
          </div>
          <div className="inputs">
            <input type="text" placeholder="Digite o nome da cidade.." onChange={global.handleCity}/>
            <button onClick={global.searchCity}>Pesquisar</button>
          </div>
        </div>
      }


      <div className="area-cards">
        {global.arrNextDays.length > 0 && global.arrNextDays.map((item, i) => (
          <div className="cards" key={i}>
            <p className="data-title">{new Date(item.dt * 1000).toLocaleString().substr(0, 10)}</p>
            <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt="" />
            <h2>{(item.temp.day).toFixed(0)} °C</h2>
            <h3 className="data-title">{item.weather[0].description}</h3> 

            <div className="min_max">
              <p>
                Min: {(item.temp.min).toFixed(0)} °C
              </p>

              <p>
                Max: {(item.temp.max).toFixed(0)} °C
              </p>              
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NextDays