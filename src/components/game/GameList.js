import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getGames } from "../managers/GameManager"

export const GameList = (props) => {
    const [ games, setGames ] = useState([])
    let navigate = useNavigate()

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    return (
        <article className="games">
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    navigate({ pathname: "/games/new" })
                }}
            >Register New Game</button>
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <Link to={`/games/${game.id}`}>
                        <h4 className="game__title">{game.title}</h4>
                        </Link>
                    </section>
                })
            }
        </article>
    )
}