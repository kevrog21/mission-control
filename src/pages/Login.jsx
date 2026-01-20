import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { loginService } from "../services/authService"

import LoginForm from "../components/LoginForm"

export default function Login() {
    const navigate = useNavigate()
    const { login } = useAuth()

    const handleLogin = async (email, password) => {
        console.log("running the handleLogin function (expect this second)")

        const userData = await loginService({email, password})
        console.log("here is the userData (what is returned fom login function)", userData)
        login(userData)
        navigate("/dashboard")
    }


    return (
        <div className='page'>
            <p className="test">Log in Page!</p>
            <LoginForm onSubmit={handleLogin} />
        </div>
    )
}