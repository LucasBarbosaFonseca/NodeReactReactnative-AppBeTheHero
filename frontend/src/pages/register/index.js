import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

//Importando arquivo da api
import api from '../../services/api';

import '../../pages/register/styles.css';

import logoImg from '../../assets/logo.svg';

function Register() {

   /* Para mandar os valores dos inputs para função de cadastro e para a api
   nós precisamos armazenar cada valor em um estado (state). O estado (state) 
   funciona da seguinte forma: Temos uma variável com dois parâmetros, sendo o
   primeiro parâmetro onde será guardado o valor do campo e o segundo parâmetro que é usado 
   para atualizar o parâmetro do valor. Ex:
   
   const [name, setName] = useState('');

   */
   const [nome, setNome] = useState('');
   const [email, setEmail] = useState('');
   const [whatsapp, setWhatsapp] = useState('');
   const [city, setCity] = useState('');
   const [uf, setUf] = useState('');

   //usado para redirecionar o usuário pra página de login logo após o cadastro da ong 
   const history = useHistory();

   //Função responsável por efetuar cadastro das Ongs
   //Será efetuada quando for dado submit no formulário
   async function handleRegister(e) {
      e.preventDefault();

      const data = {
         nome,
         email,
         whatsapp,
         city,
         uf
      };

      try {

         const response = await api.post('ongs', data);
         alert(`Seu ID de acesso: ${response.data.id}`);  

         //Mandar usuário para a página de login, que sua rota é só uma /
         history.push('/');

      } catch (err) {       
         alert('Erro no cadastro, tente novamente.');
      }
    
   }

   return (
      <div className="register-container">
         <div className="content">
            <section>
               <img src={logoImg} alt="Be The Hero" />

               <h1>Cadastro</h1>
               <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

               <Link className="back-link" to="/">
                  <FiArrowLeft size={16} color="#E02041" />

                  Voltar ao logon
               </Link>
            </section>

            <form onSubmit={handleRegister} >
               <input placeholder="Nome da ONG" 
               value={nome} 
               onChange={e => setNome(e.target.value)} />

               <input type="email" placeholder="E-mail" 
               value={email}
               onChange={e => setEmail(e.target.value)} />

               <input placeholder="WhatsApp"
               value={whatsapp}
               onChange={e => setWhatsapp(e.target.value)} />

               <div className="input-group">
                  <input placeholder="Cidade" 
                  value={city}
                  onChange={e => setCity(e.target.value)} />

                  <input placeholder="UF" style={{ width: 80 }}
                  value={uf}
                  onChange={e => setUf(e.target.value)} />
               </div>

               <button className="button" type="submit">Cadastrar</button>
            </form>
         </div>
      </div>
   );
}

export default Register;