import { Outlet } from 'react-router'
import './App.css'


function App() {
  return <div className='container mx-auto max-w-[1200px] h-screen'>
    <Outlet />
  </div>
}

export default App
