import { useEffect, useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { getDailyReviewQuestionsService, postDailyReviewResponse } from '../../services/dailyReview.service'


export default function DailyReviewForm() {

    const { id } = useParams()
    const isEditMode = Boolean(id)
    const navigate = useNavigate()

    const [questions, setQuestions] = useState([])
    const [responses, setResponses] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] =  useState(null)


    useEffect(() => {
        async function loadQuestions() {
            try {
                setLoading(true)

                const questionData = await getDailyReviewQuestionsService()
                setQuestions(questionData)

                const initial = {}
                questionData.forEach((question) => {
                    if (question.type === "boolean") {
                        initial[question.key] = false
                    } else if (question.type === "number") {
                        initial[question.key] = 0
                    } else {
                        initial[question.key] = ""
                    }
                })

                setResponses(initial)

            } catch (err) {
                console.error(err)
                setError("Could not load the review form.")
            } finally {
                setLoading(false)
            }
        }

        loadQuestions()
    }, [])

    function handleChange(key, value) {
        setResponses((prev) => ({
            ...prev,
            [key]: value,
        }))
    }

    async function handleSubmit(e) {
        e.preventDefault()

        const body = {
            date: new Date().toISOString().slice(0, 10),
            responses: { ...responses }
        }

        console.log('Submitting Responses: ', body)

        try {
            await postDailyReviewResponse(body)
            navigate("/daily-review")
        } catch (err) {
            console.error("Failed to submit review", err)
        }
    }

    const renderedQuestions = useMemo(() => {
        return questions.map((q) => {
            const value = responses[q.key]

            return (
                <div key={q._id}>
                    <label htmlFor={q.key}>{q.label}</label>

                    {q.type === "boolean" && (
                        <input 
                            type="checkbox"
                            name={q.key}
                            id={q.key}
                            checked={value || false}
                            onChange={(e) => handleChange(q.key, e.target.checked)}
                        />
                    )}

                    {q.type === "number" && !q.allowCount && (
                        <input 
                            type="number"
                            id={q.key}
                            value={value ?? 0}
                            onChange={(e) => handleChange(q.key, Number(e.target.value))}
                        />
                    )}

                    {q.type === "number" && q.allowCount && (
                        <div>
                            <button type="button" onClick={() => handleChange(q.key, value + 1)}>+</button>
                            <span>{value}</span>
                            <button type="button" onClick={() => handleChange(q.key, value - 1)}>-</button>
                        </div>
                    )}

                    {q.type === "text" && (
                        <input 
                            type=''
                            id={q.key}
                            value={value || ""}
                            onChange={(e) => handleChange(q.key, e.target.value)}
                        />
                    )}

                    {q.type === "textarea" && (
                        <textarea
                            id={q.key}
                            checked={value || ""}
                            onChange={(e) => handleChange(q.key, e.target.value)}
                            rows={6}
                            className='form-textarea'
                        />
                    )}

                    
                </div>
            )
        })
    }, [questions, responses])
    
    if (loading) return <div className='container-center-content'>Loading...</div>;

    return (
        <div>
            <div className='container-center-content'>
                <form onSubmit={handleSubmit}>
                    <h2>{isEditMode ? "Edit Daily Review" : "New Daily Review"}</h2>

                    {renderedQuestions}

                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    )
}