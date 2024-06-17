import { useGuessStore } from "./store";
import Keyboard from "./components/Keyboard";
import WordRow from "./components/WordRow";
import { useState } from "react";
import { GameStatus } from "./word-utils";

const GUESS_COUNT = 6;
const WORD_COUNT = 5;

function App() {
  const state = useGuessStore();
  const [currentGuess, setCurrentGuess] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const guesses = state.guesses;

  const guessesRemaining = GUESS_COUNT - state.guesses.length;

  const handleResetClick = () => {
    setCurrentGuess("");
    state.resetGame();
  };

  const handleOnscreenKeyboardTap = (key: string) => {
    if (state.gameStatus !== GameStatus.InProgress) return;
    if (key === "Backspace") {
      if (currentGuess.length > 0) {
        setCurrentGuess(currentGuess.substring(0, currentGuess.length - 1));
      }
    } else if (key === "Enter") {
      handleGuess();
    } else if (currentGuess.length < WORD_COUNT) {
      setCurrentGuess(currentGuess + key);
    }
  };

  const keyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (state.gameStatus !== GameStatus.InProgress) return;
    if (event.key === "Enter") {
      handleGuess();
    }

    if (event.key === "Backspace") {
      if (currentGuess.length > 0) {
        setCurrentGuess(currentGuess.substring(0, currentGuess.length - 1));
      }
    } else if (currentGuess.length < WORD_COUNT) {
      if (event.key.match(/[a-z]/i)) {
        setCurrentGuess(currentGuess + event.key);
      }
    }
  };

  const handleGuess = () => {
    if (currentGuess.length !== WORD_COUNT) {
    } else {
      if (currentGuess === state.answer) {
        console.log("You won! Guess Number:" + (state.guesses.length + 1));
        state.winGame(state.guesses.length + 1);
        setModalOpen(true);
      } else if (guessesRemaining <= 1) {
        state.loseGame();
        setModalOpen(true);
      }
      state.addGuess(currentGuess);

      setCurrentGuess("");
    }
  };

  return (
    <div
      className="flex flex-col min-h-screen"
      tabIndex={0}
      onKeyDown={keyDown}
    >
      {modalOpen && (
        <dialog className="flex bg-gray-800 text-white h-full w-full bg-opacity-40 items-center justify-center">
          <div className="flex flex-col bg-white shadow-md w-[400px] rounded-lg text-black p-8">
            <div className="flex justify-between">
              <p className="text-xl font-semibold">Statistics</p>
              <button className="p-2" onClick={() => setModalOpen(false)}>
                <svg
                  fill="#888888"
                  height="16px"
                  width="16px"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 460.775 460.775"
                >
                  <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55  c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55  c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505  c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55  l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719  c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z" />
                </svg>
              </button>
            </div>

            <div className="flex my-5">
              <div className="flex flex-col flex-1 items-center">
                <p className="text-4xl font-semibold text-gray-800">
                  {state.gamesPlayed}
                </p>
                <p className=" text-gray-600 text-sm">Games Played</p>
              </div>
              <div className="flex flex-col flex-1 items-center">
                <p className="text-4xl font-semibold text-gray-800">
                  {state.gamesWon}
                </p>
                <p className=" text-gray-600 text-sm">Games Won</p>
              </div>
              <div className="flex flex-col flex-1 items-center">
                <p className="text-4xl font-semibold text-gray-800">
                  {Math.round((state.gamesWon / state.gamesPlayed) * 100) || 0}
                  <span className="text-lg">%</span>
                </p>
                <p className=" text-gray-600 text-sm">Win Rate</p>
              </div>
            </div>
            <div className="flex flex-col px-4 space-y-2 my-4">
              <div className="flex">
                <p className="text-lg font-semibold mr-4">1</p>
                <div className="flex w-full h-8 bg-gray-300 rounded">
                  {state.guessList[1].length || "0"}
                </div>
              </div>
              <div className="flex">
                <p className="text-lg font-semibold mr-4">2</p>
                <div className="flex w-full h-8 bg-gray-300 rounded">
                  {state.guessList[2].length || "0"}
                </div>
              </div>
              <div className="flex">
                <p className="text-lg font-semibold mr-4">3</p>
                <div className="flex w-full h-8 bg-gray-300 rounded">
                  {state.guessList[3].length || "0"}
                </div>
              </div>
              <div className="flex">
                <p className="text-lg font-semibold mr-4">4</p>
                <div className="flex w-full h-8 bg-gray-300 rounded">
                  {state.guessList[4].length || "0"}
                </div>
              </div>
              <div className="flex">
                <p className="text-lg font-semibold mr-4">5</p>
                <div className="flex w-full h-8 bg-gray-300 rounded">
                  {state.guessList[5].length || "0"}
                </div>
              </div>
              <div className="flex">
                <p className="text-lg font-semibold mr-4">6</p>
                <div className="flex w-full h-8 bg-gray-300 rounded">
                  {state.guessList[6].length || "0"}
                </div>
              </div>
            </div>
          </div>
        </dialog>
      )}
      <header className="border-b-2 border-gray-300 w-full items-center">
        <h1 className="text-5xl text-center my-5 font-bold">Wordle</h1>
      </header>
      <main className="flex flex-col w-full">
        <p className="self-center text-2xl mt-8">
          Guesses Remaining:{" "}
          <span className="font-bold">{guessesRemaining}</span>
        </p>
        <div className="my-12 space-y-1.5">
          {guesses.map((guess, index) => (
            <WordRow letters={guess} key={index} answer={state.answer} />
          ))}
          {guessesRemaining > 0 ? (
            <WordRow
              letters={currentGuess}
              currentGuess={true}
              answer={state.answer}
            />
          ) : null}
          {Array.from({ length: guessesRemaining - 1 }).map((_, index) => (
            <WordRow letters="" key={index} answer={state.answer} />
          ))}
        </div>
        <div>
          <Keyboard handleKeyPress={handleOnscreenKeyboardTap} />
        </div>
        {state.gameStatus === GameStatus.Won && (
          <div className="self-center mt-8">
            <p className="text-center text-xl mb-2">
              You won in {state.guesses.length} guesses!
            </p>
            <p className="text-center text-2xl">
              The word was{" "}
              <span className="font-bold uppercase">{state.answer}</span>
            </p>
          </div>
        )}
        {state.gameStatus === GameStatus.Lost && (
          <div className="self-center mt-8">
            <p className="text-center text-xl mb-2">You lost!</p>
            <p className="text-center text-2xl">
              The word was{" "}
              <span className="font-bold uppercase">{state.answer}</span>
            </p>
          </div>
        )}
        <button
          className="px-8 py-4 my-10 bg-gray-700 text-white font-bold uppercase rounded-lg w-64 self-center"
          onClick={handleResetClick}
        >
          Reset Game
        </button>
        <button onClick={() => setModalOpen(true)}>Open Modal</button>
        <button
          className="px-8 py-4 my-10 bg-gray-700 text-white font-bold uppercase rounded-lg w-64 self-center"
          onClick={() => {
            console.log("Clearing storage");
            useGuessStore.persist.clearStorage();
          }}
        >
          Clear Data
        </button>
      </main>
    </div>
  );
}

export default App;
