import React from "react";
import { useState, useEffect } from "react";
import "../../styles/App.css";

function Movies() {
  const [showAnime, SetShowAnime] = useState([]);

  const GetAnime = async () => {
    const temp = await fetch(
      `https://api.jikan.moe/v4/top/anime?type=movie`
    ).then((res) => res.json());

    SetShowAnime(temp.data.slice(0, 25));
  };

  useEffect(() => {
    GetAnime();
  }, []);

  return (
    <>
      {showAnime.map((anime) => (
        <a href={anime.url} target="_blank" key={anime.mal_id} rel="noreferrer">
          <img className="anime-img" src={anime.images.jpg.large_image_url} />
        </a>
      ))}
    </>
  );
}

export default Movies;
