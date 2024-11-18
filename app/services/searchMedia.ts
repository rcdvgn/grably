export default async function multi(query: string) {
  const url = `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
    query
  )}&include_adult=false&language=en-US&page=1`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjU0MDc4NTVlZGI4MmFlZmIxYWUwN2ZjMzFkNWUxMyIsIm5iZiI6MTcyNjI4MTYzMS4zNjg4MTksInN1YiI6IjY2ZTRmNjU5ZjNkM2Y4YmZmOTZkNjEzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.psaCjJi40CgfxIJqkcZ4mlag5UxCdy4wYmB11KWbEx8",
    },
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const results = data.results.filter(
      (media: any) =>
        (media.media_type === "movie" || media.media_type === "tv") &&
        media.poster_path !== null
    );
    return results;
  } catch (err) {
    console.error("Failed to fetch movies:", err);
    throw err;
  }
}
