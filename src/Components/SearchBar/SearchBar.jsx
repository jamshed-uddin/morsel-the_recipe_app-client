import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useState } from "react";

const SearchBar = ({ data, searchFor, setIsSearching, setSearchResult }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const searchInputChangeHandler = (e) => {
    const searchbarValue = e.target.value;
    console.log(searchbarValue);
    setSearchQuery(searchbarValue);
    if (!searchbarValue) {
      setIsSearching(false);
    }
  };

  // returns searched data
  const filterDataHandler = () => {
    const filteredData = data.filter((singleData) => {
      return singleData[searchFor === "recipe" ? "recipeName" : "title"]
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    });

    return filteredData;
  };

  const searchFunction = () => {
    if (!searchQuery) return;
    console.log("searching");
    setIsSearching(true);
    const result = filterDataHandler();
    setSearchResult(result);
  };

  const searchByEnterHandler = (e) => {
    if (e.key === "Enter") {
      setIsSearching(true);
      const result = filterDataHandler();
      setSearchResult(result);
    }
  };

  const clearSearchbarHandler = () => {
    setIsSearching(false);
    setSearchQuery("");
  };

  return (
    <div className="flex gap-1 items-center text-colorTwo w-full">
      <div className="w-full relative h-fit ">
        <input
          type="text"
          placeholder={`Search with ${
            searchFor === "recipe" ? "name" : "title"
          }`}
          value={searchQuery}
          onChange={searchInputChangeHandler}
          onKeyDown={searchByEnterHandler}
        />
        {searchQuery ? (
          <button
            onClick={clearSearchbarHandler}
            className="border-l-[1px] border-gray-500  bg-bgColor pr-2 pl-1 absolute top-6 right-1 -translate-y-1/2"
          >
            Clear
          </button>
        ) : null}
      </div>
      <button onClick={searchFunction}>
        <SearchOutlinedIcon sx={{ fontSize: 40 }} />
      </button>
    </div>
  );
};

export default SearchBar;

/*
props

 value----state input value
  inputChangeFunction---- to set the input value to state
  searchFunction--- searching filter function for search button onClick.
  keyPressFunction----- function for enter key press
  clearSearchbarHandler --- clear button function which set input value state to empty and set isSearchng to false

  by isSearcing(true/false) conditionally rendering all result and searched result



*/
