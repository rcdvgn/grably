export async function getMovieSuggestions() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MWNjYzVhODI1YzJlM2U1NDE4MmNmMDc4MTcxNzI2ZCIsIm5iZiI6MTcyNjI3OTg3Ni45OTg5NjMsInN1YiI6IjY0ZWY4NzA3NGIwYzYzMDBlMWQzOTg3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.87QTYU235Ofy-1Am5AURzUnsgdvcPP4fZCgqb5ITy8k",
    },
  };

  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
      options
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const processedData = data.results
      .filter((item: any) => item.poster_path !== null)
      .map((item: any) => ({
        ...item,
        media_type: "movie",
      }));

    return processedData;
  } catch (err) {
    console.error("Failed to fetch movie suggestions:", err);
    throw err;
  }
}

export async function getTVSuggestions() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MWNjYzVhODI1YzJlM2U1NDE4MmNmMDc4MTcxNzI2ZCIsIm5iZiI6MTcyNjI3OTg3Ni45OTg5NjMsInN1YiI6IjY0ZWY4NzA3NGIwYzYzMDBlMWQzOTg3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.87QTYU235Ofy-1Am5AURzUnsgdvcPP4fZCgqb5ITy8k",
    },
  };

  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/discover/tv?include_video=false&language=en-US&page=1&sort_by=popularity.desc",
      options
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const processedData = data.results
      .filter((item: any) => item.poster_path !== null)
      .map((item: any) => ({
        ...item,
        media_type: "tv",
      }));

    return processedData;
  } catch (err) {
    console.error("Failed to fetch movie suggestions:", err);
    throw err;
  }
}
