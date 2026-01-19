import { useState } from 'react'

export default function LoginForm({ onSubmit }) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null) 

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("running the handleSubmit function (expect this first)")
        try {
            await onSubmit(email, password)
        } catch (err) {
            setError("Invalid credentials")
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            Here is the log in form!

            {error && <p>{error}</p>}


            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>

            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

            <button type="submit">Log In</button>

        </form>
    )
}