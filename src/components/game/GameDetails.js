import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getSingleGame } from "../managers/GameManager"

export const GameDetails = () => {
    const [ game, setGame ] = useState([])
    const {gameId} = useParams()

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
    </section>
}