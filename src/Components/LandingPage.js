import React, { useEffect, useState } from "react";
import * as Api from "./Api";
import useDebounce from "./hooks/useDebounce";
import "./assets/css/landing.css";
import List from "./SearchSuggestion";
import Cards from "./Cards";
import Modal from "./Modal";

export default function (props) {
  const [user, setUser] = useState({});
  const [repoList, setRepoList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cards, setCards] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [comparisonName, setComparisonName] = useState("No name");
  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    Api.getCurrentUser().then(setUser);
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
    Api.saveComparisons(user.login, { comparisonName, cards }).then(() => {
      setCards([]);
      setIsVisible(false);
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

        {user.login && (
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
