import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router';
import Kanban from './views/Kanban'
import Ecommerece from './views/Ecommerece';



function App() {
  return (
    <>

      <Routes>
        <Route path="/kanban" element={<Kanban />} />
        <Route path="/ecommerce" element={<Ecommerece />} />
      </Routes>

    </>
  )
}
export default App
