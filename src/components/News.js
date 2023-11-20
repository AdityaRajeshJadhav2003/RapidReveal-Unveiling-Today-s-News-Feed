import React, { useState, useEffect } from "react";
import Newsupdate from "./Newsupdate";
// import Spinner from "./Spinner"; // You can remove this import if Spinner is no longer used
import PropTypes from "prop-types";

const News = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);

  const updateNews = async () => {
    const url = `https://newsapi.org/v2/top-headlines?&language=en&category=${category}&apiKey=65f7ce42ada1408eb38014cb76d6d72f&page=${page}&pageSize=12`;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok && data.status === "ok") {
        setArticles((prevArticles) => [...prevArticles, ...data.articles]);
        setTotalResults(data.totalResults);
      } else {
        console.error("Error fetching news");
        setError("Error fetching news");
      }
    } catch (error) {
      console.error("Error fetching news", error);
      setError("Error fetching news");
    }

    setLoading(false);
  };

  useEffect(() => {
    updateNews();
  }, [page]); // Trigger updateNews when the page changes

  const handlePageChange = (direction) => {
    setPage((prevPage) => (direction === "next" ? prevPage + 1 : prevPage - 1));
  };

  const handleScroll = () => {
    // Check if the user has scrolled to the bottom of the page
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      // Check if there are more articles to load
      if (articles.length < totalResults) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [articles, totalResults]);

  return (
    <div>
      <div className="container my-3">
        <br />
        <h2 className="text-center text-bg-success">TOP HEADLINES</h2>
        {/* Replace loading and error checks with appropriate logic */}
        {/* {loading && <Spinner />} */}
        {error && <p className="text-danger">{error}</p>}
        <br />
        <div className="row">
          {articles.map((element) => (
            <div className="col-md-4" key={element.url}>
              <Newsupdate
                author={element.author}
                date={
                  element.publishedAt ? element.publishedAt.slice(0, 10) : ""
                }
                title={element.title}
                newsUrl={element.url}
                description={element.description}
                imageUrl={element.urlToImage}
              />
            </div>
          ))}
        </div>
        {/* {loading && <Spinner />} */}
        <div className="container d-flex justify-content-between">
          <button
            disabled={page <= 1}
            type="button"
            className="btn btn-outline-warning btn-lg"
            onClick={() => handlePageChange("prev")}
          >
            PREVIOUS
          </button>

          {/* Render the "next" button only if there are more articles to load */}
          {articles.length < totalResults && (
            <button
              type="button"
              className="btn btn-outline-success btn-lg"
              onClick={() => handlePageChange("next")}
            >
              NEXT
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

News.propTypes = {
  category: PropTypes.string,
};

export default News;
