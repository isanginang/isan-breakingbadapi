import React, { useState, useEffect, useRef } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

import BCSList from "../Components/BCSList";
import imgHeader from "../assets/bbu.png";

const BCSPage = () => {
  let limit = 10;
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const [character, setCharacter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    setLoading(true);

    axios
      .get(
        `https://www.breakingbadapi.com/api/characters?category=Better+Call+Saul&offset=0&limit=${limit}`,
        {}
      )
      .then((res) => {
        setCharacter(res.data);
        setLoading(false);
        const total = 12;
        setPageCount(Math.ceil(total / limit));
      });
  }, [limit]);

  const getComments = async (offSet) => {
    await axios
      .get(
        `https://www.breakingbadapi.com/api/characters?category=Better+Call+Saul&offset=${offSet}&limit=${limit}`,
        {}
      )
      .then((res) => {
        setCharacter(res.data);
      });
  };

  const handlePageClick = async (data) => {
    let offSet = data.selected * 10;
    getComments(offSet);
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
          <div className="character-page">
            <BCSList character={character} loading={loading} />
          </div>
        </div>
        <footer>
          <ReactPaginate
            previousLabel="<"
            nextLabel=">"
            breakLabel="..."
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </footer>
      </main>
    </>
  );
};

export default BCSPage;
