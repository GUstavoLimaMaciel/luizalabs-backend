const _ = require('underscore');
const serverConfig = require('../../config/server');
const clienteSQL = require('../../repositories/web/clienteWeb')();
const validations = require('../../util/validations')();
const clienteHelper = require('./clienteHelper')();
const cliente = new serverConfig.restifyRoute();
const camposObrigatoriosPost = ['nome',	'cpf', 'sexo', 'email'];

cliente.post('/clientes', async function (req, res, next) {
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

	if (body.email) {
		if (!validations.validaEmail(body.email)) {
			errorResponse.push({
				codigo: 1,
				data: body.email,
				message: 'E-mail informado não é válido'
			});
		};
	};

	if (body.cpf) {
		if (!validations.validaCpf(body.cpf)) {
			errorResponse.push({
				codigo: 1,
				data: body.cpf,
				message: "Cpf informado é invalido"
			});
		};
	};

	if (errorResponse.length) {
		res.status(400);
		res.send(errorResponse);
	} else {
		let verificaCPF = await clienteHelper.obterCPF(body.cpf);
		if (verificaCPF.error) {
			res.status(500);
			res.send();
		}

		if (verificaCPF.possuiCPF) {
			res.status(400);
			res.send({
				codigo: 2,
				data: body.cpf,
				message: 'CPF já cadastrado'
			});
			return;
		}

		let verificaEmail = await clienteHelper.obterEmail(body.email);
		if (verificaCPF.error) {
			res.status(500);
			res.send();
		}

		if (verificaEmail.possuiEmail) {
			res.status(400);
			res.send({
				codigo: 2,
				data: body.email,
				message: 'Email já existe'
			});
			return;
		} 

		let clienteInserido = await clienteHelper.criarCliente(body);
		if (clienteInserido.error) {
			res.status(500);
			res.send();
			return;
		} 
		
		res.status(200);
		res.send({
			codigo: 200,
			data: body.nome,
			message: 'Cliente cadastrado com sucesso'
		});
		//fim cadastro usuário
	};

});

cliente.get('/clientes/:id', async function (req, res, next) {
	var idCliente;

	idCliente = req.params.id;
	let cliente = await clienteHelper.dadosCliente(idCliente);
	if (cliente.error) {
		res.status(500);
		res.send();
		return;
	} 
	
	res.status(200);
	res.send({
		codigo: 200,
		data: cliente,
		message: 'Detalhes do Cliente'
	});
});

cliente.get('/clientes', function (req, res, next) {
	clienteSQL.obterClientes()
		.then(function (rows) {
			clienteSQL.totalRegistroClientes()
				.then(function (meta) {
					var response = {
						mensagem: 'Lista de Clientes'
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

cliente.put('/clientes/:id', function (req, res, next) {
	const body = req.body;
	const parametro = req.params;
	console.log(req);
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
		clienteSQL.alterarCliente(req.params.id, req.body)
		.then(function (rows) {
			var response = {
				mensagem: 'Cliente editado com sucesso'
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

cliente.delete('/clientes/:id', function (req, res, next) {
	const parametro = req.params;
	console.log(req);
	var errorResponse = [];

	if (errorResponse.length) {
		res.status(400);
		res.send(errorResponse);
	} else {
		clienteSQL.deletarCliente(req.params.id)
		.then(function (rows) {
			var response = {
				mensagem: 'Cliente editado com sucesso'
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

module.exports = cliente;
