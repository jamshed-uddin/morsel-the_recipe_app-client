import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import React from "react";

const searchInputContent = ({ searchParams, setSearchParams }, ref) => {
  const searchInputChangeHandler = (e) => {
    const searchbarValue = e.target.value;
    // console.log(searchbarValue);

    setSearchParams({ q: searchbarValue }, { replace: true });
    if (!searchbarValue) {
      setSearchParams({}, { replace: true });
    }
  };

  // returns searched data

  // const searchByEnterHandler = (e) => {
  //   if (!searchQuery) return;
  //   if (e.key === "Enter") {
  //     console.log("searching");
  //   }
  // };

  const clearSearchbarHandler = () => {
    setSearchParams({}, { replace: true });
  };

  return (
    <div className="flex gap-1 items-center text-colorTwo w-full">
      <div className="w-full relative h-fit ">
        <input
          ref={ref}
          type="text"
          placeholder={`Search with name
          `}
          value={searchParams.get("q") || ""}
          onChange={searchInputChangeHandler}
          // onKeyDown={searchByEnterHandler}
        />
        {searchParams.get("q") ? (
          <p
            onClick={clearSearchbarHandler}
            className="cursor-pointer   bg-bgColor pr-1 pl-1 absolute top-1 right-1 "
          >
            <ClearOutlinedIcon sx={{ fontSize: 35 }} />
          </p>
        ) : null}
      </div>
      <button>
        <SearchOutlinedIcon sx={{ fontSize: 38 }} />
      </button>
    </div>
  );
};

const SearchBar = React.forwardRef(searchInputContent);

export default SearchBar;

/*
props

 data  --- data that is for filtering
 searchFor--- recipe/blog  dinamically setting recipeName/title to get title 
 setIsSearching--- a state based on this the ui changes for all data or searched data
  setSearchResult--- set the filtered result.it comes from recipe or blog page


*/
