var cardmaster = require('./')
var tape     = require('tape')
var decked = require('decked')
var scruffyShuffle = require('scruffy-shuffle')

function getHands(){
  var deck = decked({
    ace:'low'
  })

  var cards = deck(function(card){
    return card.number<=10
  })

  var hands = scruffyShuffle(cards, {
    valueField:'number',
    players:[1,1]
  })

  return hands
}

tape('make sure the deck is in order', function(t){

  var hands = getHands()

  t.equal(hands.length, 2, 'there are 2 hands')
  t.equal(hands[0].length, 20, 'there are 20 cards in each hand')
  
  t.end()

})

tape('throw an error if a player is asked for that does not exist', function(t){

  var game = cardmaster(getHands())

  t.throws(function(){
    var player = game.player(2)
  }, new Error('player 2 does not exist'), 'throws an error when a non-existent player is requested')

  t.end()

})

tape('let one player win a hand and end up with more cards', function(t){

  var game = cardmaster(getHands())

  var player1 = game.player(0)
  var player2 = game.player(1)

  var player1Cards = player1.takeCards(2)
  t.equal(player1Cards.length, 2, 'there are 2 cards in player 1s hand')

  var player2Cards = player2.takeCards(2)
  t.equal(player2Cards.length, 2, 'there are 2 cards in player 2s hand')

  player2.putCards(player1Cards.concat(player2Cards))

  t.equal(player1.count(), 18)
  t.equal(player2.count(), 22)

  t.end()

})
