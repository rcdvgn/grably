"use client";
import { useState, useEffect } from "react";
// const Fuse = require('fuse.js');
// import "./App.css";
import {
  getMovieSuggestions,
  getTVSuggestions,
} from "@/app/services/getSuggestions";

import Details from "@/app/_components/Details";
import Filters from "@/app/_components/Filters";
import SearchOverlay from "@/app/_components/SearchOverlay";

import { useActions } from "@/app/_contexts/ActionsContext";

function App() {
  const {
    selectedMediaMeta,
    setSelectedMediaMeta,
    isSearchOverlayVisible,
    setIsSearchOverlayVisible,
  } = useActions();

  const [selectedMediaType, setSelectedMediaType] = useState<any>(null);
  const [results, setResults] = useState<any>(null);
  const [suggestions, setSuggestions] = useState<any>(null);

  isSearchOverlayVisible ||
  (selectedMediaMeta !== null && document.body.clientWidth <= 1090)
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");

  const dataToMap = results === null ? suggestions : results;

  const handleMediaSelect = (
    selectedMediaId: number,
    selectedMediaType: any
  ) => {
    if (isSearchOverlayVisible) {
      setIsSearchOverlayVisible(false);
    }

    setSelectedMediaMeta({
      selectedMediaId,
      selectedMediaType,
    });
  };

  useEffect(() => {
    async function loadSuggestions() {
      try {
        const movieSuggestions = await getMovieSuggestions();
        const tvSuggestions = await getTVSuggestions();
        console.log([...tvSuggestions, ...movieSuggestions]);
        setSuggestions([...tvSuggestions, ...movieSuggestions]); // Define o estado com a propriedade `results`
      } catch (error) {
        console.error("Error loading suggestions:", error);
      }
    }

    loadSuggestions();
  }, []);

  return (
    <>
      <div id="mediaContainer">
        <div id="header">
          <Filters
            selectedMediaType={selectedMediaType}
            setSelectedMediaType={setSelectedMediaType}
          />

          <SearchOverlay
            results={results}
            setResults={setResults}
            handleMediaSelect={handleMediaSelect}
          />
        </div>
        <div id="mediaGrid">
          {dataToMap !== null ? (
            dataToMap.map((item: any, index: number) =>
              item.media_type === selectedMediaType ||
              selectedMediaType === null ? (
                <div
                  key={index}
                  className="mediaItem"
                  onClick={() => handleMediaSelect(item.id, item.media_type)}
                >
                  <img
                    className="itemPoster"
                    src={
                      "http://image.tmdb.org/t/p/w300_and_h450_bestv2" +
                      item.poster_path
                    }
                    alt=""
                  />
                  <div className="itemData"></div>
                </div>
              ) : (
                ""
              )
            )
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      {selectedMediaMeta !== null && (
        <Details
          selectedMediaMeta={selectedMediaMeta}
          setSelectedMediaMeta={setSelectedMediaMeta}
        />
      )}
    </>
  );
}

export default App;
