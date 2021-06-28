const _ = require('underscore');
const clienteSQL = require('../../repositories/web/clienteWeb')();

module.exports = function () {

	async function criarCliente(cliente) {
		let retorno = {
			idCliente: 0,
			error: undefined
		};
		let promise = await clienteSQL.novoCliente(cliente)
			.then(function (rowsCliente) {
				retorno.idCliente = rowsCliente[0];
			})
			.catch(function (error) {
				retorno.error = error;
			});

		return retorno;
	}

	async function dadosCliente(idCliente) {
		let retorno = {
			sucessoDados: false,
			error: undefined
		};
		let promise = await clienteSQL.dadosCliente(idCliente)
			.then(function (rowsCliente) {
				retorno = rowsCliente[0];
			}).catch(function (error) {
				retorno.error = error;
			});

		return retorno;
	}


	async function obterCPF(cpf) {
		let retorno = {
			possuiCPF: false,
			error: undefined
		};
		let promise = await clienteSQL.obterCPF(cpf)
			.then(function (rows) {
				retorno.possuiCPF = rows[0]['count(*)'];
			}).catch(function (error) {
				retorno.error = error;
			});
		return retorno;
	}

	async function obterEmail(email) {
		let retorno = {
			possuiEmail: false,
			error: undefined
		};
		let promise = await clienteSQL.obterConta(email)
			.then(function (rows) {
				retorno.possuiEmail = rows[0]['count(*)'];
			}).catch(function (error) {
				retorno.error = error;
			});
		return retorno;
	}

	return {
		criarCliente: criarCliente,
		dadosCliente: dadosCliente,
		obterCPF: obterCPF,
		obterEmail: obterEmail
	};
};
