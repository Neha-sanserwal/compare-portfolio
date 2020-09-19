import React, { useEffect, useState } from "react";
import * as Api from "./Api";
import useDebounce from "./hooks/useDebounce";
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

  const List = repoList.map((repo, index) => {
    return (
      <div
        key={repo.id}
        onClick={() => {
          pushToCards(repo.id);
        }}
      >
        {repo.full_name}
      </div>
    );
  });
  let Cards = cards.map((info) => (
    <div key={info.id}>
      <h3>{info.full_name}</h3>
      <img src={info.owner.avatar_url} />
      language: <div className="item">{info.language}</div>
      forks: <div className="item">{info.forks}</div>
      issues: <div className="item">{info.open_issues_count}</div>
    </div>
  ));
  return (
    <div className="page">
      <div className="banner">
        <h1>Hello, {(user && user.login) || ""} Welcome to Compare.</h1>
      </div>
      <div className="search_area">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {List}
        {Cards}
      </div>
    </div>
  );
}
