
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import './App.css'
import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './components/Chat';
import Home from './pages/Home';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {

  const { currentUser } = useContext(AuthContext)



  const ProtectedRoute = ({ children }) => {
    if (!currentUser || Object.keys(currentUser).length==0 ) {
     
      return <Navigate to="/login" />
    }
    return children
  }
  return (
   
      <BrowserRouter>
       <div className="w-[60%] mx-auto justify-center items-center ">
        <Routes>
          <Route path="/">
            <Route
            index 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
        </div>
      </BrowserRouter>
  
  )
}

export default App
