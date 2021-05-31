import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";

import products from "../assets/products";

import correct from "../sounds/correct.mp3";
import wrong from "../sounds/wrong.mp3";
import music from "../sounds/music.mp3";

import Leaderboard from "./Leaderboard";

function Main(props) {
  const btcPrice = props.price.price;

  const [productId, setProductId] = useState(() => null);
  const [game, setGame] = useState(() => false);
  const [score, setScore] = useState(() => 0);
  const [highScore, setHighScore] = useState(() => 0);
  const [productsArr, setProductsArr] = useState(() => []);
  const [gameOver, setGameOver] = useState(() => false);
  const [timer, setTimer] = useState(() => 5 * 60);
  const [showPrice, setShowPrice] = useState(() => false);
  const [hint, setHint] = useState(() => null);
  const [musicPlay, setMusicPlay] = useState(() => false);
  const [sounds, setSounds] = useState(() => true);
  const [colors, setColors] = useState(() => "antiquewhite");

  const timerInterval = useRef(null);

  const [floatInput, setFloatInput] = useState(() => 0);
  const [intInput, setIntInput] = useState(() => 0);

  const correctAnswer = new Audio(correct);
  const wrongAnswer = new Audio(wrong);

  const audioRef = useRef();

  const startGame = () => {
    console.log(btcPrice);
    if (btcPrice === 0) {
      setHint(() => "No Internet connection, we couldn't fetch BTC price. 😥");
      return;
    }
    if (gameOver) {
      setGameOver(false);
    }

    setTimer(() => 5 * 60);

    setScore(() => 0);

    setColors(() => "antiquewhite");

    setHint(() => null);

    if (!game) {
      setGame(true);
    }

    randomProduct();

    timerInterval.current = setInterval(() => {
      setTimer((prevState) => prevState - 1);
    }, 1000);
  };

  const randomProduct = () => {
    if (productsArr.length >= 48) {
      setProductsArr(() => []);
    }
    let randomNumber = Math.floor(Math.random() * products.length);
    if (!productsArr.includes(randomNumber)) {
      setProductId(randomNumber);
      setProductsArr((prevState) => [...prevState, randomNumber]);
    } else {
      try {
        return randomProduct();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const checkAnswer = () => {
    let answer = parseFloat(`${intInput}.${floatInput}`).toFixed(8);
    let productPrice = parseFloat(
      (products[productId].price / btcPrice).toFixed(8)
    );

    let onePercent = [
      (productPrice + 0.01 * productPrice).toFixed(8),
      (productPrice - 0.01 * productPrice).toFixed(8),
    ];

    let fivePercent = [
      (productPrice + 0.05 * productPrice).toFixed(8),
      (productPrice - 0.05 * productPrice).toFixed(8),
    ];

    let tenPercent = [
      (productPrice + 0.1 * productPrice).toFixed(8),
      (productPrice - 0.1 * productPrice).toFixed(8),
    ];

    let fiftyPercent = [
      (productPrice + 0.5 * productPrice).toFixed(8),
      (productPrice - 0.5 * productPrice).toFixed(8),
    ];

    console.log(answer, productPrice, onePercent);

    if (answer <= onePercent[0] && answer >= onePercent[1]) {
      if (sounds) {
        correctAnswer.play();
      }
      setHint("Congratulations! 😀 + 💯 pts. and 1 min.");
      setScore((prevState) => prevState + 100);
      setTimer((prevState) => prevState + 60);
      setShowPrice(() => true);
      setTimeout(() => {
        randomProduct();
        setHint(() => null);
        setShowPrice(() => false);
      }, 2000);

      return;
    }

    if (answer <= fivePercent[0] && answer >= fivePercent[1]) {
      if (sounds) {
        correctAnswer.play();
      }
      setHint("Congratulations! It was very close! 😀 + 50 pts. and 30 sec.");
      setScore((prevState) => prevState + 50);
      setTimer((prevState) => prevState + 30);
      setShowPrice(() => true);
      setTimeout(() => {
        randomProduct();
        setHint(() => null);
        setShowPrice(() => false);
      }, 2000);
      return;
    }

    if (answer <= tenPercent[0] && answer >= tenPercent[1]) {
      if (sounds) {
        correctAnswer.play();
      }
      setHint("Good! Almost there! 🙂 + 10 pts. and 10 sec.");
      setScore((prevState) => prevState + 10);
      setTimer((prevState) => prevState + 10);
      setShowPrice(() => true);
      setTimeout(() => {
        randomProduct();
        setHint(() => null);
        setShowPrice(() => false);
      }, 2000);
      return;
    }

    if (answer < tenPercent[1] && answer > fiftyPercent[1]) {
      if (sounds) {
        wrongAnswer.play();
      }
      setHint("Price is higher ↗️");
    }
    if (answer > tenPercent[0] && answer < fiftyPercent[0]) {
      if (sounds) {
        wrongAnswer.play();
      }
      setHint("Price is lower ↘️");
    }

    if (answer < fiftyPercent[1]) {
      if (sounds) {
        wrongAnswer.play();
      }
      setHint("Price is way higher 🤯 ↗️");
    }

    if (answer > fiftyPercent[0]) {
      if (sounds) {
        wrongAnswer.play();
      }
      setHint("Price is way lower 🤯 ↘️");
    }
  };

  const playMusic = () => {
    if (!musicPlay) {
      setMusicPlay(() => true);
      audioRef.current.addEventListener("ended", () => {
        audioRef.current.play();
      });
      audioRef.current.play();
    }
    if (musicPlay) {
      audioRef.current.pause();
      setMusicPlay(() => false);
    }
  };

  const handleInput = (event) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };

  useEffect(() => {
    if (timer < 10) {
      setColors(() => "red");
    }

    if (timer === 1) {
      return () => {
        setGameOver(() => true);
        clearInterval(timerInterval.current);
        timerInterval.current = null;
        setProductsArr(() => []);
        if (highScore < score) {
          setHighScore(() => score);
        }
        setHint(() => null);
      };
    }
  }, [timer]);

  return (
    <div>
      <Leaderboard highestScore={highScore} />
      <audio ref={audioRef} src={music} />
      <div className="audioButtons">
        <button onClick={playMusic}>{musicPlay ? "🎵" : "🔇"}</button>
        <button onClick={() => setSounds((prevState) => !prevState)}>
          {sounds ? "🔉" : "🔇"}
        </button>
      </div>
      <div className="scores">
        <p>
          Time:{" "}
          <p style={{ color: colors }}>
            {Math.floor(timer / 60)} : {String(timer % 60).padStart(2, "0")}
          </p>
        </p>
        <p>Score: {score}</p>
        <p>Highest Score: {highScore}</p>
      </div>
      <div className="container">
        {!gameOver ? (
          game ? (
            <>
              <h3 id="productName">{products[productId].name}</h3>
              <img
                id="productImage"
                src={products[productId].image}
                alt="product"
              />
              <h3 id="productPrice">
                PRICE BTC ≈{" "}
                {showPrice
                  ? `${(products[productId].price / btcPrice).toFixed(8)}  ฿`
                  : "?"}
              </h3>
              <p
                style={{
                  marginTop: "1.4rem",
                  fontWeight: "bolder",
                }}
              >
                {hint ? hint : ""}
              </p>
            </>
          ) : (
            <>
              <h1 style={{ textAlign: "center", marginTop: "20%" }}>
                Press 'START' button to play the game
                <hr />
                or press 'INFO' button for help
              </h1>
              {!game || gameOver ? (
                <div className="gameButtons">
                  <button onClick={startGame} style={{ fontSize: "1rem" }}>
                    {!game ? "START" : "RESTART"}
                  </button>
                </div>
              ) : (
                ""
              )}
              <p
                style={{
                  marginTop: "10rem",
                  fontWeight: "bolder",
                }}
              >
                {hint ? hint : ""}
              </p>
            </>
          )
        ) : (
          <>
            <h1 style={{ textAlign: "center", marginTop: "20%", color: "red" }}>
              GAME OVER!
            </h1>
            <hr />
            <h1 style={{ textAlign: "center" }}>Your score is: {score}</h1>
            {!game || gameOver ? (
              <div className="gameButtons">
                <button onClick={startGame}>
                  {!game ? "START" : "RESTART"}
                </button>
              </div>
            ) : (
              ""
            )}
          </>
        )}
      </div>

      {game && !gameOver ? (
        <div className="gameButtons">
          <button onClick={checkAnswer}>GUESS</button>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "block",
              }}
            >
              <h3>BTC</h3>
              <input
                type="tel"
                id="btc"
                onKeyPress={handleInput}
                maxLength="3"
                style={{
                  width: "24px",
                  marginRight: "0",
                }}
                defaultValue="0"
                onChange={(event) => setIntInput(event.target.value)}
              />
            </div>
            <div
              style={{
                display: "block",
              }}
            >
              <h3>SATOSHI</h3>
              <input
                type="tel"
                id="satoshi"
                onKeyPress={handleInput}
                maxLength="8"
                placeholder="Guess The Price in BTC"
                onChange={(event) => setFloatInput(event.target.value)}
              />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  price: state,
});

export default connect(mapStateToProps)(Main);
