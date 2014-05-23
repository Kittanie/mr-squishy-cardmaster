var Emitter = require('component-emitter')

function Player(hand){
	this._hand = hand
}

Emitter(Player.prototype)

module.exports = Player

Player.prototype.hand = function(){
	return this._hand
}

Player.prototype.count = function(){
	return this._hand.length
}

Player.prototype.takeCard = function(position){
	position = position || 'top'
	return position == 'top' ? this._hand.shift() : this._hand.pop()
}

Player.prototype.putCard = function(card, position){
	position = position || 'bottom'
	position == 'top' ? this._hand.unshift(card) : this._hand.push(card)
}

Player.prototype.takeCards = function(count, position){
	var c=0
	var ret = []
	while(c<count){
		ret.push(this.takeCard(position))
		c++
	}
	return ret
}

Player.prototype.putCards = function(cards, position){
	var self = this;
	cards.forEach(function(card){
		self.putCard(card, position)
	})
}