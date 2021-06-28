var variaveisAmbiente = require('../config/variavelAmbiente');

const port = variaveisAmbiente.PORT;

const bodyParser = require('body-parser');
const restify = require('restify');
const restifyRoute = require('restify-routing');
const server = restify.createServer();
const allowCors = require('./cors');
const queryParser = require('express-query-int');
const corsMiddleware = require('restify-cors-middleware');

const cors = corsMiddleware({
  preflightMaxAge: 5,
  origins: ['*'],
  allowHeaders: ['authorization', '*', 'Authorization', 'usuario'],
  exposeHeaders: ['*']
});

server.pre(cors.preflight);
server.use(cors.actual);
server.use(
    bodyParser.urlencoded(
        {
            extended: true
        }
    )
);
server.use(
    bodyParser.json()  
);
// server.use(
//     allowCors
// );
server.use(
    queryParser()
);
server.use(restify.plugins.queryParser());

server.opts('/*', function(req, res, next){
    res.status(204);
    res.send('Ok');
});
server.use(allowCors);
server.listen(port, function(){
    console.log('BACKEND is running on port ' + port);
});

module.exports = {restifyRoute, server};
