const _ = require('underscore');
const serverConfig = require('../../config/server');
const produtoWeb = require('../../repositories/web/produtoWeb')();
const validations = require('../../util/validations')();
const moment = require('moment');

const produto = new serverConfig.restifyRoute();
const camposObrigatoriosPost = ['nome',	'fabricacao', 'valor'];

/**
 * Ações ligadas a Produtos
 */

produto.get('/produtos/:idProduto', function(req, res, next){
    var produto = {};
    
    if(!req.params.idProduto){
        res.status(400);
        res.send([{
            codigo: 0,
            data: 'Produto',
            message: 'Campos obrigatórios não foram informados'
        }]);
    } else {       
        produtoWeb.detalheProduto(req.params.idProduto)
            .then(function (rows) {
                var response = {
                    mensagem: 'Detalhes do Produto'
                };
                _.each(rows, function(p){
					produto = {
						id: p.id,
						nome: p.nome,
						fabricacao: p.fabricacao,
						tamanho: p.tamanho,
						valor: p.valor
					};
                });
                response.data = produto;
                res.send(response);
                res.status(200);
            })
            .catch(function (error) {
                console.error(error);
                res.status(500);
                res.send();
            });
    }
});

produto.get('/produtos', function(req, res, next){
    var produto = {};
              
	produtoWeb.obterProdutos()
		.then(function (rows) {
			produtoWeb.totalRegistroProdutos()
				.then(function (meta) {
					var response = {
						mensagem: 'Lista de Produtos'
					};
					response.data = rows;
					response.meta = meta;
					res.send(response);
					res.status(200);
				})
				.catch(function (error) {
					console.error(error);
					res.status(500);
					res.send();
				});
		})
		.catch(function (error) {
			console.error(error);
			res.status(500);
			res.send();
		});
});


produto.post('/produtos', async function (req, res, next) {
	const body = req.body;
	var errorResponse = [];
	var validaBody = validations.validaBody(body, camposObrigatoriosPost);

	if (validaBody.length) {
		errorResponse.push({
			codigo: 0,
			data: validaBody,
			message: 'Campos obrigatórios não foram informados'
		});
	};

	if (errorResponse.length) {
		res.status(400);
		res.send(errorResponse);
	} else {
		produtoWeb.criarProduto(req.body)
		.then(function (rows) {
			var response = {
				mensagem: 'Produto criado com sucesso'
			};
			response.data = rows;
			res.send(response);
			res.status(200);
		})
		.catch(function (error) {
			console.error(error);
			res.status(500);
			res.send();
		});
	};

});

produto.put('/produtos/:id', function (req, res, next) {
	const body = req.body;
	const parametro = req.params;
	var errorResponse = [];
	var validaBody = validations.validaBody(body, camposObrigatoriosPost);

	if (validaBody.length) {
		errorResponse.push({
			codigo: 0,
			data: validaBody,
			message: 'Campos obrigatórios não foram informados'
		});
	};

	if (errorResponse.length) {
		res.status(400);
		res.send(errorResponse);
	} else {
		produtoWeb.alterarProduto(req.params.id, req.body)
		.then(function (rows) {
			var response = {
				mensagem: 'Produto editado com sucesso'
			};
			response.data = rows;
			res.send(response);
			res.status(200);
		})
		.catch(function (error) {
			console.error(error);
			res.status(500);
			res.send();
		});
	}
});

produto.delete('/produtos/:id', function (req, res, next) {
	const parametro = req.params;
	var errorResponse = [];
	if (errorResponse.length) {
		res.status(400);
		res.send(errorResponse);
	} else {
		produtoWeb.deletarProduto(req.params.id)
		.then(function (rows) {
			var response = {
				mensagem: 'Produto deletado com sucesso'
			};
			response.data = rows;
			res.send(response);
			res.status(200);
		})
		.catch(function (error) {
			console.error(error);
			res.status(500);
			res.send();
		});
	}
});

module.exports = produto;
