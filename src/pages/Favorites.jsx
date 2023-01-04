import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  state = {
    loading: false,
    favoriteList: [],
  };

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const data = await getFavoriteSongs();
      this.setState({
        favoriteList: data,
        loading: false,
      });
    });
  }

  removeFavoriteList = (id) => {
    this.setState((prevState) => ({
      favoriteList: prevState.favoriteList.filter((e) => e.trackId !== id),
    }));
  };

  render() {
    const { favoriteList, loading } = this.state;
    return (
      <div>
        { loading ? <Loading /> : (
          <div data-testid="page-favorites" className="flex">
            <Header />
            <div className="flex flex-col w-full h-screen">
              <h2 className="font-bold mt-11 mb-11 text-center">Músicas Favoritas</h2>
              <ul
                className="h-screen w-full overflow-y-scroll bg-slate-100"
              >
                {favoriteList
                  .map((el) => (
                    <li
                      key={ el.trackId }
                      className="bg-blue-100 mt-5 mb-5"
                    >
                      <MusicCard
                        el={ el }
                        removeFavoriteList={ this.removeFavoriteList }
                      />
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  }
}

Favorites.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;

export default Favorites;
