import { createContext, useContext, useEffect, useState } from 'react'
import { getCurrentUser } from '../services/authService'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [authLoading, setAuthLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem("token")

        if (!token) {
            setAuthLoading(false)
            return
        }

        getCurrentUser()
            .then((userData) => {
                setUser(userData)
            })
            .catch(() => {
                localStorage.removeItem("token")
                setUser(null)
            })
                .finally(() => {
                setAuthLoading(false)
            })

    }, [])

    const signUpAuth = (userData) => {
        localStorage.setItem("token", userData.token)
        setUser(userData.user)
    }

    const loginAuth = (userData) => {
        localStorage.setItem("token", userData.token)
        setUser(userData.user)
    }

    const logout = () => {
        localStorage.removeItem("token")
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, authLoading, loginAuth, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
  return useContext(AuthContext)
}