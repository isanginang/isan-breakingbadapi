import React from "react";
import { Link } from "react-router-dom";

import Loader from "./Loader";

const CharaList = ({ character, loading }) => {
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        character.map((data) => {
          return (
            <>
              <Link to={`/character/${data.char_id}`}>
                <div className="character-list" key={data.char_id}>
                  <h3>{data.name}</h3>
                  <h3>#{data.char_id}</h3>
                </div>
              </Link>
            </>
          );
        })
      )}
    </>
  );
};

export default CharaList;
