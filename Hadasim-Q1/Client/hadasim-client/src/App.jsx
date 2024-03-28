import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import MembersList from './components/MembersList'
import Analysis from './components/Analysis'
import Member from './components/Member'
import MemberRegister from './components/MemberRegister'

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route index element={<><div><Link to={"/members"}>members</Link></div>
          <Link to={"/analysis"}>analysis</Link></>}></Route>
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
