import { apiFetch } from "./api"

// export const register = async (data) => {
//     const res = await fetch(`${API_URL}/register`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//     })

//     if (!res.ok) {
//         throw new Error("Registration failed")
//     }

//     return res.json()
// }

export function register(userInput) {
    return apiFetch(`/api/auth/register`, {
        method: "POST",
        body: JSON.stringify(userInput)
    })
}

export function login(credentials) {
    console.log("running the login auth service (expect this third")
    console.log("login post body here:", credentials)
    return apiFetch(`/api/auth/login`, {
        method: "POST",
        body: JSON.stringify(credentials)
    })
  }

  export function getCurrentUser() {
    return apiFetch(`/api/auth/current-user`)
  }


// export const getCurrentUser = async (token) => {
//     const res = await fetch(`${API_URL}/current-user`, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     })

//     if (!res.ok) {
//         throw new Error("Unauthorized")
//     }

//     return res.json()
// }