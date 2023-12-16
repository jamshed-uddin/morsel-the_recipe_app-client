import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const SearchBar = ({
  value,
  inputChangeFunction,
  searchFunction,
  keyPressFunction,
  clearSearchbarHandler,
}) => {
  return (
    <div className="flex gap-1 items-center text-colorTwo w-full">
      <div className="w-full relative h-fit ">
        <input
          type="text"
          placeholder="Search with name"
          value={value}
          onChange={inputChangeFunction}
          onKeyDown={keyPressFunction}
        />
        <button
          onClick={clearSearchbarHandler}
          className="border-l-[1px] border-gray-500  bg-bgColor pr-2 pl-1 absolute top-6 right-1 -translate-y-1/2"
        >
          Clear
        </button>
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
