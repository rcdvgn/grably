import { StarIcon } from "../assets/icons";
import { useActions } from "@/app/_contexts/ActionsContext";

export default function SeasonsDetails({
  setSelectedSeason,
  mediaDetails,
}: {
  setSelectedSeason: any;
  mediaDetails: any;
}) {
  const { selectedMediaMeta } = useActions();

  return (
    <div id="seasonsDetailsContainer">
      {mediaDetails?.seasons.map((item: any, index: any) => {
        return (
          <div
            onClick={() =>
              setSelectedSeason({
                seriesId: selectedMediaMeta.selectedMediaId,
                seasonNumber: mediaDetails?.seasons[index].season_number,
              })
            }
            key={index}
            className="selectedMediaSeasonContainer"
          >
            <div className="selectedMediaSeasonPosterContainer">
              <img
                src={"https://image.tmdb.org/t/p/w185" + item?.poster_path}
                alt=""
                className="selectedMediaSeasonPosterImg"
              />
            </div>

            <div className="selectedMediaSeasonDataContainer">
              <div className="selectedMediaSeasonDataPrimaryInfo">
                <div className="selectedMediaSeasonDataPrimaryNameDate">
                  <span className="selectedMediaSeasonDataPrimaryInfoName">
                    {item?.name}
                  </span>
                  <span className="selectedMediaSeasonDataPrimaryInfoDate">
                    {item?.air_date ? ` (${item.air_date.split("-")[0]})` : ""}
                  </span>
                </div>
                <div className="selectedMediaSeasonDataPrimaryInfoRating">
                  {item?.vote_average !== 0 ? (
                    <>
                      <StarIcon className="selectedMediaSeasonDataPrimaryInfoRatingIcon" />
                      <span className="selectedMediaSeasonDataPrimaryInfoRatingText">
                        {item?.vote_average}
                      </span>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="selectedMediaSeasonDataEpisodeNumber">
                {item?.episode_count + " episodes"}
              </div>
              <div className="selectedMediaSeasonDataOverview">
                {item?.overview}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
