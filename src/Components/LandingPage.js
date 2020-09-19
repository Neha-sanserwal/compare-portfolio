import React, { useEffect, useState } from "react";
import * as Api from "./Api";
import useDebounce from "./hooks/useDebounce";
export default function (args) {
  const [user, setUser] = useState({});
  const [repoList, setRepoList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
  const List = repoList.map((repo, index) => {
    return (
      <div
        key={repo.id}
        style={{
          border: "1px solid lightgray",
          height: "100px",
          width: "1000px",
          margin: "0 auto",
        }}
        onChange={() => {
          // pushToCards(repo.id);
        }}
      >
        {repo.full_name}
      </div>
    );
  });
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
      </div>
    </div>
  );
}
