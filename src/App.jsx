import React from 'react'
import Navbar from './components/Navbar/Navbar'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Coin from './pages/Coin/Coin.jsx'
import Footer from './components/Navbar/Footer/Footer.jsx'
import Pricing from './pages/Pricing/Pricing.jsx'
import Features from './pages/Features/Features.jsx'
import SignUp from './pages/SignUp/SignUp.jsx'

const App = () => {
  return (
    <div className='app'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/coin' element={<Pricing/>}/>
        <Route path='/coin/:id' element={<Coin/>}/>
         <Route path="/features" element={<Features />} />
           <Route path="/signup" element={<SignUp />} />   
      </Routes>
    
      <Footer/>
    </div>
  )
}

export default App
