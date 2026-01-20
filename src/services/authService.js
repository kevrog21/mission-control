import { apiFetch } from "./api"

export function register(userInput) {
    return apiFetch(`/api/auth/register`, {
        method: "POST",
        body: JSON.stringify(userInput)
    })
}

export function loginService(credentials) {
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