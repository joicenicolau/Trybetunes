import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    idAlbum: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const data = await getMusics(id);
    this.setState({
      idAlbum: data,
    });
  }

  render() {
    const { idAlbum } = this.state;
    console.log(idAlbum);

    return (
      <div data-testid="page-album" className="flex">
        <Header />
        <div className="flex flex-col w-full h-screen">
          <div
            className="h-1/6 p-3 flex justify-center items-center"
          >
            <img
              src={ idAlbum[0]?.artworkUrl100 }
              alt={ idAlbum[0]?.collectionName }
              className="flex items-center text-right mt-16 justify-center
              w-40 h-40 rounded-3xl shadow-2xl"
            />
            <h3
              data-testid="album-name"
              className="text-center font-bold ml-4"
            >
              {idAlbum[0]?.collectionName}
            </h3>
            <h4
              data-testid="artist-name"
              className="text-left p-5 text-xs"
            >
              {idAlbum[0]?.artistName}
            </h4>
          </div>
          <br />
          <br />
          <br />
          <div className="bg-slate-100 h-screen overflow-x-scroll">
            <ul className="text-left items-center flex flex-col justify-evenly mt-5">
              {idAlbum.filter((el) => el.trackId)
                .map((el) => (
                  <li
                    key={ el.trackId }
                    className="flex w-full justify-center
                  items-center gap-5 mb-5 bg-blue-100"
                  >
                    <MusicCard
                      el={ el }
                    />
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(
    PropTypes.string,
  ),
}.isRequired;

export default Album;
