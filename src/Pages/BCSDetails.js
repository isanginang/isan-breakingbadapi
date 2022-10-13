import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeftLong,
  faBars,
  faXmark,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

import Loader from "../Components/Loader";
import bgImage from "../assets/bettercallsaul.png";
import imgHeader from "../assets/bbu.png";

const BCSDetails = () => {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const { id } = useParams();
  const [characterDetails, setCharacterDetails] = useState();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const getCharacter = async (id) => {
    const details = await getCharaData(id);
    setCharacterDetails(details.data);
    setLoading(false);
  };

  const getCharaData = async (id) => {
    const res = await axios.get(
      `https://www.breakingbadapi.com/api/characters/${id}`
    );
    return res;
  };

  useEffect(() => {
    getCharacter(id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
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
      {loading ? (
        <Loader />
      ) : (
        characterDetails.map((d) => {
          return (
            <>
              <div className="container">
                <img src={bgImage} alt="" className="bg-detail" />
                <button className="back-btn" onClick={() => navigate(-1)}>
                  <FontAwesomeIcon icon={faLeftLong} />
                </button>
                <div className="chara-content">
                  <div className="chara-left">
                    <p className="chara-name">{d.name}</p>
                    <p className="chara-nick">
                      <i>{d.nickname}</i>
                    </p>
                    <div className="chara-birthday">
                      Birthday: <p className="birthday">{d.birthday}</p>
                    </div>
                    <div className="chara-occ">
                      Occupation:
                      {d.occupation.map((o) => {
                        return <p className="occupation">{o}</p>;
                      })}
                    </div>
                    <div className="chara-status">
                      Status: <p className="status">{d.status}</p>
                    </div>
                    <div className="chara-app">
                      Better Call Saul Season Appearance:{" "}
                      <p className="appearance">
                        {d.better_call_saul_appearance.map((a) => {
                          return a + " ";
                        })}
                      </p>
                    </div>
                    <div className="chara-portrayed">
                      Portrayed By:{" "}
                      <a
                        href={`https://www.google.com/search?q=${d.portrayed}`}
                        rel="noreferrer"
                        target="_blank"
                      >
                        <p className="portrayed">
                          {d.portrayed}{" "}
                          <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            id="search-name"
                          />
                        </p>
                      </a>
                    </div>
                  </div>
                  <div className="chara-img">
                    <img src={d.img} alt="character" />
                  </div>
                </div>
              </div>
            </>
          );
        })
      )}
    </>
  );
};

export default BCSDetails;
