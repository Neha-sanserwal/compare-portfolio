import React, { useEffect, useState } from "react";
import * as Api from "./Api";
import useDebounce from "./hooks/useDebounce";
import "./assets/css/landing.css";
import List from "./searchSuggestion";
import Cards from "./Cards";

export default function (props) {
  const [user, setUser] = useState({});
  const [repoList, setRepoList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cards, setCards] = useState([]);
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
    Api.saveComparisons(user.login, cards);
    setCards([]);
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
          <button className="btn theme-btn" onClick={saveComparisons}>
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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <List list={repoList} handleClick={pushToCards} />
      </div>
      <div className="compare-cards">
        <Cards cards={cards} deleteCard={deleteCard} />
      </div>
      {saveBtn}
    </div>
  );
}
