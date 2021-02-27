import React, { useState, useEffect } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

import { Nav } from "./styled";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  let pageNumber =
    Number(
      window.location.pathname.split("/")[window.location.pathname.split("/").length-1]
    ) || 1;
  const lastPage = Math.ceil(totalPosts / postsPerPage);
  const [inputNumber, setInputNumber] = useState(1);

  const prev = (pageNumber) => {
    if (pageNumber > 1) {
      paginate(pageNumber - 1);
    }
  };

  const next = (pageNumber) => {
    if (!pageNumber) {
      paginate(2);
    } else {
      paginate(pageNumber + 1);
    }
  };

  useEffect(() => {
    setInputNumber(pageNumber);
    if (!pageNumber) {
      setInputNumber(1);
    }
  }, [pageNumber]);

  return (
    <Nav>
      <div className="info">
        {pageNumber > 1 && (
          <div className="arrow">
            <FaArrowAltCircleLeft onClick={() => prev(pageNumber)} />
          </div>
        )}
        <div className="main">
          <p>Página</p>
          <input
            type="number"
            min="1"
            max={lastPage}
            value={inputNumber}
            onChange={(e) => setInputNumber(e.target.value)}
          />
          <p>de {lastPage}</p>
          <button onClick={() => paginate(inputNumber)}>Ir</button>
        </div>
        {pageNumber < lastPage && (
          <div className="arrow">
            <FaArrowAltCircleRight onClick={() => next(pageNumber)} />
          </div>
        )}
      </div>
    </Nav>
  );
};

export default Pagination;
