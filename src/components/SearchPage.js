import React, { useState } from "react"
import { useHistory } from "react-router-dom";

function SearchPage() {
    let history = useHistory();
    const [searchTerm, setSearchTerm] = useState("");

    const getNews = () => {

        const result = fetch(`http://content.guardianapis.com/search?api-key=test&q=${searchTerm}&show-fields=thumbnail,headline&show-tags=keyword&page=10&page-size=10`)
            .then(data => data.json())
            .then(data => {
                console.log("search", data)
                history.push({
                    pathname: `/results`,
                    state: { data: data.response, searchTerm }
                })
            });
    }

    function searchHandler(e) {
        setSearchTerm(e.target.value)
    }

    return (
        <div>This is Search page
            <input type="text" onChange={searchHandler} />
            <button className="searchButton" onClick={getNews}>Search</button>
        </div>
    )
}

export default SearchPage;