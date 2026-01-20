import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "./context/AuthContext"

import LandingPage from "./pages/LandingPage"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import UserMainDashboard from "./pages/UserMainDashboard"

import ProtectedRoute from "./routes/ProtectedRoutes"

function App() {
  const { user, authLoading } = useAuth()

  if (authLoading) return <div>Loading...</div>

  return (
    <Routes>
      <Route path='/' element={<LandingPage /> }/>
      <Route path='/login' element={<Login /> }/>
      <Route path='/signup' element={<SignUp /> }/>

      <Route element={<ProtectedRoute />}>
        <Route path='/dashboard' element={<UserMainDashboard />}/>
      </Route>
    </Routes>
  );
}

export default App;
