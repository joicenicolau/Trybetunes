import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  state = {
    user: {},
  };

  async componentDidMount() {
    const user = await getUser();
    this.setState({
      user,
    });
  }

  render() {
    const { user } = this.state;
    return (
      <div data-testid="page-profile" className="flex">
        <Header />
        <div className="flex-col w-full h-screen overflow-y-scroll">
          <div className="flex">
            <img
              data-testid="profile-image"
              alt="perfil"
              src={ user.image }
              className="flex items-center justify-center
              w-40 h-40 rounded-full shadow-2xl m-auto"
            />
          </div>
          <div className="h-screen w-full bg-slate-100">
            <p className="font-semibold text-center mt-3">
              Nome
            </p>
            <h3 className="text-center">{user.name}</h3>
            <br />
            <br />
            <p className="font-semibold text-center">
              E-mail
            </p>
            <p className="text-center">{user.email}</p>
            <br />
            <br />
            <p className="font-semibold text-center">
              Descrição
            </p>
            <p className="text-center">{user.description}</p>
            <br />
            <br />
            <Link
              to="/profile/edit"
              className="flex items-center text-center justify-center"
            >
              Editar perfil
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
