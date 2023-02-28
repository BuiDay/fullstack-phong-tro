import React from 'react';
import {Routes, Route ,BrowserRouter} from 'react-router-dom'
import './App.css';
import { Header, Home, HomePage, Login,Register,Rental } from './pages/public';
import { path } from './utils/constant';
import Navigation from './components/Navigation/Navigation'

function App() {
  return (
    <div className="w-screen bg-primary h-screen">
    <BrowserRouter>
    <Header/>
    <Navigation/>
      <Routes>
        <Route path={path.HOME} element={<Home/>}>
          <Route path={path.HOME} element = {<HomePage/>}/>
          <Route path={path.LOGIN} element = {<Login/>}/>
          <Route path={path.REGISTER} element = {<Register/>} />
          <Route path={path.CHO_THUE_CAN_HO} element = {<Rental/>} />
          <Route path={path.CHO_THUE_MAT_BANG} element = {<Rental />} />
          <Route path={path.CHO_THUE_PHONG_TRO} element = {<Rental/>} />
          <Route path={path.NHA_CHO_THUE} element = {<Rental/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
