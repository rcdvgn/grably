import { useEffect, useState } from "react";
import getEpisodes from "../services/getEpisodes";

export default function EpisodesDetails({
  selectedSeason,
}: {
  selectedSeason: any;
}) {
  const [expandedIndex, setExpandedIndex] = useState<number>(-1);
  const [episodes, setEpisodes] = useState<any>(null);

  useEffect(() => {
    const handleLoadEpisodes = async (seriesId: any, seasonNumber: any) => {
      try {
        const episodes = await getEpisodes(seriesId, seasonNumber);
        console.log(episodes);
        setEpisodes(episodes.episodes);
      } catch (error) {
        console.error("Error loading episodes:", error);
      }
    };
    if (selectedSeason) {
      handleLoadEpisodes(selectedSeason.seriesId, selectedSeason.seasonNumber);
    }
  }, [selectedSeason]);

  const toggleTruncation = (index: number) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  return (
    <div id="detailsEpisodesContainer">
      {episodes &&
        episodes.map((episode: any, index: number) => {
          return (
            <div
              onClick={() => toggleTruncation(index)}
              key={index}
              className="detailsEpisodeContainer"
            >
              <div className="detailsEpisodeImgContainer">
                <img
                  src={"https://image.tmdb.org/t/p/w342" + episode.still_path}
                  alt=""
                  className="detailsEpisodeImg"
                />
              </div>
              <div className="detailsEpisodeInfoContainer">
                <div className="detailsEpisodeInfoTop">
                  <span className="detailsEpisodeTitle">
                    {index + 1 + ". " + episode.name}
                  </span>
                  <span className="detailsEpisodeRuntime">
                    {episode.runtime + " min"}
                  </span>
                </div>
                <div
                  className="detailsEpisodeInfoOverview"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: expandedIndex === index ? "unset" : 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {episode.overview}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
