import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';
import logo from '../assets/logo.svg';
import group6 from '../assets/Group-6.svg';
import group5 from '../assets/Group5.svg';

class Login extends React.Component {
  state = {
    name: '',
    disabled: true,
    loading: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validatedFields);
  };

  validatedFields = () => {
    const { name } = this.state;
    const tres = 3;
    const fields = name.length >= tres;

    this.setState({
      disabled: !(fields),
    });
  };

  handleClick = async () => {
    const { history } = this.props;
    const { name } = this.state;
    this.setState(
      { loading: true },
      async () => {
        await createUser({ name });
        history.push('/search');
      },
    );
  };

  render() {
    const { name, disabled, loading } = this.state;

    return (
      <div
        data-testid="page-login"
        className="flex items-center justify-center w-auto h-screen mx-2.5 px-20"
      >
        <img
          alt="logo2"
          src={ group6 }
          className="align-top left-0 absolute top-0 w-2/12"
        />
        <img
          alt="logo3"
          src={ group5 }
          className="rigth-0 absolute bottom-0 right-0 w-2/12"
        />
        <div
          className="bg-white
        h-450 w-3/6
        p-20 px-20 rounded-2xl ml-265 mb-20
        text-center"
        >
          <img
            alt="logo"
            src={ logo }
            className="flex items-center justify-center w-6/12 m-auto"
          />
          <br />
          <br />
          { loading ? <Loading /> : (
            <>
              <fieldset className="mb-4 text-center border-blue-700 decoration-blue-700">
                <input
                  name="name"
                  type="text"
                  value={ name }
                  placeholder="Qual é o seu nome?"
                  data-testid="login-name-input"
                  onChange={ this.handleChange }
                  className="w-full w-400 h-10 mt-400 ml 440 rounded-2xl p-2
                   border-blue-700 border-2 text-blue-700"
                />
              </fieldset>
              <button
                type="button"
                onClick={ this.handleClick }
                data-testid="login-submit-button"
                disabled={ disabled }
                value={ name }
                className="w-400 h-10 mt-400 ml 440 rounded-2xl p-2
                   text-white w-full bg-blue-700"
              >
                Entrar
              </button>
            </>
          )}
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.func,
}.isRequired;

export default Login;
