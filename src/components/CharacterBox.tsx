import { LetterState } from "../word-utils";

interface CharacterBoxProps {
  value: string;
  state?: LetterState;
}

const CharacterBox = ({ value, state }: CharacterBoxProps) => {
  const stateStyle =
    state === undefined || null
      ? "text-black border-2 border-gray-400"
      : CharacterStateStyles[state];
  return (
    <div className={`flex h-16 w-16 items-center justify-center ${stateStyle}`}>
      <p className="text-3xl font-bold uppercase">{value}</p>
    </div>
  );
};

export default CharacterBox;

const CharacterStateStyles = {
  [LetterState.Match]: "bg-green-600/75",
  [LetterState.Present]: "bg-yellow-600/75",
  [LetterState.Miss]: "bg-gray-500/90",
};
