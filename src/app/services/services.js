export const formatData = (data) => {
  const output = data.reduce((acc, entity) => {
    acc.push({
      id: entity["id"],
      title:
        entity["title"] ||
        entity["original_title"] ||
        entity["name"] ||
        entity["original_name"],
      backdrop_path: entity["poster_path"] || entity["backdrop_path"],
      vote_average: entity["vote_average"],
      release_date: entity["release_date"] || entity["first_air_date"],
      type: entity["media_type"] || (entity["title"] ? "movie" : "tv"),
    });
    return acc;
  }, []);
  return output;
};

export const formatSearchResults = (results) => {
  const output = results.reduce((searchResult, entity) => {
    searchResult.push({
      id: entity.id,
      title:
        entity.title ||
        entity.name ||
        entity.original_title ||
        entity.original_name,
      media_type: entity.title ? "movie" : "tv",
    });
    return searchResult;
  }, []);
  return output;
};
