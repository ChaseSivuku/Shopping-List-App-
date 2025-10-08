import './App.css'
import { Landing } from './pages/Landing'
import { Route, BrowserRouter as Router, Routes, Link} from 'react-router-dom'
import { Login } from './pages/Login'
import { InputField } from './components/InputField'


function App() {

  return (
    <>
    {/* <Router>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </Router> */}
    <InputField
    label='phone:'
    typeInput='text'
    icon='/icons/phone.png'
    />
    </>
  )
}

export default App
