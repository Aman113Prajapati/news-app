import React, { useEffect, useState } from 'react'
import NewsItem from '../Components/NewsItem'
import { useSearchParams } from 'react-router-dom'

export default function HomePage() {

    let [page, setPage] = useState(1)
    let [articles, setArticles] = useState([])
    let [totalResults, setTotalResults] = useState(0)
    let [loading, setLoading] = useState(false)
    let [error, setError] = useState("")

    let [q, setQ] = useState("")
    let [language, setLanguage] = useState("")
    let [searchParams] = useSearchParams()

    //  API Call
    async function getApiData(query, lang, pageNum = 1) {
        try {
            setLoading(true)
            setError("")

            let response = await fetch(
                `https://newsapi.org/v2/everything?q=${query}&pageSize=10&page=${pageNum}&language=${lang}&sortBy=publishedAt&apiKey= your Api key`
            )

            if (response.status === 429) {
                setError("Too many requests. Please wait 1 minute.")
                return
            }

            let data = await response.json()

            if (response.status === 200 && data.articles) {
                setArticles(data.articles)
                setTotalResults(data.totalResults)
            } else {
                setArticles([])
                setError("No news found")
            }

        } catch (err) {
            console.error(err)
            setError("Failed to fetch news (CORS or network issue)")
        } finally {
            setLoading(false)
        }
    }

    //  Load when search params change
    useEffect(() => {
        let query = searchParams.get("q") ?? "cricket"
        let lang = searchParams.get("language") ?? "en"

        setQ(query)
        setLanguage(lang)
        setPage(1)

        getApiData(query, lang, 1)

    }, [searchParams])

    // Next Page
    function handleNext() {
        let nextPage = page + 1
        setPage(nextPage)
        getApiData(q, language, nextPage)
    }

    // Previous Page
    function handlePrev() {
        if (page <= 1) return
        let prevPage = page - 1
        setPage(prevPage)
        getApiData(q, language, prevPage)
    }

    return (
        <div className='container-fluid my-3'>

            <h5 className='text-center p-2 bg-primary text-light'>
                {q.toUpperCase()} News (Page {page})
            </h5>

            {/*  Loader */}
            {loading && (
                <div className='text-center my-4'>
                    <div className="spinner-border"></div>
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className='text-center text-danger my-3'>
                    {error}
                </div>
            )}

            {/* News List */}
            <div className='row'>
                {
                    articles.length > 0 ? (
                        articles.map((item, index) => (
                            <NewsItem
                                key={index}
                                source={item.source?.name}
                                description={item.description || "No description"}
                                date={item.publishedAt}
                                pic={item.urlToImage || "https://via.placeholder.com/300"}
                                url={item.url}
                            />
                        ))
                    ) : (
                        !loading && <p className='text-center'>No News Available</p>
                    )
                }
            </div>

            {/* Pagination */}
            <div className='d-flex justify-content-between my-4'>
                <button
                    className='btn btn-primary'
                    disabled={page <= 1}
                    onClick={handlePrev}
                >
                    ← Previous
                </button>

                <button
                    className='btn btn-primary'
                    disabled={page * 10 >= totalResults}
                    onClick={handleNext}
                >
                    Next →
                </button>
            </div>

        </div>
    )
}
