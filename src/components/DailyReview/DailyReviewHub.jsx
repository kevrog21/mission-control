import { useEffect, useState } from 'react'
import { getDailyReviewResponseForDate } from '../../services/dailyReview.service'
import { useNavigate, Link } from 'react-router-dom'

import PreviousReviewCard from "./PreviousReviewCard"

export default function DailyReviewHub() {
    const [todayReview, setTodayReview] = useState(null)
    const [loading, setLoading] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        async function loadTodayReview() {
            try {
                const review = await getDailyReviewResponseForDate("today")
                setTodayReview(review)
            } catch (err) {
                console.error("failed to load daily review", err)
            } finally {
                setLoading(false)
            }
        }
        
        loadTodayReview()
    }, [])

    function handleTodayCardClick() {
        if (todayReview) {
            navigate(`/daily-review/${todayReview._id}`)
        } else {
            navigate("/daily-review/new")
        }
    }

    if (loading) {
        return <div>loading daily review...</div>
    }

    return (
        <div className='container-center-content'>
            <div>
                <Link to="/daily-review/customize">Customize Daily Review</Link>
                <PreviousReviewCard />
                <button onClick={handleTodayCardClick}>{todayReview ? "Edit today's review" : "Start today's review"}</button>
            </div>
        </div>
    )
}