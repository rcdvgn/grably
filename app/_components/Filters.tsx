export default function Filters({
  selectedMediaType,
  setSelectedMediaType,
}: {
  selectedMediaType: any;
  setSelectedMediaType: any;
}) {
  const handleSelectMediaType = (mediaType: string) => {
    if (selectedMediaType === mediaType) {
      setSelectedMediaType(null);
    } else {
      setSelectedMediaType(mediaType);
    }
  };

  return (
    <div id="filtersContainer">
      <div id="mediaTypeFilterWrapper">
        <div
          onClick={() => handleSelectMediaType("movie")}
          className={`mediaTypeFilterOption ${
            selectedMediaType === "movie" ? "mediaTypeFilterOptionSelected" : ""
          }`}
        >
          Movies
        </div>
        <div
          onClick={() => handleSelectMediaType("tv")}
          className={`mediaTypeFilterOption ${
            selectedMediaType === "tv" ? "mediaTypeFilterOptionSelected" : ""
          }`}
        >
          TV
        </div>
      </div>
    </div>
  );
}
