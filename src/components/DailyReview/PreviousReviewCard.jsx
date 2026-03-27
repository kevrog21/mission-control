import { useState, useEffect, useMemo } from 'react'
import { getRecentDailyReviewsService}  from '../../services/dailyReview.service'

export default function PreviousReviewCard() {

    const [ recentDailyReviews, setRecentReviews ] = useState([])
    const [ loading, setLoading ] = useState([])


    useEffect(() => {
        async function loadReviews() {
            try {
                const data = await getRecentDailyReviewsService()
                setRecentReviews(data)
            } catch (err) {
                console.error("Failed to load recent reviews", err)
            } finally {
                setLoading(false)
            }
        }
        
        loadReviews()
   
    }, [])

    const renderedPreviousReviews = useMemo(() => {
             console.log(recentDailyReviews)
        return recentDailyReviews.map((review) => {
             return (<div key={review._id}>{review.date}</div>)
        })

    }, [recentDailyReviews])

    if (loading) return <div>Loading...</div>

    return (
        <div>
            {renderedPreviousReviews}
        </div>
    )
}