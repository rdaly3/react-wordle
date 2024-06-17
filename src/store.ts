import { create } from "zustand";
import { persist } from "zustand/middleware";
import { GameStatus, LetterState, getRandomWord } from "./word-utils";

interface MyState {
  answer: string;
  guesses: string[];
  guessedLetters: { [key: string]: LetterState };
  gameStatus: GameStatus;
  gamesWon: number;
  gamesPlayed: number;
  guessList: { [key: number]: string[] };
  addGuess: (guess: string) => void;
  winGame: (guessNumber: number) => void;
  loseGame: () => void;
  resetGame: () => void;
}

export const useGuessStore = create<MyState>()(
  persist(
    (set, get) => ({
      answer: getRandomWord(),
      guesses: [],
      guessedLetters: {},
      gameStatus: GameStatus.InProgress,
      gamesWon: 0,
      gamesPlayed: 0,
      guessList: { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] },
      addGuess: (guess: string) => {
        const guessLettersArray = guess.split("");
        const updatedGuessedLetters = { ...get().guessedLetters };
        const currentAnswer = get().answer;

        for (let i = 0; i < guessLettersArray.length; i++) {
          if (guessLettersArray[i] === currentAnswer[i]) {
            updatedGuessedLetters[guessLettersArray[i]] = LetterState.Match;
          } else if (currentAnswer.includes(guessLettersArray[i])) {
            if (
              updatedGuessedLetters[guessLettersArray[i]] === LetterState.Match
            ) {
              continue;
            }
            updatedGuessedLetters[guessLettersArray[i]] = LetterState.Present;
          } else {
            updatedGuessedLetters[guessLettersArray[i]] = LetterState.Miss;
          }
        }

        set((state) => ({
          guesses: [...state.guesses, guess],
          guessedLetters: updatedGuessedLetters,
        }));
        console.log(get().guessedLetters);
      },
      winGame: (guessNumber: number) => {
        console.log("inside store! Guess Number: " + guessNumber);
        set((state) => ({
          guessList: {
            [guessNumber]: [...state.guessList[guessNumber], state.answer],
          },
          gamesWon: state.gamesWon + 1,
          gamesPlayed: state.gamesPlayed + 1,
          gameStatus: GameStatus.Won,
        }));
      },
      loseGame: () => {
        set((state) => ({
          gameStatus: GameStatus.Lost,
          gamesPlayed: state.gamesPlayed + 1,
        }));
      },
      resetGame: () => {
        set({
          answer: getRandomWord(),
          guesses: [],
          guessedLetters: {},
          gameStatus: GameStatus.InProgress,
        });
      },
    }),
    {
      name: "wordle",
    }
  )
);
