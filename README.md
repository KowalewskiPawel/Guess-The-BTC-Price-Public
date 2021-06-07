# Guess The BTC Price

Guess The BTC Price - is a game where your aim is to guess the price of various products, (starting from food, finishing up on luxury goods). However, the catch here is that you have to guess the price in Bitcoins. Prices of all of the products are based on world's average prices in dollars.

## Technology Stack

- React: web version's core
- Redux: state management
- Firebase: storing the results

### React

Both web version and mobile version was build with React. The project is based on stateful components, however in order to
loop the "White Noise" sound, createRef "hook" has been used. Clock works thanks to intervals which are constantly changing
the state. All of the sessions are stored in the local store of user's browser. On every run, ComponentDidMount is called to check
the local storage for pervious session. Thanks to moment library, the dates are easily compared so sessions array can be erased.

### Mobile version

COMING SOON

### Google Play Store


## Known issues

- After logging to leaderboard, games restarts what may result is highscore lose

### TODO

- Mobile version
- cleaner code

### Live version

[https://guessthebtcprice.netlify.app/](https://guessthebtcprice.netlify.app/)
