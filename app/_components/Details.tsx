import { useState, useEffect, useRef } from "react";
import { useExtractColors } from "react-extract-colors";
import { createGradient } from "../utils/createGradient";
import { formatRuntime } from "../utils/formatRuntime";

import getMedia from "../services/getMedia";
import { AddIcon, CloseIcon } from "../assets/icons";
import SeasonsDetails from "./SeasonsDetails";
import MetaContainer from "./MetaContainer";
import EpisodesDetails from "./EpisodesDetails";

import { useModal } from "../_contexts/ModalContext";
// import AddToListModal from "./AddToListModal";

export default function Details({
  selectedMediaMeta,
  setSelectedMediaMeta,
}: {
  selectedMediaMeta: any;
  setSelectedMediaMeta: any;
}) {
  const { setCurrentModal, setModalParams } = useModal();

  const [mediaDetails, setMediaDetails] = useState<any>(null);
  const [backdropUrl, setBackdropUrl] = useState<string>("");
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const [selectedSeason, setSelectedSeason] = useState<any>(null);

  const { dominantColor }: any = useExtractColors(backdropUrl, {
    maxColors: 1,
    format: "hsl",
    maxSize: 200,
  });

  const primaryGradientStyle = {
    background: createGradient(dominantColor, "primary"),
  };

  const secondaryGradientStyle = {
    background: createGradient(dominantColor, "secondary"),
  };

  useEffect(() => {
    // if (aboutRef.current) {
    //   aboutRef.current.style.width = selectedMediaMeta !== null ? "30vw" : "0";
    // }

    async function loadSelectedMovie(
      selectedMediaId: any,
      selectedMediaType: any
    ) {
      try {
        const result = await getMedia(selectedMediaId, selectedMediaType);
        if (result?.backdrop_path) {
          setBackdropUrl(
            "http://image.tmdb.org/t/p/w780" + result.backdrop_path
          );
        }
        console.log(result);
        setMediaDetails({ ...result, mediaType: selectedMediaType });
      } catch (error) {
        console.error("Error loading suggestions details:", error);
      }
    }

    if (selectedSeason !== null) {
      setSelectedSeason(null);
    }

    if (selectedMediaMeta !== null) {
      const { selectedMediaId, selectedMediaType } = selectedMediaMeta;
      loadSelectedMovie(selectedMediaId, selectedMediaType);
    } else {
      mediaDetails !== null ? setMediaDetails(null) : "";
    }
  }, [selectedMediaMeta]);

  const ratingsColor =
    mediaDetails?.vote_average >= 7
      ? "green"
      : mediaDetails?.vote_average >= 5
      ? "yellow"
      : "red";

  return (
    <div
      // style={{ minWidth: mediaDetails ? "500px" : "" }}
      id="aboutContainer"
      ref={aboutRef}
    >
      <div id="aboutWrapper">
        {mediaDetails && (
          <>
            <div id="backdropContainer">
              <img
                src={
                  "https://image.tmdb.org/t/p/w780" +
                  mediaDetails?.backdrop_path
                }
                alt=""
                className="backdropImg"
              />
              <div id="primaryInfo" style={secondaryGradientStyle}>
                <div id="mediaTypeContainer">
                  <span style={{ visibility: "hidden", pointerEvents: "none" }}>
                    <CloseIcon className="selectedMovieCloseIcon" />
                  </span>
                  <span id="mediatype">
                    {selectedMediaMeta?.selectedMediaType === "movie"
                      ? "MOVIE"
                      : "TV SHOW"}
                  </span>
                  <span onClick={() => setSelectedMediaMeta(null)}>
                    <CloseIcon className="selectedMovieCloseIcon" />{" "}
                  </span>
                </div>
                <div id="basicInfoContainer">
                  <div id="selectedMediaApproval">
                    <span
                      style={{ color: ratingsColor }}
                      id="selectedMediaApprovalPercentage"
                    >
                      {Math.trunc(mediaDetails?.vote_average * 10)}%
                    </span>
                    <span id="selectedMediaApprovalText">
                      {" "}
                      approval from the users
                    </span>
                  </div>

                  <div id="selectedMediaTitle">
                    {selectedMediaMeta?.selectedMediaType === "movie"
                      ? mediaDetails?.title
                      : mediaDetails?.name}

                    <span
                      onClick={() => {
                        setCurrentModal("AddToListModal");
                        setModalParams({
                          mediaId: mediaDetails?.id,
                          mediaType: selectedMediaMeta?.selectedMediaType,
                        });
                      }}
                      className="selectedMediaTitleAddIconContainer"
                    >
                      <AddIcon className="selectedMediaTitleAddIcon" />
                    </span>
                  </div>

                  <div id="selectedMediaDuration">
                    {selectedMediaMeta?.selectedMediaType === "movie"
                      ? mediaDetails?.release_date?.split("-")[0] +
                        " • " +
                        formatRuntime(mediaDetails?.runtime)
                      : mediaDetails?.first_air_date?.split("-")[0] +
                        (mediaDetails?.in_production
                          ? ` -`
                          : ` - ${mediaDetails?.last_air_date?.split("-")[0]}`)}
                  </div>
                </div>
              </div>
            </div>
            <div id="detailsBodyContainer" style={primaryGradientStyle}>
              <div id="detailsOverviewContainer">
                <span id="detailsOverview">{mediaDetails?.overview}</span>
              </div>

              <MetaContainer mediaDetails={mediaDetails} />

              {mediaDetails?.mediaType === "tv" && (
                <>
                  <div id="seasonSelectorContainer">
                    <div id="seasonsAndEpisodes">
                      <span id="seasonsAndEpisodesTitle">
                        {selectedSeason ? "Episodes" : `Seasons`}
                      </span>

                      <span id="seasonsAndEpisodesMore">
                        {selectedSeason
                          ? ``
                          : ` (${mediaDetails?.seasons.length})`}
                      </span>
                    </div>
                    <select
                      id="seasonSelector"
                      value={selectedSeason ? selectedSeason?.seasonNumber : ""}
                      onChange={(e) => {
                        const selectedSeasonNumber = e.target.value;
                        if (selectedSeasonNumber === "") {
                          setSelectedSeason(null);
                        } else {
                          setSelectedSeason({
                            seriesId: selectedMediaMeta.selectedMediaId,
                            seasonNumber: parseInt(selectedSeasonNumber),
                          });
                        }
                      }}
                    >
                      <option value="">All seasons</option>
                      {mediaDetails?.seasons?.map(
                        (season: any, index: number) => (
                          <option key={index} value={season.season_number}>
                            {season.name}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  {selectedSeason ? (
                    <EpisodesDetails selectedSeason={selectedSeason} />
                  ) : (
                    <SeasonsDetails
                      setSelectedSeason={setSelectedSeason}
                      mediaDetails={mediaDetails}
                    />
                  )}
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
