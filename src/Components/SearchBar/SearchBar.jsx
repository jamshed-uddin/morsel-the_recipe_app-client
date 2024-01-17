import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const searchInputChangeHandler = (e) => {
    const searchbarValue = e.target.value;
    // console.log(searchbarValue);
    setSearchQuery(searchbarValue);
    if (!searchbarValue) {
      console.log("searching");
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
    setSearchQuery("");
  };

  return (
    <div className="flex gap-1 items-center text-colorTwo w-full">
      <div className="w-full relative h-fit ">
        <input
          type="text"
          placeholder={`Search with name
          `}
          value={searchQuery}
          onChange={searchInputChangeHandler}
          // onKeyDown={searchByEnterHandler}
        />
        {searchQuery ? (
          <p
            onClick={clearSearchbarHandler}
            className="cursor-pointer border-l-[1px] border-gray-500  bg-bgColor pr-2 pl-1 absolute top-6 right-1 -translate-y-1/2"
          >
            Clear
          </p>
        ) : null}
      </div>
      <button>
        <SearchOutlinedIcon sx={{ fontSize: 40 }} />
      </button>
    </div>
  );
};

export default SearchBar;

/*
props

 data  --- data that is for filtering
 searchFor--- recipe/blog  dinamically setting recipeName/title to get title 
 setIsSearching--- a state based on this the ui changes for all data or searched data
  setSearchResult--- set the filtered result.it comes from recipe or blog page


*/
