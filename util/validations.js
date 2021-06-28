const _ = require('underscore');
const validator = require('validator');
const cpfValida = require('node-cpf');

module.exports = function () {
	function validaBody(body, index) {
		var camposNaoPreenchidos = [];
		_.each(index, function (value) {
			if (_.has(body, value)) {
				if (_.isUndefined(body[value]) || (!_.isNumber(body[value]) && _.isEmpty(body[value])) || _.isNull(body[value])) {
					camposNaoPreenchidos.push(value);
				}
			} else {
				camposNaoPreenchidos.push(value);
			}
		});
		return camposNaoPreenchidos;
	}

	function validaBodyNaoObrigatorio(body, index) {
		var camposNaoPreenchidos = [];
		_.each(index, function (value) {
			if (_.has(body, value)) {
				if (_.isUndefined(body[value]) || (!_.isNumber(body[value]) && _.isEmpty(body[value])) || _.isNull(body[value])) {
					body[value] = null;
				}
			}
		});
		return body;
	}

	function validaEmail(email) {
		return validator.isEmail(email);
	}

	function validaCpf(cpf) {
		return cpfValida.validate(cpf);
	}

	return {
		validaBody: validaBody,
		validaEmail: validaEmail,
		validaCpf: validaCpf,
		validaBodyNaoObrigatorio: validaBodyNaoObrigatorio
	};
};
