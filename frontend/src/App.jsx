import { useState } from 'react'
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import './App.css'
import List from './pages/List';
import Create from './pages/Create';
import Delete from './pages/Delete';
import Edit from './components/Edit';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<List/>}></Route>
      <Route path='/task/create' element={<Create/>}></Route>
      <Route path='/task/:id/delete' element={<Delete/>}></Route>
      <Route path='/task/:id/edit' element={<Edit/>}></Route>

    </Routes>
    </BrowserRouter>
      
          </>
  )
}

export default App
