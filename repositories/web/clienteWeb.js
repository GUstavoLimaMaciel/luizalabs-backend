const database = require('../../config/database');
const _ = require('underscore');
var connautenticacaoCliente = database.cliente('luizalabs');

module.exports = function () {

    function obterConta(email, callback) {
        return connautenticacaoCliente('clientes')
            .where({
                email: email
            })
            .count()
            .select();
    };

    function obterCPF(cpf, callback) {
        return connautenticacaoCliente('clientes')
            .where({
                cpf: parseFloat(cpf)
            })
            .count()
            .select();
    };
    
    function obterClientes(pagina, registroPorPagina) {
        return connautenticacaoCliente('clientes')
			.limit(registroPorPagina)
			.offset(pagina * registroPorPagina)
            .select();
    };

    function totalRegistroClientes() {
        return connautenticacaoCliente('clientes')
            .count()
            .select();
    };

    function novoCliente(cliente) {

        return connautenticacaoCliente('clientes')
            .returning('id')
            .insert({
                nome: cliente.nome,
                cpf: cliente.cpf,
                sexo: cliente.sexo,
                email: cliente.email
            });
    };  

    function dadosCliente(idCliente) {
        return connautenticacaoCliente('clientes')
            .where({
                id: idCliente
            })
            .select();
    };

    function alterarCliente(idCliente, cliente) {
        return connautenticacaoCliente('clientes')
            .where('id', idCliente)
            .update({
                nome: cliente.nome,
                cpf: cliente.cpf,
                sexo: cliente.sexo,
                email: cliente.email
            });
    };

    function deletarCliente(idCliente) {
        return connautenticacaoCliente('clientes')
            .where('id', idCliente)
            .delete();
    };

    return {
        obterConta: obterConta,
        obterCPF: obterCPF,
        novoCliente: novoCliente,
        dadosCliente: dadosCliente,
        alterarCliente: alterarCliente,
        obterClientes: obterClientes,
        totalRegistroClientes: totalRegistroClientes
    };
};