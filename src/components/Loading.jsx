import React from 'react';
import Carregando from '../assets/spinner.gif';

class Loading extends React.Component {
  render() {
    return (
      <section>
        <div>
          <img
            src={ Carregando }
            alt="img-carreaga"
            className="inline-block
            align-baseline w-20 h-20"
          />
        </div>
        <div>
          <p
            className="font-semibold text-gray-600 text-center"
          >
            Carregando...
          </p>
        </div>
      </section>
    );
  }
}

export default Loading;
