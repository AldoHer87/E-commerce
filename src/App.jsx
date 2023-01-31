import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AppNavbar from './components/AppNavbar'
import LoadingScreen from './components/LoadingScreen'
import Home from './pages/Home'
import Login from './pages/Login'
import ProductDetail from './pages/ProductDetail'
import Purchases from './pages/Purchases'

function App() {

  const isLoading = useSelector(state => state.isLoading)

  return (
    <HashRouter>
      <AppNavbar />
      {isLoading && <LoadingScreen />}
      <Container className='my-4'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/product/:id' element={<ProductDetail />} />
          <Route path='/purchases' element={<Purchases />} />
        </Routes>
      </Container>
    </HashRouter>
  )
}

export default App
