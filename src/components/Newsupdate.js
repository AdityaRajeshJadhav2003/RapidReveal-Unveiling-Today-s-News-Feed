import React, { Component } from "react";
import "./News.css";
import PropTypes from 'prop-types';
import defaultImage from './img.jpg'; // Import the default image

class Newsupdate extends Component {
  render() {
    const { title, imageUrl, newsUrl, author, date } = this.props;

    // Ensure that the title is not undefined or null before slicing
    const truncatedTitle = title ? title.slice(0, 90) : "";

    return (
      <div className="my-3 bg-dark-subtle">
        <div className="card h-100">
          <div className="card-header bg-warning">
            <b>{author || "Author name not mentioned"}</b>
          </div>
          <img
            src={imageUrl || defaultImage} // Use defaultImage if imageUrl is not available
            className="card-img-top Newsupdate-image"
            alt="news"
            style={{ height: "250px" }}
          />
          <div className="card-body">
            <h5 className="card-title">{truncatedTitle}</h5>
            {/* <p className="card-text">{description ? description.slice(0, 80) : ""}....</p> */}
            <a
              rel="noreferrer"
              href={newsUrl}
              className="btn btn-primary"
              target="_blank"
            >
              Read More
            </a>
          </div>
          <div className="card-footer text-body-secondary bg-info-subtle fst-italic">
            Publication Date: {date}
          </div>
        </div>
      </div>
    );
  }
}

Newsupdate.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  imageUrl: PropTypes.string,
  newsUrl: PropTypes.string,
  author: PropTypes.string,
  date: PropTypes.string,
};

export default Newsupdate;
