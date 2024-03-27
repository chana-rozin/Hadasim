import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate, useParams, renderMatches } from 'react-router-dom'
import MembersList from './components/MembersList'
import Member from './components/Member'
import Vaccinations from './components/Vaccinations'
import Covid from './components/Covid'

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="404" element={<h1>404 Not Found</h1>}></Route>
          <Route path="*" element={<h1>404 Not Found</h1>}></Route>
          <Route index path='/members' element={<MembersList />}></Route>
          <Route path='/members/:id' element={<Member />}>
            <Route path='vaccinations' element={<Vaccinations />}></Route>
            <Route path='covid' element={<Covid />}></Route>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
