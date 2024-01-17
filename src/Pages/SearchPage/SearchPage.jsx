import { WestOutlined } from "@mui/icons-material";
import SearchBar from "../../Components/SearchBar/SearchBar";
import useDebounce from "../../hooks/useDebounce";
import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import SearchResult from "./SearchResult";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const debouncedValue = useDebounce(searchQuery, 600);

  console.log(debouncedValue);

  const {
    isLoading: searchResultLoading,
    data: searchResult,
    error: searchError,
    status,
  } = useQuery(
    ["searchResult", debouncedValue],
    async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_BASEURL}/search?q=${debouncedValue}`
      );
      return result.data;
    },
    { enabled: !!debouncedValue }
  );

  console.log("status", searchError);
  console.log(searchResultLoading);

  return (
    <div className="my-container text-colorTwo">
      {/* search bar */}
      <div className="md:w-1/2 mx-auto">
        <div className="flex items-center gap-2">
          <span onClick={() => navigate(-1)} className="cursor-pointer">
            <WestOutlined sx={{ fontSize: 30, color: "#4B5365" }} />
          </span>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
      </div>

      {/* search result */}

      {searchResultLoading && (
        <div className="text-center">
          <CircularProgress sx={{ color: "#4B5365" }} />
        </div>
      )}

      {!searchResult?.length && debouncedValue && !searchResultLoading ? (
        <div>
          <h1 className="text-center text-xl ">
            No result found for{" "}
            <span className="font-medium">{debouncedValue}</span>
          </h1>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 mt-8">
          <SearchResult data={searchResult} />
        </div>
      )}
    </div>
  );
};

export default SearchPage;
