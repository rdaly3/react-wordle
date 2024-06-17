import { computeGuess } from "../word-utils";
import CharacterBox from "./CharacterBox";

const LETTER_LENGTH = 5;

interface WordRowProps {
  letters: string;
  currentGuess?: boolean;
  answer: string;
}

const WordRow = ({
  letters = "",
  currentGuess = false,
  answer,
}: WordRowProps) => {
  const lettersRemaining = LETTER_LENGTH - letters.length;
  const guessStates = currentGuess ? [] : computeGuess(letters, answer);

  return (
    <div className="flex flex-row w-full justify-center items-center space-x-1.5 text-white">
      {letters.split("").map((letter, index) => (
        <CharacterBox value={letter} key={index} state={guessStates[index]} />
      ))}
      {Array.from({ length: lettersRemaining }).map((_, index) => (
        <div
          className="flex h-16 w-16 border-2 border-slate-300"
          key={index}
        ></div>
      ))}
    </div>
  );
};

export default WordRow;
