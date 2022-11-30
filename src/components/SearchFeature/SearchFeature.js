import React, { useEffect, useRef, useState, useMemo } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { useLocation } from "react-router-dom";
import Tippy from "@tippyjs/react/headless";
import { useSelector, useDispatch } from "react-redux";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import className from "classnames/bind";

import { SpinIcon } from "~/components/Icons";
import searchApi from "~/api/searchApi";
import { searchBoxSelector } from "~/app/store/selector";
import SearchResult from "./SearchResult";
import { useDebounce } from "~/app/hooks";
import { formatSearchResults } from "~/app/services/services";
import { searchByKeywords } from "./searchSlice";
import styles from "./SearchFeature.module.scss";

const cx = className.bind(styles);
function SearchFeature() {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const location = useLocation();
  const isShowSearchBox = useSelector(searchBoxSelector);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isShowSearchResult, setIsShowSearchResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const debounceValue = useDebounce(searchText, 500);

  const params = useMemo(
    () => ({
      api_key: process.env.REACT_APP_API_KEY,
      language: "en-US",
      query: debounceValue,
    }),
    [debounceValue]
  );

  useEffect(() => {
    setSearchText("");
  }, [location.pathname, dispatch]);

  useEffect(() => {
    if (!searchText.trim()) {
      setSearchResults([]);
      return;
    }
    if (location.pathname === "/") {
      console.log("searching at home");
      const fetchSearchingAtHome = async () => {
        setIsLoading(true);
        setIsShowSearchResult(true);
        const response = await dispatch(searchByKeywords(params));
        setIsLoading(false);
        let searchResultAtHome = unwrapResult(response);
        searchResultAtHome = formatSearchResults(searchResultAtHome);

        setSearchResults(searchResultAtHome);
      };
      fetchSearchingAtHome();
      return;
    }

    if (location.pathname.includes("movie")) {
      console.log("searching in movie");
      const fetchSearchingInMovies = async () => {
        setIsLoading(true);
        setIsShowSearchResult(true);
        const response = await searchApi.searchByKeywordsInListMovies(params);
        setIsLoading(false);
        setSearchResults(formatSearchResults(response.results));
      };

      fetchSearchingInMovies();
      return;
    }

    if (location.pathname.includes("tv")) {
      console.log("searching in tv");
      const fetchSearchingInTvShow = async () => {
        setIsLoading(true);
        setIsShowSearchResult(true);
        const response = await searchApi.searchByKeywordsInTvShow(params);
        setIsLoading(false);
        setSearchResults(formatSearchResults(response.results));
      };

      fetchSearchingInTvShow();
      return;
    }

    async function fetchSearching() {
      setIsLoading(true);
      const response = await searchApi.searchByKeywordsInListMovies(params);
      setSearchResults(response.results);
      setIsLoading(false);
    }

    fetchSearching();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue]);

  useEffect(() => {
    if (isShowSearchBox) {
      inputRef.current.focus();
    }
  }, [isShowSearchBox]);

  useEffect(() => {
    const unsubscribe = () => setIsShowSearchResult(false);
    window.addEventListener("scroll", unsubscribe);

    return () => window.removeEventListener("scroll", unsubscribe);
  }, []);

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
    setIsShowSearchResult(true);
  };

  const handleClearSearchText = () => {
    setSearchText("");
    setSearchResults([]);
    inputRef.current.focus();
  };

  return (
    <div className={cx("wrapper", "p-fixed")}>
      <Tippy
        visible={isShowSearchResult && setSearchResults.length > 0}
        placement="bottom-start"
        interactive={true}
        onClickOutside={() => setIsShowSearchResult(false)}
        render={(attrs) => (
          <div className={cx("result-wrapper")} tabIndex="-1" {...attrs}>
            <div className={cx("result-box")}>
              {searchResults &&
                !!searchResults.length &&
                searchResults.map((result, index) => {
                  if (index > 12) {
                    return null;
                  }
                  return <SearchResult key={result.id} result={result} />;
                })}
            </div>
          </div>
        )}
      >
        <div className={cx("search-bar")}>
          <button className={cx("search-icon")}>
            <SearchOutlined />
          </button>
          <input
            ref={inputRef}
            type="text"
            spellCheck={false}
            placeholder="Search for a movie, tv show..."
            value={searchText}
            onChange={handleInputChange}
            onFocus={() => setIsShowSearchResult(true)}
          />
          {!isLoading ? (
            <button
              className={cx("close-icon")}
              onClick={handleClearSearchText}
            >
              <CloseOutlined />
            </button>
          ) : (
            <button className={cx("spin-icon")}>
              <SpinIcon className={cx("spinning")} />
            </button>
          )}
        </div>
      </Tippy>
    </div>
  );
}

export default SearchFeature;
