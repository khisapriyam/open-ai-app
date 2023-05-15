import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './component/Home/Home'

export const App = () => {
  return (
   <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home></Home>}/>
      </Routes>
    </BrowserRouter>
   </>
  )
}
export default App;
