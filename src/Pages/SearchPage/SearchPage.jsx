import { WestOutlined } from "@mui/icons-material";
import SearchBar from "../../Components/SearchBar/SearchBar";
import useDebounce from "../../hooks/useDebounce";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import SearchResult from "./SearchResult";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ReactHelmet from "../../Components/ReactHelmet/ReactHelmet";

const SearchPage = () => {
  const navigate = useNavigate();
  const searchBarRef = useRef(null);
  // console.log(searchQuery);
  const [searchParams, setSearchParams] = useSearchParams();

  console.log(searchParams.get("q"));

  useEffect(() => {
    const searchBar = searchBarRef.current;
    searchBar.focus();
  }, []);

  const debouncedValue = useDebounce(searchParams.get("q") || "", 700);

  console.log(debouncedValue);
  const {
    isLoading: searchResultLoading,
    data: searchResult,
    error: searchError,
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

  return (
    <div className="my-container text-colorTwo">
      <ReactHelmet title={"Search - Morsel"} />
      {/* search bar */}
      <div className="md:w-1/2 mx-auto">
        <div className="flex items-center gap-2">
          <span onClick={() => navigate(-1)} className="cursor-pointer">
            <WestOutlined sx={{ fontSize: 30, color: "#4B5365" }} />
          </span>
          <SearchBar
            ref={searchBarRef}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        </div>
      </div>

      {/* search result */}

      {searchResultLoading && (
        <div className="text-center">
          <CircularProgress sx={{ color: "#F31559" }} />
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
