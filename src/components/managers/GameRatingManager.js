export const createGameRating = (gameRating) => {
    return fetch("http://localhost:8000/gameratings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("gr_token")}`
      },
      body: JSON.stringify(gameRating)
    })
}
