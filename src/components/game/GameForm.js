import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { getCategories } from "../managers/CategoryManager"
import { createGameCategory } from "../managers/GameCategoryManager"
import { createGame, getGames } from "../managers/GameManager"


export const GameForm = () => {
    const navigate = useNavigate()
    const [categories, setCategories] = useState([])
    const [games, setGames] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        title: "",
        description: "",
        designer: "",
        releaseDate: "",
        numberOfPlayers: 0,
        duration: 0,
        ageRating: 0
    })

    useEffect(() => {
        // TODO: Get the game types, then set the state
        getCategories().then(data => setCategories(data))
        getGames().then(data => setGames(data))
    }, [])

    const changeGameState = (evt) => {
        // TODO: Complete the onChange function
        const copy = {...currentGame}
        copy[evt.target.name] = evt.target.value
        setCurrentGame(copy)
    }

    let categoryArray = []

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="designer">Designer: </label>
                    <input type="text" name="designer" required autoFocus className="form-control"
                        value={currentGame.designer}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentGame.description}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="releaseDate">Release Date: </label>
                    <input type="int" name="releaseDate" required autoFocus className="form-control"
                        value={currentGame.releaseDate}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of Players: </label>
                    <input type="text" name="numberOfPlayers" required autoFocus className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="duration">Duration: </label>
                    <input type="int" name="duration" required autoFocus className="form-control"
                        value={currentGame.duration}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="ageRating">Age Rating: </label>
                    <input type="int" name="ageRating" required autoFocus className="form-control"
                        value={currentGame.ageRating}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                <label htmlFor="category">Game Categories: </label>
                <br></br>
                {categories.map(category => {
                    return <><input
                    onChange={() => {
                        if(!(categoryArray.includes(category.id))) {
                            categoryArray.push(category.id)
                            console.log(categoryArray)
                        }
                        else {
                            const index = categoryArray.indexOf(category.id)
                            categoryArray.splice(index, 1)
                            console.log(categoryArray)
                        }
                    }}
                    value={category.id}
                    type="checkbox"
                    name={category.id}
                  />
                  <span>{category.name}</span></>
                })}
                </div>
            </fieldset>
            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        title: currentGame.title,
                        description: currentGame.description,
                        designer: currentGame.designer,
                        release_date: currentGame.releaseDate,
                        number_of_players: parseInt(currentGame.numberOfPlayers),
                        duration: parseInt(currentGame.duration),
                        age_rating: parseInt(currentGame.ageRating)
                    }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => {
                            categoryArray.map(category => {
                                getGames()
                                .then(data => setGames(data))
                                .then(() => {
                                    let lastGame = games.slice(-1)[0]
                                    const newGameCat = {
                                        game: ((lastGame.id) + 1),
                                        category: category
                                    }
                                    createGameCategory(newGameCat)
                                })
                            })
                        })
                        .then(() => navigate("/games"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}