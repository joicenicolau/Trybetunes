import React from 'react';
import PropTypes from 'prop-types';
import { AiFillHeart } from 'react-icons/ai';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    loading: false,
    check: false,
  };

  componentDidMount() {
    this.favoriteMusic();
  }

  handleChange() {
    const { el, removeFavoriteList } = this.props;
    const { check } = this.state;
    this.setState({ loading: true }, async () => {
      if (check) {
        await addSong(el);
      } else {
        await removeSong(el);
        if (removeFavoriteList) removeFavoriteList(el.trackId);
      }
      this.setState({ loading: false });
    });
  }

  onCheckedChange = ({ target }) => {
    const { checked } = target;
    this.setState(
      { check: checked },
      this.handleChange,
    );
  };

  favoriteMusic = async () => {
    const { el } = this.props;
    const favorite = await getFavoriteSongs();
    this.setState({
      check: favorite.some((e) => e.trackName === el.trackName),
    });
  };

  render() {
    const { el } = this.props;
    const { loading, check } = this.state;

    return (
      <div className="flex ">
        {loading ? <Loading /> : (
          <div
            className="w-full m-4 p-5 flex items-center justify-center"
          >
            <h2 className="uppercase font-bold flex mr-4">{el.trackName}</h2>
            <audio data-testid="audio-component" src={ el.previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
              .
            </audio>
            <label htmlFor={ el.trackId }>
              <input
                data-testid={ `checkbox-music-${el.trackId}` }
                type="checkbox"
                id={ el.trackId }
                onChange={ this.onCheckedChange }
                checked={ check }
                className="hidden peer"
              />
              <AiFillHeart className="peer-checked:text-red-600 mx-6" />
            </label>
          </div>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;

export default MusicCard;
