import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import '../App.css'
import { isEmpty } from 'lodash';

function ResultPage() {
    let history = useHistory();
    const { location } = history;
    const { state } = location;
    console.log(state)
    const [pageOffset, setPageOffset] = useState(1);
    const [news, setNews] = useState(state.data);

    const handlePageChange = (event) => {
        setPageOffset(event.selected + 1);
    };

    useEffect(() => {
        fetch(`http://content.guardianapis.com/search?api-key=test&q=${state.searchTerm}&show-fields=thumbnail,headline&show-tags=keyword&page=${pageOffset}&page-size=10`)
            .then(data => data.json())
            .then((data) => {
                setNews(data.response);
            });

    }, [pageOffset]);


    return (
        <div className="CentralizationNews">
            <h2 style={{ color: "#000" }}>Search Results</h2>
            {news && news.results.map((item) => {
                // console.log("item", item);
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

            <ReactPaginate
                previousLabel="Previous"
                nextLabel="Next"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                pageCount={10}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName="pagination"
                activeClassName="active"

            />

        </div>
    )
}

export default ResultPage;