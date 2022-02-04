import React from 'react'
import './App.css'
import Header from './components/Header/Header'
import GetWeather from './components/getWeather/GetWeather'
import NextDays from './components/nextDays/NextDays'
import { GlobalStorage } from './Context'
import Modal from './components/modal/Modal'

const App = () => {
  console.log('teste: ', process.env.REACT_APP_KEY)
  return (
    <GlobalStorage>
      <div>
        <Header />
        <GetWeather />
        <NextDays />
        <Modal />
      </div>
    </GlobalStorage>
  )
}

export default App