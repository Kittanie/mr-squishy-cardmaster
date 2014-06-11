var Emitter = require('emitter')
var Player = require('./player')

function Dealer(hands){
	this._hands = hands
}

Emitter(Dealer.prototype)

module.exports = Dealer

Dealer.prototype.player = function(index){
	index = index || 0
	if(index>this._hands.length-1){
		throw new Error('player ' + index + ' does not exist')
	}
	return new Player(this._hands[index])
}