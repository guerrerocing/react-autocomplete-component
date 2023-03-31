import { useEffect, useRef, useState } from "react";

import Autocomplete from "./components/Autocomplete";
import { searchUsersByName } from "./api/client";
import { User } from "./types/User";

import "./App.css";

function App() {
  const [queryString, setQueryString] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  /**
   * Use throtling to avoid unnecessary requests to the api
   */
  const debounce = useRef<number | null>(null);
  const [debounceStr, setDebounceStr] = useState<string>("");

  useEffect(() => {
    debounce.current = window.setTimeout(() => {
      setQueryString(debounceStr);
    }, 400);

    return () => {
      if (debounce.current) {
        window.clearTimeout(debounce.current);
      }
    };
  }, [debounceStr]);

  useEffect(() => {
    if (!queryString.length) {
      return;
    }
    /**
     * Request the API to search by Name
     */
    searchUsersByName(queryString).then((users) => setUsers(users));
  }, [queryString]);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDebounceStr(e.target.value);
  };

  const onSelect = (value: string | null) => {
    setSelectedUser(value);
  };

  return (
    <div className="App">
      <div className="autocomplete-container">
        <h1>Search Contractors</h1>
        <Autocomplete
          id={"users-finder"}
          name={"users-finder"}
          items={users}
          value={debounceStr}
          onSearch={onSearch}
          placeholder="Type the name of the person ..."
          onReset={() => setDebounceStr("")}
          onSelect={onSelect}
          selected={selectedUser}
        />
      </div>
    </div>
  );
}

export default App;
