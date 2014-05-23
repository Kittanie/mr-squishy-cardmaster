mr-squishy-cardmaster
=====================

[![Travis](http://img.shields.io/travis/kitto1/mr-squishy-cardmaster.svg?style=flat)](https://travis-ci.org/kitto1/mr-squishy-cardmaster)

Keep track of card games with players and current hands.

## installation

node:

```
$ npm install mr-squishy-cardmaster
```

component:

```
$ component install kitto1/mr-squishy-cardmaster
```

## usage

You pass mr-squishy an array of 'hands'.

Each hand represents a player in the card game and is an array of cards in the hand.

mr-squishy keeps track of the hands so you can:

 * get the next card from the top of a players hand
 * put a card onto the bottom of a players hand
 * ask how many cards are in a players hand

Each card is an object with any properties you want - mr-squishy just looks after the dealing.

### creating hands

First - lets create some hands using [decked](https://github.com/binocarlos/decked) and [scruffy-shuffle](https://github.com/kitto1/scruffy-shuffle)

```js
var decked = require('decked')
var scruffyShuffle = require('scruffy-shuffle')
var cardmaster = require('mr-squishy-cardmaster')

// get a deck of cards with aces low
var deck = decked({
  ace:'low'
})

// get cards that exclude face cards
var cards = deck(function(card){
  return card.number<=10
})

// split the deck into 2 players
var hands = scruffyShuffle(cards, {
  valueField:'number',
  players:[1,1]
})
```

### running games
Now we have an array of player hands (each hand being an array of objects) - we can create a dealer using mr-squishy.

We could play a round of a game where one player 'wins' 2 cards from the other.  This would result in putting 4 cards on the bottom of the winning players hand:

```js
var game = cardmaster(hands)
var player1 = game.player(0)
var player2 = game.player(1)

// deal 2 cards from the top of player 1's hand into a new array
var player1Cards = player1.takeCards(2)

// deal 2 cards from the top of player 2's hand into a new array
var player2Cards = player2.takeCards(2)

// decide that player 2 wins all 4 cards
// and put them back onto the bottom of player 2's hand
player2.putCards(player1Cards.concat(player2Cards))
```

## api

### `var game = cardmaster(hands)`

Create a new game with the given hands of cards.

hands is an 2d array - each top level is a player and each element in the player array is a card in their hand.

```js
// hands for 2 players - each player has 2 cards
var hands = [[{
  name:'jack',
  number:11,
  suit:'diamond'
},{
  name:'jack',
  number:11,
  suit:'spade'
}],[{
  name:'jack',
  number:11,
  suit:'club'
},{
  name:'jack',
  number:11,
  suit:'heart'
}]]

var game = cardmaster(hands)
```

### `var player = game.player(index)`

Get a reference to a players individual hand - index is zero-based so pass 0 for player1

```js
var game = cardmaster(hands)
var player1 = game.player(0)
var player2 = game.player(1)
```

### `var cards = player.hand()`

Return the full list of cards in the players hand

### `var card = player.takeCard(position)`

Take a single card from a players hand

Position can be 'top' or 'bottom' (top is default).

### `player.putCard(card, position)`

Return a single card to a players hand

Position can be 'top' or 'bottom' (bottom is default).

### `var cards = player.takeCards(number, position)`

Take some cards from a players hand - this alters the count for that hand (because it removes the cards from the hand)

Count is the number of cards to return in the array.

Position can be 'top' or 'bottom' (top is default).

### `player.putCards(cards, position)`

Insert some cards back into a players hand - cards is an array of the card objects.

Position can be 'top' or 'bottom' (bottom is default)

### `var count = player.count()`

Return a number representing how many cards a player has in their hand.

## license

MIT