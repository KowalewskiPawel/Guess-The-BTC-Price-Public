# Guess The BTC Price

Guess The BTC Price - is a game where your aim is to guess the price of various products, (starting from food, finishing up on luxury goods). However, the catch here is that you have to guess the price in Bitcoins. Prices of all of the products are based on world's average prices in dollars.

### Installation

1. Clone the repository
2. Install dependencies `npm i`
3. Inside of the `Leaderboard.js` file located in the components directory, add firebase configuration object:

```
const firebaseApp = initializeApp({
  apiKey: "",
  authDomain: "",
  projectId: "",
});
```
4. Run the app with `npm start`


## Technology Stack

- React: web version's core
- Redux: state management
- React Query: fetching the API
- Firebase: storing the results
- lodash: get and throttle functions

### React

The whole app is based on the functional components with hooks. React Query library is used to fetch the current Bitcoin price, based on Coingecko API. Once the price is fetched it is immediately dispatched to the Redux store, from where Main comoponent fetches the price and calculates the price of a given product. Another part where API calls and asynchronous functions are used, is in the leaderboard modal part. In order to share the highest score, players have to loggin to the leaderboard section with their Google accounts. Once the session token is retrieved in leaderboard component, the player can see the global leaderboard and also upload his own score. Everything works there based on Google Firebase services, in this case it is Firebase store and Firebase Authentication.


### Mobile version

COMING SOON


## Known issues

- After logging to leaderboard, games restarts what may result is highscore lose

### TODO

- Mobile version
- cleaner code
- divide some parts into a separate modules

### Live version

[https://guessthebtcprice.netlify.app/](https://guessthebtcprice.netlify.app/)
