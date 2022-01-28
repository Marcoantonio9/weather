import React, { useContext } from "react";
import './NextDays.css'
import axios from 'axios'
import { GlobalContext } from "../../Context";
// import Context from '../../Context'

const NextDays = () => {
  // const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=7cdd176038991a72ee740b15de047dca&lang=pt_br`
  // axios.get(url).then((res) => {
  //   console.log('reeeees: ', res.data)
  // })
  const global = React.useContext(GlobalContext)
  return (
    <div id="teste">
      <div className="area-cards">
        <div className="cards">
          teste
        </div>
        <div className="cards">
          teste
        </div>

        <div className="cards">
          teste
        </div>
        <div className="cards">
          teste
        </div>
      </div>
    </div>
  )
}

export default NextDays