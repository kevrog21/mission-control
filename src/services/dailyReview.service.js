import { apiFetch } from "./api"

export function getDailyReviewQuestionsService() {
    return apiFetch(`/api/daily-review/userDailyReviewQuestions`)
}

export function updateDailyReviewQuestionsService(data) {
    return apiFetch(`/api/daily-review/updateUserDailyReviewQuestions`, {
    method: "PUT",
    body: JSON.stringify({ questions: data }),
  })

}

export function createDailyReviewQuestionsService(data) {

    console.log("here is data for create question", data)
    return apiFetch(`/api/daily-review/createDailyReviewQuestion`, {
        method: "POST",
        body: JSON.stringify(data)
    })
}

export function getDailyReviewResponseForDate(date) {
    const query = new URLSearchParams({ date }).toString()

    return apiFetch(`/api/daily-review/responses?${query}`)
}

export function getRecentDailyReviewsService() {
    return apiFetch(`/api/daily-review/recent`)
}

export function getDailyReviewByIdService(id) {
    return apiFetch(`/api/daily-review/responses/${id}`)
}

export function updateExistingDailyReview(id, userInput) {
    return apiFetch(`/api/daily-review/responses/${id}`, {
        method: "PUT",
        body: JSON.stringify(userInput)
    })
}

export function postDailyReviewResponse(userInput) {
    console.log("posting the daily review")
    console.log("daily review post body here:", userInput)
    
    return apiFetch(`/api/daily-review/newDailyReviewResponse`, {
        method: "POST",
        body: JSON.stringify(userInput)
    })
}