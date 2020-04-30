const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

//Importar Controllers
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

/* Tipos de parâmetros 
- Query Params = Parâmetros nomeados enviados na rota após "?" (filtros, paginação).
- Route Params = Parâmetros utilizados para identificar recursos.
- Request Body = Corpo da requisição, utilizado para criar ou alterar recursos.
*/

//ROTA SESSION
//Rota para criar seção, para a Ong efetuar seu login
routes.post('/session', SessionController.create);

//ROTAS ONG
//Rota de cadastrar Ong
routes.post("/ongs", celebrate({
    [Segments.BODY]: Joi.object().keys({
        nome: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(12),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    }),
}), OngController.create);

//Rota para listar todas as Ongs
routes.get('/ongs', OngController.index); 


//ROTAS INCIDENTS
//Rota para cadastrar Incidents
routes.post('/incidents', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),

    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().min(8).required(),
        description: Joi.string().min(10).required(),
        value: Joi.number().required(),
    }),
}), IncidentController.create);

//Rota para listar todos os Incidents
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    }),
}), IncidentController.index);

//Rota para deletar Incidents
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    }),
}), IncidentController.delete);

//Rota para listar todos os Incidents criados pela Ong logada
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.index);

module.exports = routes;