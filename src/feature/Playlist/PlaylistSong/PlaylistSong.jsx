import React from "react";
import ChartPlayList from "../../ZingChartPage/ChartPlayList/ChartPlayList";

PlaylistSong.propTypes = {};

function PlaylistSong({ data, playlist, loading }) {
  return (
    <div className="playlist__song">
      <div className="playlist__sort-description">
        {playlist?.sortDescription && (
          <>
            <span>Lời tựa </span>
            <span className="descript">{playlist.sortDescription}</span>
          </>
        )}
      </div>
      {data && data.length > 0 ? (
        <ChartPlayList data={data} icon="true" loading={loading} />
      ) : (
        ""
      )}
    </div>
  );
}

export default PlaylistSong;
