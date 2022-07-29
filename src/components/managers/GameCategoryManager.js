export const createGameCategory = (gameCategory) => {
    return fetch("http://localhost:8000/gamecategories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("gr_token")}`
      },
      body: JSON.stringify(gameCategory)
    })
}
