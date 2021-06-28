module.exports = function(routeConfig){

    /*     
    * Rotas abertas     
    */
    const openApi = new routeConfig.restifyRoute();
    const server = new routeConfig.restifyRoute();
    /**
     * constantes para rotas do sistema
     */
    const clienteWeb = require('../api/cliente/clienteController');
    const produtoWeb = require('../api/produtos/produtoController');
    
    server.use('/api', openApi);
    openApi.get('/teste', function(req, res, next){
        res.send({
            teste: 'Teste'
        });
    });
    openApi.use('/web', clienteWeb);
    openApi.use('/web', produtoWeb);
   
   server.applyRoutes(routeConfig.server);
};