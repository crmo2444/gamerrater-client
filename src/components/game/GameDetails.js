import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getSingleGame } from "../managers/GameManager"
import { createGameRating } from "../managers/GameRatingManager"
import { ReviewList } from "./ReviewList"

export const GameDetails = () => {
    const [ game, setGame ] = useState([])
    const [buttonState, setButtonState] = useState(false)
    const [rating, setRating] = useState(0)
    const [avg, setAvg] = useState(0)
    const {gameId} = useParams()
    let navigate = useNavigate()

    useEffect(() => {
        getSingleGame(gameId).then(data => setGame(data))
    }, [])

    useEffect(() => {
        getSingleGame(gameId).then(data => setAvg(data.average_rating))
    }, [buttonState])

    return <section className="game">
                <h4 className="game__title">{game.title} by {game.designer}</h4>
                <div className="game__releaseDate">Released {game.release_date}</div>
                <div className="game__description">{game.description}</div>
                <div className="game__players">{game.number_of_players} total players</div>
                <div className="game__duration">Estimated playtime: {game.duration} hours</div>
                <div className="game__ageRating">Age Rating: {game.age_rating}+</div>
                <div>User Game Rating: {avg}</div>
                {/* <button onClick={() => navigate({ pathname: `/games/${game.id} `})}>Edit</button>
                <button onClick={() => {
                    deleteGame(game.id)
                    .then(getGames().then(data => setGames(data)))}}>Delete</button> */}
                <br></br>
                <button onClick={() => navigate({ pathname: `/game/${game.id}/review `})}>Review Game</button>
                {buttonState ? <><select onChange={(event) => setRating(parseInt(event.target.value))}>
                                    <option value="0">
                                        Choose a rating...
                                    </option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                               </select>
                               <button onClick={() => {
                                setButtonState(false)
                                const gameRating = {
                                    game: parseInt(gameId),
                                    rating: rating,
                                }
                                createGameRating(gameRating)
                               }}>Submit</button></> : 
                               <button onClick={() => setButtonState(true)}>Add Game Rating</button>}
                <br></br>
                <h4>All Reviews</h4>
                <ReviewList gameId={gameId}/>
    </section>
}