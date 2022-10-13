import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

import Loader from "../Components/Loader";
import imgHeader from "../assets/bbu.png";

const QuotePage = () => {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const [quoteText, setQuoteText] = useState([]);
  const [loading, setLoading] = useState(true);
  const url = "https://www.breakingbadapi.com/api/quote/random";

  useEffect(() => {
    getQuote();
  }, []);

  const getQuote = () => {
    setLoading(true);

    axios.get(url, {}).then((res) => {
      setQuoteText(res.data);
      setLoading(false);
    });
  };

  const handleClick = () => {
    getQuote();
  };

  return (
    <>
      <main>
        <header>
          <div className="head-content">
            <a
              href="https://www.breakingbadapi.com/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={imgHeader} alt="header" />
            </a>
            <nav ref={navRef}>
              <Link to="/">
                <h1>Breaking Bad</h1>
              </Link>
              <Link to="/better+call+saul">
                <h1>Better Call Saul</h1>
              </Link>
              <Link to="/quote">
                <h1>Quote</h1>
              </Link>
              <div id="nav-btn">
                <FontAwesomeIcon
                  icon={faXmark}
                  id="nav-close-btn"
                  onClick={showNavbar}
                />
              </div>
            </nav>
            <FontAwesomeIcon icon={faBars} id="nav-btn" onClick={showNavbar} />
          </div>
        </header>
        <div className="container">
          {loading ? (
            <Loader />
          ) : (
            quoteText.map((q) => {
              return (
                <>
                  <div className="gen-quote">
                    <div className="gen-data">
                      <p className="gen-id">#{q.quote_id}</p>
                      <p className="gen-text">{q.quote}</p>
                      <p className="gen-author">-{q.author}</p>
                    </div>
                    <button type="button" onClick={handleClick}>
                      Generate New Quote
                    </button>
                  </div>
                </>
              );
            })
          )}
        </div>
      </main>
    </>
  );
};

export default QuotePage;
