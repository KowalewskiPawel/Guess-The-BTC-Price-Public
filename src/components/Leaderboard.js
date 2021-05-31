import React, { useEffect, useState } from "react";
import Modal from "react-modal";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  doc,
  setDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithRedirect,
  onAuthStateChanged,
  getIdToken,
} from "firebase/auth";

import { get, throttle } from "lodash";

const firebaseApp = initializeApp({
  apiKey: "",
  authDomain: "",
  projectId: "",
});

const db = getFirestore();

const provider = new GoogleAuthProvider();
const auth = getAuth();

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

function Leaderboard(props) {
  const [score, setScore] = useState(() => null);
  const [scores, setScores] = useState(() => []);
  const [login, setLogin] = useState(() => false);

  const userName = get(auth, "currentUser.displayName");
  const userId = get(auth, "currentUser.reloadUserInfo.localId");

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

  const addData = async () => {
    setScore(() => props.highestScore);
    try {
      const docRef = await setDoc(doc(db, "scores", userId), {
        name: userName,
        score: score,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const signIn = () => {
    return signInWithRedirect(auth, provider);
  };

  const getIdTokenPromise = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe();
        if (user) {
          getIdToken(user).then(
            (idToken) => {
              resolve(idToken);
              setLogin(() => true);
            },
            (error) => {
              resolve(null);
            }
          );
        } else {
          resolve(null);
        }
      });
    });
  };

  const throttledPost = throttle(addData, 2000);

  const unsubscribe = onSnapshot(
    query(collection(db, "scores"), orderBy("score", "desc")),
    (snapshot) => {
      const tempScores = [];
      snapshot.forEach((doc) => {
        const tempUser = {
          name: doc.data().name,
          score: doc.data().score,
        };
        tempScores.push(tempUser);
      });
      tempScores.sort((a, b) => {
        return b.score - a.score;
      });
      if (tempScores.length > scores) {
        setScores(tempScores);
      }
    },
    (error) => {
      //console.error(error);
    }
  );

  useEffect(() => {
    getIdTokenPromise();
  }, []);

  return (
    <>
      <div id="modal" onClick={openModal}>
        Leaderboard
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <h2>Leaderboard</h2>
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
            fontSize: "2rem",
            color: "white",
          }}
          onClick={closeModal}
        >
          X
        </div>
        <div>
          {!login ? (
            <>
              <p>
                Please sign in with your Google account to see the global
                leaderboard, and submit your highest score.
              </p>
              <button
                onClick={signIn}
                style={{
                  position: "fixed",
                  backgroundColor: "rgb(94, 90, 86)",
                  alignItems: "center",
                  textAlign: "center",
                  border: "solid 2px rgb(177, 163, 138)",
                  borderRadius: "10px",
                  color: "antiquewhite",
                  fontFamily: '"Luckiest Guy", cursive',
                  padding: "0.4em",
                  transition: "transform 200ms ease-in-out",
                }}
              >
                SIGN IN
              </button>
            </>
          ) : (
            <>
              <h2>Hi {userName}!</h2>
              <p>
                <br />
                When you finish the game at least once, you will see "ADD SCORE"
                button. By clicking it, you can upload your highest score to the
                global leaderboard.
                <br /> Good luck! :)
              </p>
              {props.highestScore > 0 ? (
                <button
                  onClick={() => throttledPost()}
                  style={{
                    backgroundColor: "rgb(94, 90, 86)",
                    alignItems: "center",
                    textAlign: "center",
                    border: "solid 2px rgb(177, 163, 138)",
                    borderRadius: "10px",
                    color: "antiquewhite",
                    fontFamily: '"Luckiest Guy", cursive',
                    padding: "0.4em",
                    transition: "transform 200ms ease-in-out",
                  }}
                >
                  ADD SCORE
                </button>
              ) : (
                ""
              )}
              <ol>
                {scores.length < 1 ? (
                  <li key="1">Cannot fetch the scores</li>
                ) : (
                  scores.map((doc, index) => {
                    return (
                      <li key={index}>
                        {doc.name} - {doc.score}
                      </li>
                    );
                  })
                )}
              </ol>
            </>
          )}
        </div>
      </Modal>
    </>
  );
}

export default Leaderboard;
