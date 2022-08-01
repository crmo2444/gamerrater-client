import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getSingleGame } from "../managers/GameManager"
import { ReviewList } from "./ReviewList"

export const GameDetails = () => {
    const [ game, setGame ] = useState([])
    const {gameId} = useParams()
    let navigate = useNavigate()

    useEffect(() => {
        getSingleGame(gameId).then(data => setGame(data))
    }, [])

    return <section className="game">
                <h4 className="game__title">{game.title} by {game.designer}</h4>
                <div className="game__releaseDate">Released {game.release_date}</div>
                <div className="game__description">{game.description}</div>
                <div className="game__players">{game.number_of_players} total players</div>
                <div className="game__duration">Estimated playtime: {game.duration} hours</div>
                <div className="game__ageRating">Age Rating: {game.age_rating}+</div>
                {/* <button onClick={() => navigate({ pathname: `/games/${game.id} `})}>Edit</button>
                <button onClick={() => {
                    deleteGame(game.id)
                    .then(getGames().then(data => setGames(data)))}}>Delete</button> */}
                <br></br>
                <button onClick={() => navigate({ pathname: `/game/${game.id}/review `})}>Review Game</button>
                <br></br>
                <h4>All Reviews</h4>
                <ReviewList gameId={gameId}/>
    </section>
}