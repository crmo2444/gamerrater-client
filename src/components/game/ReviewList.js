import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getGameReviews, getSingleGameReviews } from "../managers/GameReviewManager"

export const ReviewList = ({gameId}) => {
    const [ reviews, setGameReviews ] = useState([])
    const [reviewState, setReviewState] = useState(false)
    let navigate = useNavigate()

    let array = []

    useEffect(() => {
        getGameReviews().then((data) => {
            data.map(d => {
                if(d?.game?.id === parseInt(gameId)) {
                    array.push(d)
                }
            })
            setGameReviews(array)
        })
    }, [])

    return (
        <article className="reviews">
            { reviews.length !== 0 ?  reviews.map(review => {
                return <section key={`review--${review.id}`} className="review">
                    <div className="review__review">{review.review}</div>
                    <div className="review__user">Review by {review?.player?.user?.username}</div>
                    <br></br>
                </section>
            }) : <div>No reviews yet!</div>
            }
        </article>
    )
}