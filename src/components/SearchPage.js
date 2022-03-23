import React, { useState } from "react"
import { useHistory } from "react-router-dom";
import '../App.css'
import _ from 'lodash';

function SearchPage() {
    let history = useHistory();
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState(false);
    const [erroText, setErrorText] = useState("")

    const getNews = () => {
        if (searchTerm !== "") {
            const result = fetch(`http://content.guardianapis.com/search?api-key=test&q=${searchTerm}&show-fields=thumbnail,headline&show-tags=keyword&page=10&page-size=10`)
                .then(data => data.json())
                .then(data => {
                    console.log("search", data)
                    if (data.response.results.length > 0) {
                        history.push({
                            pathname: `/results`,
                            state: { data: data.response, searchTerm }
                        })
                    } else {
                        setError(true)
                        setErrorText("No results found")
                    }

                });
        } else {
            setError(true)
            setErrorText("Please enter some text")
        }

    }

    function searchHandler(e) {
        setSearchTerm(e.target.value)
    }

    return (
        <div className="Centralization">
            <div className="searchContainer">
                <h2>News Lister</h2>
                <input type="text" className="searchInput" onChange={searchHandler} />
                <button className="searchButton" onClick={getNews}>Search</button>
                {error && <p className="error">{erroText}</p>}
            </div>
        </div>
    )
}

export default SearchPage;