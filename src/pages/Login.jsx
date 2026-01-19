import { useNavigate } from "react-router-dom"
import LoginForm from "../components/LoginForm"
import { login } from "../services/authService"

export default function Login() {
    const navigate = useNavigate()

    const handleLogin = async (email, password) => {
        console.log("running the handleLogin function (expect this second)")
        const userData = await login({email, password})
        console.log("here is the userData (what is returned fom login function)", userData)
        navigate("/dashboard")
    }


    return (
        <div>
            <p>Log in Page!</p>
            <LoginForm onSubmit={handleLogin} />
        </div>
    )
}