import { useParams } from "react-router-dom";
const { useEffect, useState } = require("react");

function useFetchMoviesById() {
    const id = useParams()
    
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    useEffect(() => {
        const url = `http://localhost:8000/api/single-movie/${id.id}`
        const handleApi = async () => {
            try {
                const response = await fetch(url)
                if (!response.ok) {
                    throw new Error(`Res status: ${response.status}`)
                }
                const result = await response.json()
                setData(result)

            } catch(err) {
                console.log(err)
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        handleApi()
    },[])
    console.log(data)
    return {data, loading, error}
}

export default useFetchMoviesById