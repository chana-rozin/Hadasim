import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate, useParams, renderMatches, Link } from 'react-router-dom'
import MembersList from './components/MembersList'
import Analysis from './components/Analysis'
import Member from './components/Member'
import MemberRegister from './components/MemberRegister'

import Vaccinations from './components/Vaccinations'
import Covid from './components/Covid'

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route index element={<Link to={"/members"}>members</Link>}></Route>
          <Route path="*" element={<h1>404 Not Found</h1>}></Route>
          <Route path='/members' element={<MembersList />}/>
          <Route path='/members/register' element={<MemberRegister/>}/>
          <Route path='/members/:id' element={<Member />}/>
          <Route path='/analysis' element={<Analysis/>}> </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
