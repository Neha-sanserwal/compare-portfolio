import React, { useEffect, useState } from "react";
import * as Api from "./Api";
import useDebounce from "./hooks/useDebounce";
import "./assets/css/landing.css";
import List from "./searchSuggestion";
import Cards from "./Cards";

export default function (args) {
  const [user, setUser] = useState({});
  const [repoList, setRepoList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cards, setCards] = useState([]);
  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearch) {
      search(debouncedSearch);
      return;
    }
    setRepoList([]);
  }, [debouncedSearch]);

  useEffect(() => {
    Api.getCurrentUser().then(setUser);
  }, []);

  const search = (value) => {
    Api.getRepos(value).then((details) => {
      setRepoList(details);
    });
  };

  const pushToCards = (id) => {
    const [info] = repoList.filter((repo) => repo.id === id);
    console.log(info, id);
    if (info.id) {
      setCards((prevCards) => [...prevCards, info]);
    }
    setRepoList([]);
    setSearchTerm("");
  };

  return (
    <div className="page">
      <div className="banner"></div>
      <div className="search-area">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <List list={repoList} handleClick={pushToCards} />

        {Cards && (
          <div className="compare-cards">
            <Cards cards={cards} />
          </div>
        )}
      </div>
    </div>
  );
}
