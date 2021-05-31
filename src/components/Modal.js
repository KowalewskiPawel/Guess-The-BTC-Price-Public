import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "rgb(15, 15, 15)",
    padding: "1rem",
    borderRadius: "5px",
    boxShadow: "0 3rem 5rem rgba(0, 0, 0, 0.3)",
    textAlign: "center",
    width: "auto",
    height: "400px",
    maxHeight: "60vh !important",
    maxWidth: "80%",
  },
};

Modal.setAppElement("#root");

export default function ModalInfo() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <div id="modal" onClick={openModal}>
        Info
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <h2>GUESS THE ฿TC PRICE</h2>
        <div
          style={{
            position: "absolute",
            top: "1.2rem",
            right: "2rem",
            color: "#333",
            cursor: "pointer",
            border: "none",
            background: "rgb(41, 40, 40)",
            padding: "0.5rem",
            fontSize: "20px",
            color: "white",
          }}
          onClick={closeModal}
        >
          X
        </div>
        <div>
          Guess The BTC Price - is a game where your aim is to guess the price
          of various products, (starting from food, finishing up on luxury
          goods). However, the catch here is that you have to guess the price in
          Bitcoins. Prices of all of the products are based on world's average
          prices in dollars.
          <br />
          What is Bitcoin then? Bitcoin is a relatively new "currency" in fact
          it is called "cryptocurrency", and it is some kind of virtual global
          money. Bitcoin has been around for more than a decade and it's value
          has been growing since then.
          <br />
          <ul>
            <li>
              In the right corner you can see the current price of Bitcoin
            </li>
            <li>
              Under the picture, you have two input fields:
              <li>
                1. Amount of Bitcoin in integers (default to 0 as rarely
                something is more expensive than 1 Bitcoin){" "}
              </li>
              <li>
                2. Amount of Satoshis or rather the parts of single Bitcoin
                expressed in decimals
              </li>
              <li>3. Once you are ready click the "Guess" button</li>
            </li>
            <li>
              Time limit is 5 minutes, but you can increase the time by
              answering correctly.
            </li>
            <li>
              For each answer within the range o 1 % of correct price, you get
              100 points and 1 extra minute.
            </li>
            <li>
              If you are closer to 5% range, you get 50 points and extra 30
              seconds.
            </li>
            <li>
              Answers within range of 5 - 10 % from the actual price are equal
              to 10 points and 10 extra seconds.
            </li>
          </ul>
          <br />
          Good luck! 🙂
          <br />
          <br />
          <p>© All rights reserved</p>
          <p>Music by: Burak Efe Arslantas</p>
        </div>
      </Modal>
    </>
  );
}
