import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    inputName: '',
    name: '', //
    disabled: true,
    loading: false,
    albunsRetornados: [],
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validatedFields);
  };

  validatedFields = () => {
    const { inputName } = this.state;
    const dois = 2;
    const fields = inputName.length >= dois;

    this.setState({
      disabled: !(fields),
    });
  };

  handleClick = async () => {
    const { inputName } = this.state;
    this.setState(
      { loading: true, name: inputName },
    );
    const data = await searchAlbumsAPI(inputName);
    this.setState({
      loading: false,
      albunsRetornados: data,
      inputName: '',
    });
  };

  render() {
    const { inputName, name, disabled, loading, albunsRetornados } = this.state;

    return (
      <div data-testid="page-search" className="flex">
        <Header />
        <div
          className="flex flex-col w-full h-screen"
        >
          <section
            className="h-1/6
          border-b-2 border-b-white p-3 flex justify-center items-center"
          >
            <form className="flex">
              {loading ? <Loading /> : (
                <>
                  <input
                    name="inputName"
                    type="text"
                    value={ inputName }
                    data-testid="search-artist-input"
                    placeholder="Nome do artista"
                    onChange={ this.handleChange }
                    className="pl-4 p-3 h-10 w-full rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={ this.handleClick }
                    data-testid="search-artist-button"
                    disabled={ disabled }
                    className="w-400 h-10 mt-400 ml-440 rounded-2xl p-2
                   text-white w-max bg-sky-300"
                  >
                    pesquisar
                  </button>
                </>
              )}
            </form>
          </section>
          <div className="bg-slate-100 h-screen overflow-x-scroll">
            { albunsRetornados && (albunsRetornados.length !== 0 ? (
              <>
                <h3
                  className="flex justify-center text-center text-blue mt-10"
                >
                  { `Resultado de álbuns de: ${name}` }
                </h3>
                <div className="grid gap-4 grid-cols-6">
                  { albunsRetornados.map((el) => (
                    <Link
                      key={ el.collectionId }
                      data-testid={ `link-to-album-${el.collectionId}` }
                      to={ `/album/${el.collectionId}` }
                    >
                      <img
                        src={ el.artworkUrl100 }
                        alt={ el.collectionName }
                        className="flex items-center text-right mt-5 justify-center
                        w-40 h-40"
                      />
                      <p className="font-semibold">{ el.collectionName }</p>
                    </Link>
                  ))}
                </div>
              </>)
              : <p className="flex justify-center mt-10">Nenhum álbum foi encontrado</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
