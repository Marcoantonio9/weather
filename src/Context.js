import React from 'react';
import axios from 'axios'

export const GlobalContext = React.createContext()

export const GlobalStorage = ({ children }) => {
  const [infos, setInfos] = React.useState(null)
  const [temp, setTemp] = React.useState(null)
  const [image, setImage] = React.useState(null)
  const [descriptionForChangeImage, setDescriptionForChangeImage] = React.useState("")

  const [statusModal, setStatusModal] = React.useState(false)
  const [lat, setLat] = React.useState(null)
  const [lon, setLon] = React.useState(null)
  const [nameCity, setNameCity] = React.useState(null)

  const [arrNextDays, setArrNextDays] = React.useState([])  
  const [numberConverteCelsius, setNumberConverteCelsius] = React.useState(273.15)

  const [latSearch, setLatSearch] = React.useState(null)
  const [lonSearch, setLonSearch] = React.useState(null)

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${nameCity}&appid=7cdd176038991a72ee740b15de047dca&lang=pt_br`
  const urlNextDays = `https://api.openweathermap.org/data/2.5/forecast?q=${nameCity}&units=metric&appid=7cdd176038991a72ee740b15de047dca&lang=pt_br`
  // const urlTeste = `https://api.openweathermap.org/data/2.5/onecall?lat=${latSearch}&lon=${lonSearch}&exclude={part}&appid=7cdd176038991a72ee740b15de047dca&lang=pt_br`
  

  function changeStatusModal() {
    if (statusModal == false) {
      setStatusModal(true)
    } else if (statusModal == true) {
      setStatusModal(false)
    }
  }

  function getNavagation() {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude)
      setLon(position.coords.longitude)
    })
  }

  function handleCity(e) {
    setNameCity(e.target.value)
  }

  function searchCity() {
    if (nameCity != null) {
      setNumberConverteCelsius(0)
      axios.get(url).then((response) => {
        setInfos(response.data)
        let convertTempString = JSON.stringify(response.data.main.temp - 273.15)
        setTemp(convertTempString)             
        setDescriptionForChangeImage(response.data.weather[0].description)
        setLatSearch(response.data.coord.lat)
        setLonSearch(response.data.coord.lon)
        console.log(response.data)
      })
      .catch((error) => {
        console.log('erro aqui: ', error)
      })

      // axios.get(urlTeste).then((res) => {
      //   console.log('lat: ', latSearch)
      //   let arr = []
      //   let arraySemanal = []
      //   for(let i = 0; i < 5; i++){
      //     arraySemanal.push(res.data.daily[i])
      //   }       
      //   arr = [...arraySemanal]
      //   setArrNextDays(...global.arrNextDays, arr)         
      //   // arr.push(res.data.list[5], res.data.list[13], res.data.list[21], res.data.list[29], res.data.list[37])
      //   // setArrNextDays(arr)        
      // })
      // .catch((error) => {
      //   let arr = [
      //     {
      //       dt_txt: 'Erro',
      //       main: {
      //         temp: 0
      //       },
      //       weather: [
      //         {
      //           description: 'Erro'
      //         }
      //       ]
      //     }
      //   ]
      //   setArrNextDays(arr)
      //   console.log(error)
      // })      
    }
  }

  React.useEffect(() => {
    if(lonSearch != null){
      console.log(lonSearch)
      const urlTeste = `https://api.openweathermap.org/data/2.5/onecall?lat=${latSearch}&lon=${lonSearch}&units=metric&exclude={part}&appid=7cdd176038991a72ee740b15de047dca&lang=pt_br`
      axios.get(urlTeste).then((res) => {
        // console.log('lat: ', latSearch)
        let arr = []
        let arraySemanal = []
        for(let i = 0; i < 5; i++){
          arraySemanal.push(res.data.daily[i])
        }       
        arr = [...arraySemanal]
        setArrNextDays(arr)         
        console.log('qn: ' ,arr)
      })
      .catch((error) => {
        let arr = [
          {
            dt_txt: 'Erro',
            main: {
              temp: 0
            },
            weather: [
              {
                description: 'Erro'
              }
            ]
          }
        ]
        setArrNextDays(arr)
        console.log(error)
      })          
    }

  }, [lonSearch])

  React.useEffect(() => {
    changeImages()
    console.log(arrNextDays)
  }, [descriptionForChangeImage])

  function changeImages(){
    console.log(descriptionForChangeImage)
    if (descriptionForChangeImage == 'nublado') {
      setImage("/images/nublado2.jpg")
    } else if (descriptionForChangeImage.includes('chuva')) {
      setImage("/images/chuva.jpg")
    } else if (descriptionForChangeImage.includes('nuvens')) {
      setImage("/images/nublado2.jpg")
    } else if( descriptionForChangeImage == 'céu limpo') {
      setImage("/images/dia-limpo.jpg")
    }
  }

  return (
    <GlobalContext.Provider value={{ infos, setInfos, temp, setTemp, getNavagation, lat, lon, changeStatusModal, statusModal, searchCity, 
    handleCity, changeImages, image, setImage, descriptionForChangeImage, setDescriptionForChangeImage, arrNextDays, setArrNextDays, numberConverteCelsius }}>
      {children}
    </GlobalContext.Provider>
  )
}