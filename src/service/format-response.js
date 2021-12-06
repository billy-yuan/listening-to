/**
 * Takes the raw response from the Spotify API and formats it for our app.
 */
class FormatResponse {
  /**
   * @param {object[]} data
   * @returns
   */
  static formatTopArtists(data) {
    if (data.length === 0) {
      return [];
    }
    return data.map((item) => ({
      id: item.id,
      name: item.name,
      spotify_url: item.external_urls?.spotify,
      genres: item.genres,
      image: item.images[0],
    }));
  }
}

module.exports = FormatResponse;
