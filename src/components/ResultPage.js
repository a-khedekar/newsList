import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import '../App.css'

function ResultPage() {
    let history = useHistory();
    const { location } = history;
    const { state } = location;
    const [response, setResponse] = useState(state.data);
    const [currentPage, setCurrentPage] = useState(0);

    const getNews = (pageCount) => {

        const result = fetch(`http://content.guardianapis.com/search?api-key=test&q=${state.searchTerm}&show-fields=thumbnail,headline&show-tags=keyword&page=${pageCount
            }&page-size=10`)
            .then(data => data.json())
            .then(data => {
                console.log("search", data)
                setResponse(data)
            });
    }

    console.log("response", response)
    return (
        <div className="CentralizationNews">
            <h2 style={{ color: "#000" }}>Search Results</h2>
            {response.results.length > 0 && response.results.map((item) => {
                console.log("item", item);
                return (
                    <div className="newsContainer" key={item.id}>
                        <h3>{item.fields.headline}</h3>
                        <img className="imageCss" src={`${item.fields.thumbnail}`} />
                        <div className="newsText">

                            {item.tags.map((tag) => <span style={{ color: "#000", fontSize: "12px", fontWeight: "bold", paddingRight: "5px" }} key={tag.id}><a href={tag.webUrl}>{tag.webTitle}</a></span>)}
                        </div>
                    </div>
                )
            })}
            {/* <span
            // onClick={(e) => getNews((Number(response.currentPage) < 0 ? 0 : Number(response.currentPage)) - 10)}
            >
                Prev
            </span>
            {response.results.length > 0 && response.results.map((item, index) => {
                console.log("item", item);
                return (
                    <span style={{ color: "#000", paddingRight: "5px" }} key={item.id + "page"}>{index}</span>
                )
            })}
            <span
            // onClick={(e) => getNews(Number(response.currentPage) + 10)}
            >
                Next
            </span> */}
        </div>
    )
}

export default ResultPage;