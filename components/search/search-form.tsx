"use client";

import { useEffect, useState } from "react";
import { IoClose, IoSearch } from "react-icons/io5";

interface SearchFormProps {
  search: string;
  setSearch: (search: string) => void;
  setKeyword: (keyword: string) => void;
}

const SearchForm = ({ search, setSearch, setKeyword }: SearchFormProps) => {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  useEffect(() => {
    const storedHistory = localStorage.getItem("search");
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
  }, []);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search === "") return;
    setKeyword(search);

    if (searchHistory.includes(search)) {
      setSearch("");
      return;
    }

    let newHistory: string[];
    if (searchHistory.length >= 5) {
      newHistory = [search, ...searchHistory.slice(0, 4)];
    } else {
      newHistory = [search, ...searchHistory];
    }

    setSearchHistory(newHistory);
    localStorage.setItem("search", JSON.stringify(newHistory));

    setSearch("");
  };

  const handleSearchHistoryDelete = (index: number) => {
    const newHistory = searchHistory.filter((_, i) => i !== index);
    setSearchHistory(newHistory);
    localStorage.setItem("search", JSON.stringify(newHistory));
  };

  const handleSearchHistoryClick = (keyword: string) => {
    setKeyword(keyword);
    setSearch(keyword);
  };

  // TODO: 유효성 검사

  return (
    <>
      <form
        className="flex justify-between items-center bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-2"
        onSubmit={handleSearchSubmit}
      >
        <div>
          <input
            type="text"
            placeholder="검색"
            className="bg-transparent pl-2 text-lg outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button type="submit">
          <IoSearch size={30} />
        </button>
      </form>
      <div className="flex items-center gap-2 overflow-x-scroll">
        {searchHistory.length > 0 &&
          searchHistory.map((item, index) => (
            <div
              key={index}
              className="flex w-fit justify-between items-center gap-1 px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-full cursor-pointer"
              onClick={() => handleSearchHistoryClick(item)}
            >
              <span key={index} className="text-xs whitespace-nowrap">
                {item}
              </span>
              <IoClose
                size={17}
                onClick={() => handleSearchHistoryDelete(index)}
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default SearchForm;
