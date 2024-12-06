// điều phối api

//movies
export const callAllMovie = async () => {
    const response = await fetch("http://localhost:8000/api/movies")
    return await response.json()
}


export const callMovieById = async ( id ) => {
    const response = await fetch(`http://localhost:8000/api/single-movie/${id}`)
    return await response.json()
}