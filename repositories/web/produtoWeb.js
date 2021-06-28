const database = require('../../config/database');
const _ = require('underscore');
const moment = require('moment');
const { produto } = require('../../config/database');

var connProduto = database.produto('luizalabs');

module.exports = function () {
	function obterProdutos(pagina, registroPorPagina) {
		return connProduto('produtos')
			.limit(registroPorPagina)
			.offset(pagina * registroPorPagina)
			.select();
	}

	function totalRegistroProdutos() {
		return connProduto('produtos')
			.count()
			.select();
	}

	function detalheProduto(idProduto) {
		var whereClause = {
			id: idProduto
		};
		return connProduto('produtos')
			.where(whereClause)
			.select();
	}

	function alterarProduto(idProduto, produto) {
		return connProduto('produtos')
			.where('id', '=', idProduto)
			.update({
				nome: produto.nome,
				fabricacao: produto.fabricacao,
				tamanho: produto.tamanho,
				valor: produto.valor
			});
	}

	function criarProduto(produto) {
		return connProduto('produtos')
			.returning('id')
			.insert({
				nome: produto.nome,
				fabricacao: produto.fabricacao,
				tamanho: produto.tamanho,
				valor: produto.valor
			});
	}

	function criarProduto(idProduto) {
		return connProduto('produtos')
			.where('id', '=', idProduto)
			.delete();
	}

	return {
		obterProdutos: obterProdutos,
		totalRegistroProdutos: totalRegistroProdutos,
		detalheProduto: detalheProduto,
		alterarProduto: alterarProduto,
		criarProduto: criarProduto
	};
};
