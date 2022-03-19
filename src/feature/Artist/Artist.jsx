import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Artist.css";
import ArtistHero from "./ArtistHero/ArtistHero";
import musicApi from "../../api/musicApi";
import { useParams } from "react-router-dom";

Artist.propTypes = {};

function Artist(props) {
  const { artistName } = useParams();

  const [data, setData] = useState();

  useEffect(() => {
    const getArtist = async () => {
      const name = artistName.split("-").join("");
      const { data } = await musicApi.getArtist(name);

      setData(data);
    };

    getArtist();
  }, [artistName]);

  return (
    <div className="artist-page">
      <div className="artist-container">
        <ArtistHero artist={data} />
      </div>
    </div>
  );
}

export default Artist;
