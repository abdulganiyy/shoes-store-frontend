import React from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Footer from 'Components/Footer'
import { Routes,Route } from 'react-router-dom';
import LandingPage from 'Pages/LandingPage'
import Product from 'Pages/Product';
function App() {
  return (
    <div>
     <div  className='px-4 md:px-40'><Navbar /></div>
     <Routes>
      <Route  index element={<LandingPage />} />
      <Route  path='/product/:id' element={<Product />} />
     </Routes>
     <Footer />
    </div>
  );
}

export default App;
