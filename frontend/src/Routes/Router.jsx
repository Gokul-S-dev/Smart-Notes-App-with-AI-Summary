import  Login  from '../Pages/Login.jsx';
import Signup from '../Pages/Signup.jsx';
import Notfound from '../Pages/Notfound.jsx';
import List from '../Pages/List.jsx';
import Summary from '../Pages/Summary.jsx';
import { Route, Routes } from 'react-router-dom';


const Router = () => {
  return (
    <>
    <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>

        <Route path="/list" element={<List/>} />
        <Route path="/summary" element={<Summary/>}/>
        <Route path="*" element={<Notfound/>}/>
    </Routes>
    </>
  )
}

export default Router