import { useState, useEffect, useRef } from "react";
import Fuse from "fuse.js";
import searchMedia from "../services/searchMedia";

import { SearchIcon, StarIcon } from "../assets/icons";

import { useActions } from "@/app/_contexts/ActionsContext";

// interface SearchBarProps {
//   setSuggestions: any;
// }

export default function SearchBar({
  results,
  setResults,
  handleMediaSelect,
}: {
  results: any;
  setResults: any;
  handleMediaSelect: any;
}) {
  const {
    searchQuery,
    setSearchQuery,
    isSearchOverlayVisible,
    setIsSearchOverlayVisible,
  } = useActions();

  const resultsContainerRef = useRef<HTMLDivElement | null>(null);
  const [focusedResult, setFocusedResult] = useState(0);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleMediaSelect(
        results[focusedResult]?.id,
        results[focusedResult]?.media_type
      );
    } else if (event.key === "ArrowDown") {
      setFocusedResult((prev) => Math.min(prev + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      setFocusedResult((prev) => Math.max(prev - 1, 0));
    }
  };

  useEffect(() => {
    async function loadResults() {
      try {
        const mediaResults = await searchMedia(searchQuery);
        const fuseOptions = {
          keys: ["title", "name"],
          threshold: 1,
          includeScore: true,
        };

        const fuse = new Fuse(mediaResults, fuseOptions);
        const results = fuse.search(searchQuery);

        const extractedResults = results.map((result: any) => result.item);
        setResults(extractedResults);
      } catch (error) {
        console.error("Error loading suggestions:", error);
      }
    }

    if (searchQuery.length) {
      if (!isSearchOverlayVisible) {
        setIsSearchOverlayVisible(true);
      }
      loadResults();
    } else {
      if (isSearchOverlayVisible) {
        setIsSearchOverlayVisible(false);
      }
      setResults(null);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (resultsContainerRef.current) {
      resultsContainerRef.current.scrollTo(0, 0);
    }

    if (focusedResult !== 0) {
      setFocusedResult(0);
    }
  }, [results]);

  return (
    <div
      id="seachContainer"
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <div
        id="seachBarContainer"
        // style={{
        //   cursor: isSearchOverlayVisible ? "auto" : "pointer !important",
        // }}
      >
        <span id="searchIconContainer">
          <SearchIcon className="inputSearchIcon" />{" "}
        </span>
        <div id="seachInputContainer">
          <input
            onKeyDown={handleKeyDown}
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery || ""} // Ensure the input always has a controlled value
            type="text"
            id="seachBarInput"
            spellCheck="false"
            autoComplete="off"
          />
          {searchQuery.length ? (
            ""
          ) : (
            <span id="searchPlaceholder">Procurar filmes e séries</span>
          )}
        </div>
      </div>

      {results !== null && isSearchOverlayVisible && (
        <div
          style={{
            borderTop:
              results !== null ? "solid 1px var(--color-dark-gray)" : "",
          }}
          ref={resultsContainerRef}
          id="searchResultsContainer"
        >
          {results.map((result: any, index: any) => {
            return (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleMediaSelect(result.id, result.media_type);
                }}
                key={index}
                className="resultContainer"
                style={{
                  backgroundColor:
                    focusedResult === index ? "var(--color-primary)" : "",
                }}
              >
                <div className="resultPosterContainer">
                  <img
                    className="resultPosterImg"
                    src={
                      "https://image.tmdb.org/t/p/w342" + result?.poster_path
                    }
                    alt=""
                  />
                </div>
                <div className="resultPrimaryInfo">
                  <div className="resultTitleContainer">
                    <span className="resultTitle">
                      {result?.media_type === "movie"
                        ? result.title
                        : result.name}
                    </span>
                    <div className="resultRatingContainer">
                      <StarIcon className="resultRatingIcon" />
                      <span className="resultRating">
                        {(result?.vote_average).toFixed(1)}
                      </span>
                    </div>
                  </div>
                  <div className="resultSecondaryInfo">
                    {result?.media_type === "movie"
                      ? result?.release_date?.split("-")[0]
                      : result?.first_air_date?.split("-")[0]}
                  </div>
                  <span className="resultOverview">{result?.overview}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
