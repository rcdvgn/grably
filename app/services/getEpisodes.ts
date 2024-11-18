export default async function getEpisodes(seriesId: any, seasonNumber: number) {
  const url = `https://api.themoviedb.org/3/tv/${encodeURIComponent(
    seriesId
  )}/season/${encodeURIComponent(seasonNumber)}?language=en-US`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MWNjYzVhODI1YzJlM2U1NDE4MmNmMDc4MTcxNzI2ZCIsIm5iZiI6MTcyNjI3OTg3Ni45OTg5NjMsInN1YiI6IjY0ZWY4NzA3NGIwYzYzMDBlMWQzOTg3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.87QTYU235Ofy-1Am5AURzUnsgdvcPP4fZCgqb5ITy8k",
    },
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Failed to fetch episodes:", err);
    throw err;
  }
}
