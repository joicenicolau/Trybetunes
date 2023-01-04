import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  state = {
    disabled: true,
    name: '',
    email: '',
    image: '',
    description: '',
  };

  async componentDidMount() {
    const user = await getUser();
    this.setState({
      name: user.name,
      email: user.email,
      image: user.image,
      description: user.description,
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validationFields);
  };

  validationFields = () => {
    const { email, name, image, description } = this.state;
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\)?$/i;
    const validateEmail = emailRegex.test(email);
    const validateName = name.length !== 0;
    const validateImage = image.length !== 0;
    const validateDescription = description.length !== 0;
    this.setState({
      disabled: !(validateEmail && validateName && validateImage && validateDescription),
    });
  };

  handleClick = async () => {
    const { history } = this.props;
    const { name, email, image, description } = this.state;
    await updateUser({ name, email, image, description });
    history.push('/profile');
  };

  render() {
    const { name, email, image, description, disabled } = this.state;

    return (
      <div data-testid="page-profile-edit" className="flex">
        <Header />
        <div
          className="flex w-full h-screen overflow-y-scroll justify-center items-center"
        >
          <div
            className="bg-white h-450 w-3/6 p-20 px-20 rounded-2xl m-auto text-center"
          >
            <div className="flex justify-center m-5">
              <p className="font-semibold">Nome</p>
              <br />
              <input
                data-testid="edit-input-name"
                type="text"
                name="name"
                value={ name }
                onChange={ this.handleChange }
                placeholder="Digite seu nome"
                className="mx-2 border-solid border-2 border-blue-700 rounded-md"
              />
            </div>
            <div className="flex justify-center m-5">
              <p className="font-semibold">E-mail</p>
              <br />
              <input
                data-testid="edit-input-email"
                type="text"
                name="email"
                value={ email }
                onChange={ this.handleChange }
                placeholder="Digite seu e-mail"
                className="mx-2 border-solid border-2 border-blue-700 rounded-md"
              />
            </div>
            <div className="flex justify-center m-5">
              <p className="font-semibold">Descrição</p>
              <br />
              <textarea
                data-testid="edit-input-description"
                name="description"
                value={ description }
                onChange={ this.handleChange }
                placeholder="Sobre mim"
                className="mx-2 border-solid border-2 border-blue-700 rounded-md"
              />
            </div>
            <div className="flex justify-center m-5">
              <p className="font-semibold">Imagem do Perfil</p>
              <br />
              <input
                data-testid="edit-input-image"
                type="text"
                name="image"
                value={ image }
                onChange={ this.handleChange }
                placeholder="Link da imagem do perfil"
                className="mx-2 border-solid border-2 border-blue-700 rounded-md"
              />
            </div>
            <div className="flex justify-center m-5">
              <button
                data-testid="edit-button-save"
                onClick={ this.handleClick }
                disabled={ disabled }
                type="button"
                className="w-400 h-10 mt-400 ml 440 rounded-2xl p-2
                   text-white w-full bg-blue-700"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.func,
}.isRequired;

export default ProfileEdit;
