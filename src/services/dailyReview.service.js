import { apiFetch } from "./api"

export function getDailyReviewQuestionsService() {
    console.log("running get daily review service")
    return apiFetch(`/api/daily-review/userDailyReviewQuestions`)
}

export function getDailyReviewResponseForDate(date) {
    const query = new URLSearchParams({ date }).toString()

    return apiFetch(`/api/daily-review/responses?${query}`)
}

export function postDailyReviewResponse(userInput) {
    console.log("posting the daily review")
    console.log("daily review post body here:", userInput)
    
    return apiFetch(`/api/daily-review/newDailyReviewResponse`, {
        method: "POST",
        body: JSON.stringify(userInput)
    })
}