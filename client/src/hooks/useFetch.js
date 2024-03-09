import { useState } from 'react'
import axios from 'axios'

const useFetch = (endpoint, method = 'GET', formData) => {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const options = {
        method: method,
        url: `${process.env.REACT_APP_BASE_URL}${endpoint}`,
        data: formData
    };

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const res = await axios.request(options)
            setData(res?.data)
            setIsLoading(false)
        } catch (error) {
            alert(error)
            setError(error)
        } finally {
            setIsLoading(false)
        }
    }

    return { data, isLoading, error, fetchData }
}

export default useFetch