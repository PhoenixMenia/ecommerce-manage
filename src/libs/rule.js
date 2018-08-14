var rule = {
	REG_PHONE: /^1\d{10}$/,
	REG_FLOAT: /^-?\d*(\.\d+)?$/,
	isInteger: function(str) {
        return str && str % 1 === 0 && str > 0;
    }
}

module.exports = rule;