
export default function MetaContainer({ mediaDetails }: { mediaDetails: any }) {
  return (
    <div id="secondaryInfoContainer">
      <div id="secondaryInfoPosterContainer">
        <img
          className="secondaryInfoPoster"
          src={"https://image.tmdb.org/t/p/w342" + mediaDetails?.poster_path}
          alt=""
        />
      </div>
      <div id="secondaryInfo">
        <div id="metaContainer">
          {mediaDetails?.mediaType === "movie" ? (
            <>
              <div className="metaRow">
                <span className="metaRowTitle">Direction: </span>
                <span className="metaRowContent">
                  {Object.values(mediaDetails?.credits.crew)
                    .filter((item: any) => item.job === "Director")
                    .map((item: any, index: any) => (
                      <span className="metaRowContentItem" key={index}>
                        {index > 0 ? ", " : ""}
                        {item.name}
                      </span>
                    ))}
                </span>
              </div>

              <div className="metaRow">
                <span className="metaRowTitle">Production: </span>
                <span className="metaRowContent">
                  {Object.values(mediaDetails?.credits.crew)
                    .filter((item: any) => item.job === "Producer")
                    .map((item: any, index: any) => (
                      <span className="metaRowContentItem" key={index}>
                        {index > 0 ? ", " : ""}
                        {item.name}
                      </span>
                    ))}
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="metaRow">
                <span className="metaRowTitle">Creation: </span>
                <span className="metaRowContent">
                  {Object.values(mediaDetails?.created_by).map(
                    (item: any, index: any) => (
                      <span className="metaRowContentItem" key={index}>
                        {index > 0 ? ", " : ""}
                        {item.name}
                      </span>
                    )
                  )}
                </span>
              </div>

              <div className="metaRow">
                <span className="metaRowTitle">Production: </span>
                <span className="metaRowContent">
                  {Object.values(mediaDetails?.production_companies).map(
                    (item: any, index: any) => (
                      <span className="metaRowContentItem" key={index}>
                        {index > 0 ? ", " : ""}
                        {item.name}
                      </span>
                    )
                  )}
                </span>
              </div>
            </>
          )}

          {/* <div className="metaRow">
        <span className="metaRowTitle">Writing: </span>
        <span className="metaRowContent">
          {Object.values(mediaDetails?.credits.crew)
            .filter((item: any) => item.department === "Writing")
            .map((item: any, index: any) => (
              <span className="metaRowContentItem" key={index}>
                {index > 0 ? ", " : ""}
                {item.name}
              </span>
            ))}
        </span>
      </div> */}

          <div className="metaRow">
            <span className="metaRowTitle">Cast: </span>
            <span className="metaRowContent">
              {Object.values(mediaDetails?.credits.cast).map(
                (item: any, index: any) => {
                  return (
                    index < 5 && (
                      <span key={index} className="metaRowContentItem">
                        {index > 0 ? ", " : ""}
                        {item.name}
                      </span>
                    )
                  );
                }
              )}
            </span>
          </div>

          <div className="metaRow">
            <span className="metaRowTitle">Genres: </span>
            <span className="metaRowContent">
              {mediaDetails?.genres.map((item: any, index: any) => {
                return (
                  <span key={index} className="metaRowContentItem">
                    {index > 0 ? ", " : ""}
                    {item.name}
                  </span>
                );
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
