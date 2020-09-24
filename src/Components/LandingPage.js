import React, { useEffect, useState } from "react";
import * as Api from "./Api";
import useDebounce from "./hooks/useDebounce";
import "./assets/css/landing.css";
import List from "./SearchSuggestion";
import Cards from "./Cards";
import Modal from "./Modal";
import alert from "../globals/alert";

export default function (props) {
  const [repoList, setRepoList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cards, setCards] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [comparisonName, setComparisonName] = useState("No name");
  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    setCards(JSON.parse(localStorage.getItem("cards")));
  }, []);

  useEffect(() => {
    if (!debouncedSearch) {
      setRepoList([]);
      return;
    }
    Api.getRepos(debouncedSearch).then(setRepoList);
  }, [debouncedSearch]);

  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);

  const pushToCards = (id) => {
    const [info] = repoList.filter((repo) => repo.id === id);
    if (info.id) {
      setCards((prevCards) => [...prevCards, info]);
    }
    setRepoList([]);
    setSearchTerm("");
  };

  const deleteCard = (id) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  const saveComparisons = () => {
    Api.saveComparisons({ comparisonName, cards }).then(({ isSaved }) => {
      let timeOut;
      if (!isSaved) {
        props.dispatch({ type: alert.SAVE_FAILURE });
      } else {
        props.dispatch({ type: alert.SAVE_SUCCESS });
      }
      setCards([]);
      setIsVisible(false);
      timeOut = setTimeout(() => {
        props.dispatch({});
      }, 3000);
    });
  };

  const showModal = () => {
    setIsVisible(true);
  };

  const hideModal = () => {
    setIsVisible(false);
  };

  let saveBtn;
  if (cards.length) {
    saveBtn = (
      <div className="btns">
        <button
          className="btn danger-btn"
          onClick={() => {
            setCards([]);
          }}
        >
          Reset
        </button>

        {props.user.login && (
          <button className="btn theme-btn" onClick={showModal}>
            Save comparison
          </button>
        )}
      </div>
    );
  }
  return (
    <div className="page">
      <div className="search-area">
        <input
          placeholder="Search repository..."
          className="txt-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <List list={repoList} handleClick={pushToCards} />
      </div>
      <div className="compare-cards">
        <Cards cards={cards} deleteCard={deleteCard} />
      </div>
      {saveBtn}
      <Modal
        isVisible={isVisible}
        text={`Enter name of comparison`}
        onConfirm={saveComparisons}
        onCancel={hideModal}
        btnClasses={{ cancel: "btn danger-btn", ok: "btn theme-btn" }}
      >
        <input
          className="txt-input"
          value={comparisonName}
          onChange={(e) => setComparisonName(e.target.value)}
        />
      </Modal>
    </div>
  );
}
