export const getSingleGameReviews = (id) => {
    return fetch(`http://localhost:8000/gamereviews/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("gr_token")}`
        }
    })
    .then(res => res.json())
}

export const createGameReview = (review) => {
    return fetch("http://localhost:8000/gamereviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("gr_token")}`
      },
      body: JSON.stringify(review)
    })
    .then(res => res.json())
}

export const getGameReviews = (id) => {
  return fetch(`http://localhost:8000/gamereviews`, {
      headers:{
          "Authorization": `Token ${localStorage.getItem("gr_token")}`
      }
  })
  .then(res => res.json())
}