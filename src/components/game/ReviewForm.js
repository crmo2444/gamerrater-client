import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { createGameReview } from "../managers/GameReviewManager"

export const ReviewForm = () => {
    const navigate = useNavigate()
    let {gameId} = useParams()

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentReview, setCurrentReview] = useState({
        game: 0,
        review: ""
    })

    const changeReviewState = (evt) => {
        // TODO: Complete the onChange function
        const copy = {...currentReview}
        copy[evt.target.name] = evt.target.value
        setCurrentReview(copy)
    }

    return (
        <form className="reviewForm">
            <h2 className="reviewForm__title">Create New Review</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="review">Review: </label>
                    <input type="text" name="review" required autoFocus className="form-control"
                        value={currentReview.review}
                        onChange={changeReviewState}
                    />
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const review = {
                       game: gameId,
                       review: currentReview.review
                    }

                    // Send POST request to your API
                    createGameReview(review)
                        .then(() => navigate(`/games/${gameId}`))
                }}
                className="btn btn-primary">Submit</button>
        </form>
    )
}