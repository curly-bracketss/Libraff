import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import MainLayout from '../Layout/MainLayout'
import Section from '../components/Section'
import Details from '../components/Details'
import WishListLayout from '../Layout/WishListLayout'
import WishList from '../components/WishList'
import AdminLayout from '../Layout/AdminLayout'
import AdminPanel from '../components/AdminPanel'


function App() {

  return (
    <Routes>
      
      <Route path='/' element={<MainLayout />}>
      
        <Route index element={<Home />} />
        <Route path=':sec' element={<Section />} />
        <Route path=':sec/:cat' element={<Section />} />
        <Route path=':sec/:cat/:id' element={<Section />} />
   <Route path="/book/:idofb" element={<Details />} />


      </Route>

      <Route path='/wishlist-view' element={<WishListLayout />}>
        <Route index element={<WishList />} />
      </Route>
      <Route path='/admin-panel' element={<AdminLayout />}>
        <Route index element={<AdminPanel />} />

      </Route>
    </Routes>
  )
}

export default App