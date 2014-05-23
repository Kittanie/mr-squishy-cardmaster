var Dealer = require('./dealer')

module.exports = function(hands){
	return new Dealer(hands)
}