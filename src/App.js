import React from 'react'
import './App.css'
import Header from './components/Header/Header'
import GetWeather from './components/getWeather/GetWeather'
import NextDays from './components/nextDays/NextDays'
import { GlobalStorage } from './Context'

const App = () => {
  return (
    <GlobalStorage>
      <div>
        <Header />
        <GetWeather />
        <NextDays />
      </div>
    </GlobalStorage>
  )
}

export default App