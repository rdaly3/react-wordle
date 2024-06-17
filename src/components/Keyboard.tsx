import { LetterState } from "../word-utils";
import KeyBox from "./KeyBox";
import { useGuessStore } from "../store";

interface KeyboardProps {
  handleKeyPress: (letter: string) => void;
}

const Keyboard = ({ handleKeyPress }: KeyboardProps) => {
  const state = useGuessStore();

  return (
    <div>
      {keyboardKeys.map((keyboardRow, rowIndex) => (
        <div
          key={rowIndex}
          className="flex flex-row my-2 justify-center space-x-2 text-lg uppercase font-bold"
        >
          {keyboardRow.map((char, charIndex) => {
            return (
              <button
                onClick={() => {
                  handleKeyPress(char);
                }}
              >
                <KeyBox
                  letter={char}
                  key={charIndex}
                  letterBgStyle={
                    state.guessedLetters[char] !== undefined
                      ? keyStateStyles[state.guessedLetters[char]]
                      : "bg-gray-300"
                  }
                />
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;

const keyStateStyles = {
  [LetterState.Miss]: "bg-gray-500/90 text-white",
  [LetterState.Present]: "bg-yellow-600/75 text-white",
  [LetterState.Match]: "bg-green-600/75 text-white",
};

const keyboardKeys = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["", "a", "s", "d", "f", "g", "h", "j", "k", "l", ""],
  ["Enter", "z", "x", "c", "v", "b", "n", "m", "Backspace"],
];
