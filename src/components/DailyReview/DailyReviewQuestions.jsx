import { useEffect, useState, useMemo } from "react"
import { getDailyReviewQuestionsService, createDailyReviewQuestionsService, updateDailyReviewQuestionsService } from "../../services/dailyReview.service"

export default function DailyReviewQuestions() {
    const [questions, setQuestions] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [newQuestion, setNewQuestion] = useState({
        label: "",
        type: "boolean",
        allowCount: false,
    })

    useEffect(() => {
        async function loadQuestions() {
            try {
                const data = await getDailyReviewQuestionsService()
                setQuestions(data.sort((a, b) => a.order - b.order))
            } catch (err) {
                console.error("Failed to load questions: ", err)
                setError("COuld not load your daily review questions.")
            } finally {
                setLoading(false)
            }
        }

        loadQuestions()
    },[])

    function toggleActive(id) {
        setQuestions(prev => 
            prev.map(q =>
                q._id === id ? { ...q, active: !q.active } : q
            )
        )
    }

    function updateOrder(updatedQuestions) {
        const normalized = updatedQuestions.map((q, i) => ({
            ...q,
            order: i + 1,
        }))

        setQuestions(normalized)
    }

    function moveQuestion(index, direction) {
        const newIndex = index + direction

        if (newIndex < 0 || newIndex >= questions.length) return

        const updated = [...questions]
        ;[updated[index], updated[newIndex]] = [updated[newIndex], updated[index]]

        updateOrder(updated)
    }

    async function handleSave(e) {
        e.preventDefault()

        try {
            const updates = questions
                .filter(q => !q.isNew)
                .map(q => ({
                    _id: q._id,
                    order: q.order,
                    active: q.active
                }))

            const newQuestionsPayload = questions
                .filter(q => q.isNew)
                .map(q => ({
                    label: q.label,
                    type: q.type,
                    allowCount: q.allowCount,
                    order: q.order
                }))

            if (updates && updates.length > 0) {
                await updateDailyReviewQuestionsService(updates)
            }

            if (newQuestionsPayload.length > 0) {
                await createDailyReviewQuestionsService(newQuestionsPayload)
            }

            console.log("saved successfully")
            const refreshed = await getDailyReviewQuestionsService()
            setQuestions(refreshed.sort((a,b) => a.order - b.order))
        } catch (err) {
            console.error("failed to save", err)
        }
    }

    const renderedQuestions = useMemo(() => {
            return questions.map((q, index) => {

                return (
                    <div key={q._id}>
                        <div>{q.label}<span> type: {q.type}</span>
                        <label>Active</label>
                        <input
                            type="checkbox"
                            checked={q.active}
                            onChange={() => toggleActive(q._id)}
                        />
                        <div onClick={() => moveQuestion(index, -1)}>↑</div>
                        <div onClick={() => moveQuestion(index, 1)}>↓</div>
                        </div>
                    </div>
                )
        })
    }, [questions])

    function handleNewQuestionChange(e) {
        const { name, value, type, checked } = e.target

        setNewQuestion(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }))
    }

    function handleAddQuestion(e) {
        e.preventDefault()

        if (!newQuestion.label.trim()) return
        
        const tempId = `temp=${Date.now()}`

        const newQ = {
            _id: tempId,              
            label: newQuestion.label,
            type: newQuestion.type,
            allowCount: newQuestion.allowCount,
            active: true,
            order: questions.length + 1,
            isNew: true              
        }

        setQuestions(prev => [...prev, newQ])

        setNewQuestion({
            label: "",
            type: "boolean",
            allowCount: false,
        })
    }

    if (loading) return <div>Loading your daily review questions...</div>
    if (error) return <div>{error}</div>

    return (
        <div className='container-center-content'>
            <div>
                <h2>Let's customize your review</h2>
                <div>current items:</div>
                <form onSubmit={handleSave}>
                    {renderedQuestions}
                    <button type="submit">Save Changes</button>
                </form>
                <div>
                    <h3>Add new Question</h3>

                    <form onSubmit={handleAddQuestion}>
                        <input
                            type="text"
                            name="label"
                            placeholder="Enter your question"
                            value={newQuestion.label}
                            onChange={handleNewQuestionChange}
                        />
                        <label>type</label>
                        <select
                            name="type"
                            value={newQuestion.type}
                            onChange={handleNewQuestionChange}
                        >
                            <option value="boolean">Yes / No</option>
                            <option value="number">Number</option>
                            <option value="text">Text</option>
                        </select>

                        <label>
                            Allow Count
                            <input
                                type="checkbox"
                                name="allowCount"
                                checked={newQuestion.allowCount}
                                onChange={handleNewQuestionChange}
                            />
                        </label>

                        <button type="submit">Add Question</button>
                    </form>
                </div>
            </div>
        </div>
    )
}