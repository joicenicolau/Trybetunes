import React from 'react';
import { Link } from 'react-router-dom';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { AiOutlineStar } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import logo from '../assets/logo.svg';

class Header extends React.Component {
  state = {
    loading: false,
    user: '',
  };

  componentDidMount() {
    this.setState(
      { loading: true },
      async () => {
        const user = await getUser();
        this.setState({
          loading: false,
          user: user.name,
        });
      },
    );
  }

  render() {
    const { loading, user } = this.state;

    return (
      <header data-testid="header-component" className="bg-slate-50">
        {
          loading ? <Loading /> : (
            <>
              <img
                alt="logo"
                src={ logo }
                className="flex flex-col bg-slate-50
                w-3/4 align-top left-0 relative inset-0 mt-4
                p-5 items-center"
              />
              <h3
                data-testid="header-user-name"
                className="uppercase text-center text-2xl
                font-semibold text-gray-600 m-4"
              >
                { user }
              </h3>
            </>
          )
        }

        <nav>
          <ul
            className="flex flex-col justify-between items-center h-52 mt-20"
          >
            <Link
              data-testid="link-to-search"
              to="/search"
              className="flex"
            >
              <HiMagnifyingGlass className="items-center mr-2" />
              Pesquisar
            </Link>
            <br />
            <Link
              data-testid="link-to-favorites"
              to="/favorites"
              className="flex"
            >
              <AiOutlineStar className="mr-2" />
              Favoritos
            </Link>
            <br />
            <Link
              data-testid="link-to-profile"
              to="/profile"
              className="flex"
            >
              <CgProfile className="mr-2" />
              Perfil
            </Link>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
