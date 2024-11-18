// import React from "react";
import SearchBar from "./SearchBar";

import { useActions } from "@/app/_contexts/ActionsContext";

export default function SearchOverlay({
  results,
  setResults,
  handleMediaSelect,
}: {
  results: any;
  setResults: any;
  handleMediaSelect: any;
}) {
  const { isSearchOverlayVisible, setIsSearchOverlayVisible } = useActions();
  return (
    <div
      id={
        isSearchOverlayVisible ? "searchOverlayVisble" : "searchOverlayInvisble"
      }
      onClick={() => {
        setIsSearchOverlayVisible(false);
      }}
    >
      <SearchBar
        results={results}
        setResults={setResults}
        handleMediaSelect={handleMediaSelect}
      />
    </div>
  );
}
