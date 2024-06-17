import wordBank from "./word-bank.json";

export function getRandomWord(): string {
  return wordBank.valid[Math.floor(Math.random() * wordBank.valid.length)];
}

export enum LetterState {
  Miss,
  Present,
  Match,
}

export enum GameStatus {
  InProgress,
  Won,
  Lost,
}

export function computeGuess(guess: string, wordString: string): LetterState[] {
  const result: LetterState[] = [];

  const wordArray = wordString.split("");
  const guessLettersArray = guess.split("");

  for (let i = 0; i < wordArray.length; i++) {
    if (guessLettersArray[i] === wordArray[i]) {
      result.push(LetterState.Match);
    } else if (wordArray.includes(guessLettersArray[i])) {
      result.push(LetterState.Present);
    } else {
      result.push(LetterState.Miss);
    }
  }

  return result;
}
