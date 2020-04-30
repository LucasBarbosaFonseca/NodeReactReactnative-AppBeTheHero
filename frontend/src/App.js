import React from 'react';

import './global.css';

import Routes from './routes';

//JSX (Javascript XML) = é quando vai html dentro do javascript.

//Componente = Função javascript que retorna html.

/* Propriedades = Como se fossem atributos no HTML, mas nesse caso são atributos 
dos conteúdos dos componentes do React. */

//Estado = Usado para informações que precisam ser armazenadas, tipo variável.
function App() {
  return (
    <Routes />
  );
}

export default App;
