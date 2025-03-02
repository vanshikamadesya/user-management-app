import Header from './components/Header'
import { Outlet } from 'react-router-dom'


const Applayout = () => {
  return (
    <div>
      <Header/>
      <Outlet/>
    </div>
  )
}

export default Applayout
