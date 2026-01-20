import { useEffect } from "react"
import { useAuth } from "../context/AuthContext"

export default function LogOut() {
    const { logout } = useAuth()

    return (
        <div>
            <button onClick={logout}>Log Out</button>
        </div>
    )
}