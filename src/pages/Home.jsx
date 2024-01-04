import "../../styles/App.css";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

import Popular from "../components/popular";
import Airing from "../components/Airing";
import Movies from "../components/Movies";
import Upcoming from "../components/Upcoming";

function Home() {
  const [userInput, setUserInput] = useState("");
  const [animeData, setAnimeData] = useState([]);
  const [homeState, setHomeState] = useState(<Popular />);

  const handleSubmit = (e) => {
    e.preventDefault();

    const fetchData = async () => {
      const result = await fetch(
        `https://api.jikan.moe/v4/anime?q=${userInput}&order_by=popularity&sort=asc`
      );
      const jsonResult = await result.json();
      setAnimeData(jsonResult.data.slice(0, 25));
    };

    fetchData();
    setHomeState(<Search />);
  };

  const setMovies = () => {
    setHomeState(<Movies />);
  };
  const setPopular = () => {
    setHomeState(<Popular />);
  };
  const setAiring = () => {
    setHomeState(<Airing />);
  };
  const setUpcoming = () => {
    setHomeState(<Upcoming />);
  };

  function Search() {
    return (
      <>
        {animeData.map((anime) => (
          <a
            className="anime-link"
            href={anime.url}
            target="_blank"
            key={anime.mal_id}
            rel="noreferrer"
          >
            <img className="anime-img" src={anime.images.jpg.large_image_url} />
          </a>
        ))}
      </>
    );
  }

  return (
    <>
      <div className="home-container">
        <img className="home-logo" src="../Animixx.png" />

        <div className="search-container">
          <form method="post" onSubmit={handleSubmit} id="search">
            <label>
              <input
                type="text"
                id="site-search"
                size="10px"
                placeholder="Search Anime"
                onChange={(e) => setUserInput(e.target.value)}
              />
            </label>
            <button className="search-button" type="submit">
              <FaSearch />
            </button>
          </form>
        </div>

        <div className="button-container">
          <button className="button" onClick={setPopular}>
            Most Popular
          </button>
          <button className="button" onClick={setAiring}>
            Airing
          </button>
          <button className="button" onClick={setMovies}>
            Movies
          </button>
          <button className="button" onClick={setUpcoming}>
            Upcoming
          </button>
        </div>

        <div className="anime-container">{homeState}</div>
      </div>
    </>
  );
}

export default Home;
